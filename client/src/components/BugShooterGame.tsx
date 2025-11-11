import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

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

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 580;

export default function BugShooterGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [collectedSkills, setCollectedSkills] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [wave, setWave] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
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
  const invulnerabilityRef = useRef(0);
  const scaleRef = useRef(1);
  const touchTargetXRef = useRef<number | null>(null);
  const isTouchDeviceRef = useRef(false);

  const resetGame = () => {
    setScore(0);
    setCollectedSkills([]);
    setLives(3);
    setCombo(0);
    setWave(1);
    setGameOver(false);
    setIsPaused(false);
    playerXRef.current = 250;
    bugsRef.current = [];
    bulletsRef.current = [];
    powerUpsRef.current = [];
    particlesRef.current = [];
    lastShotRef.current = 0;
    comboTimerRef.current = 0;
    waveTimerRef.current = Date.now();
    rapidFireRef.current = 0;
    multiShotRef.current = false;
    shieldRef.current = 0;
    invulnerabilityRef.current = 0;
  };

  const startGame = () => {
    resetGame();
    setGameStarted(true);
    waveTimerRef.current = Date.now();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateScale = () => {
      const containerWidth = container.clientWidth;
      scaleRef.current = Math.min(containerWidth / CANVAS_WIDTH, 1.2);
    };

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(container);
    updateScale();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      keysRef.current.add(e.key.toLowerCase());
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        if (!isPaused) shoot();
      }
      if (e.key.toLowerCase() === "p") {
        e.preventDefault();
        if (gameStarted && !gameOver) {
          setIsPaused(p => !p);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    const handleClick = (e: MouseEvent) => {
      if (gameOver) return;
      if (!gameStarted) {
        startGame();
      } else if (!isPaused && !isTouchDeviceRef.current) {
        shoot();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      isTouchDeviceRef.current = true;
      
      if (gameOver) return;
      if (!gameStarted) {
        startGame();
        return;
      }
      if (isPaused) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = (touch.clientX - rect.left) / scaleRef.current;
      const y = (touch.clientY - rect.top) / scaleRef.current;

      touchTargetXRef.current = x;
      
      if (y < 500) {
        shoot();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!gameStarted || isPaused || gameOver) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = (touch.clientX - rect.left) / scaleRef.current;

      touchTargetXRef.current = x;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      touchTargetXRef.current = null;
    };

    const shoot = () => {
      if (!gameStarted || isPaused || gameOver) return;
      
      const now = Date.now();
      const fireRate = rapidFireRef.current > now ? 100 : 200;
      if (now - lastShotRef.current < fireRate) return;
      lastShotRef.current = now;

      if (multiShotRef.current) {
        bulletsRef.current.push(
          { x: playerXRef.current - 15, y: 540, vy: -12 },
          { x: playerXRef.current, y: 540, vy: -12 },
          { x: playerXRef.current + 15, y: 540, vy: -12 }
        );
      } else {
        bulletsRef.current.push({
          x: playerXRef.current,
          y: 540,
          vy: -12,
        });
      }
    };

    const spawnBug = (waveLevel: number) => {
      const x = Math.random() * 460 + 20;
      const speedMultiplier = Math.pow(1.15, waveLevel - 1);

      bugsRef.current.push({
        x,
        y: -30,
        vx: (Math.random() - 0.5) * 2 * speedMultiplier,
        vy: (1.5 + Math.random() * 1.5) * speedMultiplier,
        size: 18 + Math.random() * 12,
        health: Math.min(1 + Math.floor(waveLevel / 2), 4),
        skill: SKILLS[Math.floor(Math.random() * SKILLS.length)],
        rotation: Math.random() * Math.PI * 2,
      });
    };

    const spawnPowerUp = (x: number, y: number) => {
      if (Math.random() < 0.25) {
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

    const drawBug = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, health: number) => {
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
      
      if (shieldRef.current > now || invulnerabilityRef.current > now) {
        const color = invulnerabilityRef.current > now ? "#ef4444" : "#22d3ee";
        ctx.strokeStyle = color;
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

    const loseLife = (now: number) => {
      if (invulnerabilityRef.current > now) return;
      
      setLives(l => {
        const newLives = l - 1;
        if (newLives <= 0) {
          setGameOver(true);
        }
        return Math.max(0, newLives);
      });
      setCombo(0);
      comboTimerRef.current = 0;
      invulnerabilityRef.current = now + 2000;
      createExplosion(playerXRef.current, 560, "#ef4444");
    };

    const gameLoop = () => {
      if (!ctx || !canvas) return;
      const now = Date.now();

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.strokeStyle = "#0a0a0a";
      ctx.lineWidth = 1;
      for (let i = 0; i < CANVAS_WIDTH; i += 25) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, CANVAS_HEIGHT);
        ctx.stroke();
      }
      for (let i = 0; i < CANVAS_HEIGHT; i += 25) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(CANVAS_WIDTH, i);
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
        ctx.fillText("Touch to move & shoot on mobile", 250, 330);
        ctx.fillText("P to pause", 250, 350);
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      if (gameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = "#ef4444";
        ctx.font = "24px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", 250, 250);
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px 'Space Mono', monospace";
        ctx.fillText(`Final Score: ${score}`, 250, 285);
        ctx.fillText(`Skills Collected: ${collectedSkills.length}/${SKILLS.length}`, 250, 310);
        ctx.font = "12px 'Space Mono', monospace";
        ctx.fillStyle = "#888888";
        ctx.fillText("Click 'Restart' to play again", 250, 345);
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      if (isPaused) {
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

        bugsRef.current.forEach(bug => {
          drawBug(ctx, bug.x, bug.y, bug.size, bug.health);
        });

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", 250, 290);
        ctx.font = "12px 'Space Mono', monospace";
        ctx.fillStyle = "#888888";
        ctx.fillText("Press P or click Pause button to resume", 250, 320);
        
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      if (now - waveTimerRef.current > 12000) {
        setWave(w => w + 1);
        waveTimerRef.current = now;
      }

      const speed = 6;
      if (keysRef.current.has("a") || keysRef.current.has("arrowleft")) {
        playerXRef.current = Math.max(25, playerXRef.current - speed);
      }
      if (keysRef.current.has("d") || keysRef.current.has("arrowright")) {
        playerXRef.current = Math.min(475, playerXRef.current + speed);
      }

      if (touchTargetXRef.current !== null) {
        const diff = touchTargetXRef.current - playerXRef.current;
        if (Math.abs(diff) > 5) {
          const moveSpeed = Math.min(Math.abs(diff) * 0.15, speed);
          if (diff > 0) {
            playerXRef.current = Math.min(475, playerXRef.current + moveSpeed);
          } else {
            playerXRef.current = Math.max(25, playerXRef.current - moveSpeed);
          }
        }
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
            loseLife(now);
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
              const newCombo = combo + 1;
              const comboBonus = Math.floor(newCombo / 5) * 5;
              setScore(s => s + 15 + comboBonus);
              setCombo(newCombo);
              comboTimerRef.current = now;
              
              if (newCombo >= 3) {
                setCollectedSkills(skills => {
                  if (!skills.includes(bug.skill)) {
                    return [...skills, bug.skill];
                  }
                  return skills;
                });
              }
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

      const spawnChance = 0.025 + (wave * 0.004);
      const maxBugs = 8 + Math.floor(wave * 1.5);
      if (Math.random() < spawnChance && bugsRef.current.length < maxBugs) {
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
        drawBug(ctx, bug.x, bug.y, bug.size, bug.health);
      });

      for (let i = 0; i < lives; i++) {
        const x = 20 + i * 20;
        const y = 16;
        const size = 8;
        
        ctx.fillStyle = "#ef4444";
        ctx.shadowColor = "#ef4444";
        ctx.shadowBlur = 4;
        ctx.beginPath();
        
        // Left curve of heart
        ctx.moveTo(x, y + size * 0.3);
        ctx.bezierCurveTo(x, y - size * 0.1, x - size * 0.5, y - size * 0.5, x - size * 0.9, y - size * 0.5);
        ctx.bezierCurveTo(x - size * 1.3, y - size * 0.5, x - size * 1.3, y + size * 0.2, x - size * 1.3, y + size * 0.2);
        ctx.bezierCurveTo(x - size * 1.3, y + size * 0.7, x - size * 0.9, y + size * 1.1, x, y + size * 1.6);
        
        // Right curve of heart
        ctx.bezierCurveTo(x + size * 0.9, y + size * 1.1, x + size * 1.3, y + size * 0.7, x + size * 1.3, y + size * 0.2);
        ctx.bezierCurveTo(x + size * 1.3, y + size * 0.2, x + size * 1.3, y - size * 0.5, x + size * 0.9, y - size * 0.5);
        ctx.bezierCurveTo(x + size * 0.5, y - size * 0.5, x, y - size * 0.1, x, y + size * 0.3);
        
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      ctx.fillStyle = "#ffffff";
      ctx.font = "11px 'Space Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`SCORE: ${score}`, 8, 50);
      ctx.fillText(`WAVE: ${wave}`, 8, 66);
      if (combo > 0) {
        ctx.fillStyle = combo >= 3 ? "#10b981" : "#fbbf24";
        ctx.fillText(`COMBO: x${combo}${combo >= 3 ? ' ✓' : ''}`, 8, 82);
      }

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
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [gameStarted, isPaused, gameOver, score, combo, wave, lives, collectedSkills.length]);

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-2xl mx-auto" ref={containerRef}>
      <div className="w-full max-w-md mx-auto">
        <p className="text-xs text-muted-foreground text-center mb-2 font-mono">
          Eliminate the bugs to unlock my technical skills
        </p>
        <div className="border border-border rounded-md overflow-hidden shadow-lg relative" style={{ backgroundColor: '#000' }}>
          {gameStarted && !gameOver && (
            <button
              onClick={() => setIsPaused(p => !p)}
              data-testid="button-pause"
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded p-1.5 transition-colors"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
              {isPaused ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>
          )}
          {gameOver && (
            <button
              onClick={startGame}
              data-testid="button-restart"
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded p-1.5 transition-colors"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="w-full h-auto cursor-crosshair"
            data-testid="canvas-game"
          />
        </div>

        <div className="mt-3">
          <h3 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
            Skills Unlocked ({collectedSkills.length}/{SKILLS.length})
          </h3>
          {collectedSkills.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Get 3+ combo to unlock skills...
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
