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
  
  const playerXRef = useRef(300);
  const bugsRef = useRef<Bug[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const keysRef = useRef<Set<string>>(new Set());
  const animationFrameRef = useRef<number>();
  const lastShotRef = useRef(0);

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
      if (now - lastShotRef.current < 200) return;
      lastShotRef.current = now;

      bulletsRef.current.push({
        x: playerXRef.current,
        y: 420,
        vy: -10,
      });
    };

    const spawnBug = () => {
      const x = Math.random() * 560 + 20;

      bugsRef.current.push({
        x,
        y: -30,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 0.8 + Math.random() * 1.2,
        size: 20 + Math.random() * 15,
        health: 1 + Math.floor(Math.random() * 2),
        skill: SKILLS[Math.floor(Math.random() * SKILLS.length)],
        rotation: Math.random() * Math.PI * 2,
      });
    };

    const drawRobot = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, health: number) => {
      ctx.save();
      ctx.translate(x, y);
      
      const color = health > 1 ? "#ef4444" : "#f97316";
      
      ctx.fillStyle = color;
      ctx.fillRect(-size * 0.4, -size * 0.3, size * 0.8, size * 0.6);
      
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(-size * 0.25, -size * 0.15, size * 0.15, size * 0.15);
      ctx.fillRect(size * 0.1, -size * 0.15, size * 0.15, size * 0.15);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-size * 0.3, size * 0.3);
      ctx.lineTo(-size * 0.3, size * 0.5);
      ctx.moveTo(size * 0.3, size * 0.3);
      ctx.lineTo(size * 0.3, size * 0.5);
      ctx.stroke();
      
      ctx.fillStyle = "#666";
      ctx.beginPath();
      ctx.arc(0, -size * 0.5, size * 0.15, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawPlayer = (ctx: CanvasRenderingContext2D, x: number) => {
      const y = 440;
      const size = 25;
      
      ctx.fillStyle = "#3b82f6";
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x - size * 0.6, y + size * 0.3);
      ctx.lineTo(x + size * 0.6, y + size * 0.3);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = "#60a5fa";
      ctx.fillRect(x - 3, y - size * 0.5, 6, size * 0.8);
      
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x - size * 0.4, y);
      ctx.lineTo(x - size * 0.6, y + size * 0.5);
      ctx.moveTo(x + size * 0.4, y);
      ctx.lineTo(x + size * 0.6, y + size * 0.5);
      ctx.stroke();
    };

    const gameLoop = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, 600, 480);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;
      for (let i = 0; i < 600; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 480);
        ctx.stroke();
      }
      for (let i = 0; i < 480; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();
      }

      if (!gameStarted) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "22px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("SYSTEM DEFENDER", 300, 200);
        ctx.font = "14px 'Space Mono', monospace";
        ctx.fillStyle = "#888888";
        ctx.fillText("Click or press SPACE to start", 300, 240);
        ctx.fillText("A/D or ← → to move • Space/Click to shoot", 300, 270);
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const speed = 5;
      if (keysRef.current.has("a") || keysRef.current.has("arrowleft")) {
        playerXRef.current = Math.max(30, playerXRef.current - speed);
      }
      if (keysRef.current.has("d") || keysRef.current.has("arrowright")) {
        playerXRef.current = Math.min(570, playerXRef.current + speed);
      }

      bulletsRef.current.forEach((bullet, i) => {
        bullet.y += bullet.vy;
        if (bullet.y < -10) {
          bulletsRef.current.splice(i, 1);
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
        if (bug.x > 580) {
          bug.x = 580;
          bug.vx *= -1;
        }

        if (bug.y > 480) {
          bugsRef.current.splice(i, 1);
          setHealth(h => Math.max(0, h - 10));
        }

        bulletsRef.current.forEach((bullet, j) => {
          const dx = bug.x - bullet.x;
          const dy = bug.y - bullet.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < bug.size) {
            bug.health--;
            bulletsRef.current.splice(j, 1);

            if (bug.health <= 0) {
              setScore(s => s + 10);
              setCollectedSkills(skills => {
                if (!skills.includes(bug.skill)) {
                  return [...skills, bug.skill];
                }
                return skills;
              });
              bugsRef.current.splice(i, 1);
            }
          }
        });
      });

      if (Math.random() < 0.015 && bugsRef.current.length < 6) {
        spawnBug();
      }

      drawPlayer(ctx, playerXRef.current);

      ctx.fillStyle = "#fbbf24";
      ctx.shadowColor = "#fbbf24";
      ctx.shadowBlur = 8;
      bulletsRef.current.forEach(bullet => {
        ctx.fillRect(bullet.x - 2, bullet.y - 8, 4, 16);
      });
      ctx.shadowBlur = 0;

      bugsRef.current.forEach(bug => {
        drawRobot(ctx, bug.x, bug.y, bug.size, bug.health);
      });

      ctx.fillStyle = "#ffffff40";
      ctx.font = "12px 'Space Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`SCORE: ${score}`, 10, 20);
      
      const healthColor = health > 60 ? "#10b981" : health > 30 ? "#f59e0b" : "#ef4444";
      ctx.fillStyle = "#333";
      ctx.fillRect(10, 30, 150, 8);
      ctx.fillStyle = healthColor;
      ctx.fillRect(10, 30, health * 1.5, 8);

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
      <div className="w-full max-w-2xl">
        <div className="border border-border rounded-md overflow-hidden" style={{ backgroundColor: '#050505' }}>
          <canvas
            ref={canvasRef}
            width={600}
            height={480}
            className="w-full h-auto cursor-crosshair"
            data-testid="canvas-game"
          />
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
            System Skills Unlocked
          </h3>
          {collectedSkills.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Defend the system by eliminating bugs to unlock skills...
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
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
