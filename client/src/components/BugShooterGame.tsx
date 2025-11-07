import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Bug {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  health: number;
  skill: string;
  rotation: number;
}

interface Bullet {
  x: number;
  y: number;
  vy: number;
}

interface PowerUp {
  x: number;
  y: number;
  type: 'rapidFire' | 'shield' | 'multiShot';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", 
  "Docker", "AWS", "GraphQL", "PostgreSQL", "MongoDB",
  "Git", "CI/CD", "TailwindCSS", "Next.js", "Express"
];

export default function BugShooterGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [collectedSkills, setCollectedSkills] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [health, setHealth] = useState(100);
  const [combo, setCombo] = useState(0);
  const [wave, setWave] = useState(1);
  
  const playerXRef = useRef(250);
  const bugsRef = useRef<Bug[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const keysRef = useRef<Set<string>>(new Set());
  const animationFrameRef = useRef<number>();
  const lastShotRef = useRef(0);
  const comboTimerRef = useRef(0);
  const waveTimerRef = useRef(0);
  const rapidFireRef = useRef(0);
  const multiShotRef = useRef(false);
  const shieldRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key.toLowerCase());
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        shoot();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    const handleClick = () => {
      if (!gameStarted) {
        setGameStarted(true);
      } else {
        shoot();
      }
    };

    const shoot = () => {
      if (!gameStarted) {
        setGameStarted(true);
        return;
      }
      
      const now = Date.now();
      const fireRate = rapidFireRef.current > now ? 100 : 200;
      if (now - lastShotRef.current < fireRate) return;
      lastShotRef.current = now;

      if (multiShotRef.current) {
        bulletsRef.current.push(
          { x: playerXRef.current - 15, y: 540, vy: -10 },
          { x: playerXRef.current, y: 540, vy: -10 },
          { x: playerXRef.current + 15, y: 540, vy: -10 }
        );
      } else {
        bulletsRef.current.push({
          x: playerXRef.current,
          y: 540,
          vy: -10,
        });
      }
    };

    const spawnBug = (waveLevel: number) => {
      const x = Math.random() * 460 + 20;
      const speedMultiplier = 1 + (waveLevel - 1) * 0.1;

      bugsRef.current.push({
        x,
        y: -30,
        vx: (Math.random() - 0.5) * 1.5 * speedMultiplier,
        vy: (0.8 + Math.random() * 1.2) * speedMultiplier,
        size: 18 + Math.random() * 12,
        health: Math.min(1 + Math.floor(waveLevel / 3), 3),
        skill: SKILLS[Math.floor(Math.random() * SKILLS.length)],
        rotation: Math.random() * Math.PI * 2,
      });
    };

    const spawnPowerUp = (x: number, y: number) => {
      if (Math.random() < 0.3) {
        const types: ('rapidFire' | 'shield' | 'multiShot')[] = ['rapidFire', 'shield', 'multiShot'];
        powerUpsRef.current.push({
          x,
          y,
          type: types[Math.floor(Math.random() * types.length)]
        });
      }
    };

    const createExplosion = (x: number, y: number, color: string) => {
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * 3,
          vy: Math.sin(angle) * 3,
          life: 1,
          color
        });
      }
    };

    const drawRobot = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, health: number) => {
      ctx.save();
      ctx.translate(x, y);
      
      const color = health > 2 ? "#dc2626" : health > 1 ? "#ef4444" : "#f97316";
      
      ctx.fillStyle = color;
      ctx.fillRect(-size * 0.4, -size * 0.3, size * 0.8, size * 0.6);
      
      ctx.fillStyle = "#000";
      ctx.fillRect(-size * 0.25, -size * 0.15, size * 0.15, size * 0.15);
      ctx.fillRect(size * 0.1, -size * 0.15, size * 0.15, size * 0.15);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-size * 0.3, size * 0.3);
      ctx.lineTo(-size * 0.3, size * 0.45);
      ctx.moveTo(size * 0.3, size * 0.3);
      ctx.lineTo(size * 0.3, size * 0.45);
      ctx.stroke();
      
      ctx.fillStyle = "#555";
      ctx.beginPath();
      ctx.arc(0, -size * 0.5, size * 0.12, 0, Math.PI * 2);
      ctx.fill();
      
      if (health > 1) {
        ctx.fillStyle = "#fff";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(health.toString(), 0, -size * 0.65);
      }
      
      ctx.restore();
    };

    const drawPlayer = (ctx: CanvasRenderingContext2D, x: number) => {
      const y = 560;
      const size = 22;
      const now = Date.now();
      
      if (shieldRef.current > now) {
        ctx.strokeStyle = "#22d3ee";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      ctx.fillStyle = "#3b82f6";
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x - size * 0.6, y + size * 0.3);
      ctx.lineTo(x + size * 0.6, y + size * 0.3);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = "#60a5fa";
      ctx.fillRect(x - 3, y - size * 0.5, 6, size * 0.7);
      
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - size * 0.4, y);
      ctx.lineTo(x - size * 0.6, y + size * 0.4);
      ctx.moveTo(x + size * 0.4, y);
      ctx.lineTo(x + size * 0.6, y + size * 0.4);
      ctx.stroke();
    };

    const gameLoop = () => {
      if (!ctx || !canvas) return;
      const now = Date.now();

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 500, 580);

      ctx.strokeStyle = "#0a0a0a";
      ctx.lineWidth = 1;
      for (let i = 0; i < 500; i += 25) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 580);
        ctx.stroke();
      }
      for (let i = 0; i < 580; i += 25) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(500, i);
        ctx.stroke();
      }

      if (!gameStarted) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("SYSTEM DEFENDER", 250, 260);
        ctx.font = "12px 'Space Mono', monospace";
        ctx.fillStyle = "#888888";
        ctx.fillText("Click or SPACE to start", 250, 290);
        ctx.fillText("A/D or ← → to move • Space/Click to shoot", 250, 310);
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      if (now - waveTimerRef.current > 20000) {
        setWave(w => w + 1);
        waveTimerRef.current = now;
      }

      const speed = 5;
      if (keysRef.current.has("a") || keysRef.current.has("arrowleft")) {
        playerXRef.current = Math.max(25, playerXRef.current - speed);
      }
      if (keysRef.current.has("d") || keysRef.current.has("arrowright")) {
        playerXRef.current = Math.min(475, playerXRef.current + speed);
      }

      bulletsRef.current.forEach((bullet, i) => {
        bullet.y += bullet.vy;
        if (bullet.y < -10) {
          bulletsRef.current.splice(i, 1);
        }
      });

      powerUpsRef.current.forEach((powerUp, i) => {
        powerUp.y += 2;
        
        const dx = powerUp.x - playerXRef.current;
        const dy = powerUp.y - 560;
        if (Math.sqrt(dx * dx + dy * dy) < 30) {
          if (powerUp.type === 'rapidFire') {
            rapidFireRef.current = now + 5000;
          } else if (powerUp.type === 'shield') {
            shieldRef.current = now + 5000;
          } else if (powerUp.type === 'multiShot') {
            multiShotRef.current = true;
            setTimeout(() => multiShotRef.current = false, 5000);
          }
          powerUpsRef.current.splice(i, 1);
          setScore(s => s + 5);
        } else if (powerUp.y > 600) {
          powerUpsRef.current.splice(i, 1);
        }
      });

      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;
        if (particle.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      });

      bugsRef.current.forEach((bug, i) => {
        bug.x += bug.vx;
        bug.y += bug.vy;
        bug.rotation += 0.02;

        if (bug.x < 20) {
          bug.x = 20;
          bug.vx *= -1;
        }
        if (bug.x > 480) {
          bug.x = 480;
          bug.vx *= -1;
        }

        if (bug.y > 580) {
          bugsRef.current.splice(i, 1);
          if (shieldRef.current < now) {
            setHealth(h => Math.max(0, h - 10));
            setCombo(0);
            comboTimerRef.current = 0;
          }
        }

        bulletsRef.current.forEach((bullet, j) => {
          const dx = bug.x - bullet.x;
          const dy = bug.y - bullet.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < bug.size) {
            bug.health--;
            bulletsRef.current.splice(j, 1);
            createExplosion(bug.x, bug.y, "#fbbf24");

            if (bug.health <= 0) {
              const comboBonus = Math.floor(combo / 5) * 5;
              setScore(s => s + 10 + comboBonus);
              setCombo(c => c + 1);
              comboTimerRef.current = now;
              setCollectedSkills(skills => {
                if (!skills.includes(bug.skill)) {
                  return [...skills, bug.skill];
                }
                return skills;
              });
              spawnPowerUp(bug.x, bug.y);
              createExplosion(bug.x, bug.y, "#ef4444");
              bugsRef.current.splice(i, 1);
            }
          }
        });
      });

      if (now - comboTimerRef.current > 3000) {
        setCombo(0);
      }

      if (Math.random() < 0.015 + (wave * 0.002) && bugsRef.current.length < 6 + wave) {
        spawnBug(wave);
      }

      drawPlayer(ctx, playerXRef.current);

      ctx.fillStyle = "#fbbf24";
      ctx.shadowColor = "#fbbf24";
      ctx.shadowBlur = 6;
      bulletsRef.current.forEach(bullet => {
        ctx.fillRect(bullet.x - 2, bullet.y - 6, 4, 12);
      });
      ctx.shadowBlur = 0;

      powerUpsRef.current.forEach(powerUp => {
        const color = powerUp.type === 'rapidFire' ? '#fbbf24' : powerUp.type === 'shield' ? '#22d3ee' : '#a855f7';
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(powerUp.x, powerUp.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      particlesRef.current.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life;
        ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);
        ctx.globalAlpha = 1;
      });

      bugsRef.current.forEach(bug => {
        drawRobot(ctx, bug.x, bug.y, bug.size, bug.health);
      });

      ctx.fillStyle = "#ffffff";
      ctx.font = "11px 'Space Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`SCORE: ${score}`, 8, 16);
      ctx.fillText(`WAVE: ${wave}`, 8, 32);
      if (combo > 0) {
        ctx.fillStyle = "#fbbf24";
        ctx.fillText(`COMBO: x${combo}`, 8, 48);
      }
      
      const healthColor = health > 60 ? "#10b981" : health > 30 ? "#f59e0b" : "#ef4444";
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(420, 8, 72, 8);
      ctx.fillStyle = healthColor;
      ctx.fillRect(420, 8, health * 0.72, 8);
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "right";
      ctx.fillText("HP", 410, 16);

      if (rapidFireRef.current > now) {
        ctx.fillStyle = "#fbbf24";
        ctx.font = "9px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("RAPID FIRE", 250, 570);
      } else if (shieldRef.current > now) {
        ctx.fillStyle = "#22d3ee";
        ctx.font = "9px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("SHIELD", 250, 570);
      } else if (multiShotRef.current) {
        ctx.fillStyle = "#a855f7";
        ctx.font = "9px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("MULTI-SHOT", 250, 570);
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("click", handleClick);

    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("click", handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStarted]);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="w-full">
        <div className="border border-border rounded-md overflow-hidden" style={{ backgroundColor: '#000' }}>
          <canvas
            ref={canvasRef}
            width={500}
            height={580}
            className="w-full h-auto cursor-crosshair"
            data-testid="canvas-game"
          />
        </div>

        <div className="mt-4">
          <h3 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
            Skills Unlocked ({collectedSkills.length}/{SKILLS.length})
          </h3>
          {collectedSkills.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Eliminate bugs to unlock skills...
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {collectedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-2 py-0.5 text-xs"
                  data-testid={`badge-skill-${skill.toLowerCase().replace(/\./g, '')}`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
