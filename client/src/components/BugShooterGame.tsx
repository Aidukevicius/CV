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
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Player {
  x: number;
  y: number;
  size: number;
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
  
  const playerRef = useRef<Player>({ x: 400, y: 300, size: 20 });
  const bugsRef = useRef<Bug[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const keysRef = useRef<Set<string>>(new Set());
  const mouseRef = useRef({ x: 400, y: 300 });
  const animationFrameRef = useRef<number>();

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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleClick = () => {
      shoot();
    };

    const shoot = () => {
      if (!gameStarted) {
        setGameStarted(true);
        return;
      }
      
      const player = playerRef.current;
      const angle = Math.atan2(
        mouseRef.current.y - player.y,
        mouseRef.current.x - player.x
      );
      
      bulletsRef.current.push({
        x: player.x,
        y: player.y,
        vx: Math.cos(angle) * 8,
        vy: Math.sin(angle) * 8,
      });
    };

    const spawnBug = () => {
      const side = Math.floor(Math.random() * 4);
      let x = 0, y = 0;
      
      switch (side) {
        case 0: x = Math.random() * 800; y = -20; break;
        case 1: x = 820; y = Math.random() * 600; break;
        case 2: x = Math.random() * 800; y = 620; break;
        case 3: x = -20; y = Math.random() * 600; break;
      }

      const player = playerRef.current;
      const angle = Math.atan2(player.y - y, player.x - x);
      const speed = 1 + Math.random() * 1.5;

      bugsRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 15 + Math.random() * 10,
        health: 2,
        skill: SKILLS[Math.floor(Math.random() * SKILLS.length)],
      });
    };

    const gameLoop = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, 800, 600);

      if (!gameStarted) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "24px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("Click or press SPACE to start", 400, 280);
        ctx.font = "16px 'Space Mono', monospace";
        ctx.fillStyle = "#888888";
        ctx.fillText("WASD to move • Mouse to aim • Click/Space to shoot", 400, 320);
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const player = playerRef.current;
      const speed = 4;

      if (keysRef.current.has("w")) player.y = Math.max(player.size, player.y - speed);
      if (keysRef.current.has("s")) player.y = Math.min(600 - player.size, player.y + speed);
      if (keysRef.current.has("a")) player.x = Math.max(player.size, player.x - speed);
      if (keysRef.current.has("d")) player.x = Math.min(800 - player.size, player.x + speed);

      bulletsRef.current.forEach((bullet, i) => {
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;

        if (bullet.x < 0 || bullet.x > 800 || bullet.y < 0 || bullet.y > 600) {
          bulletsRef.current.splice(i, 1);
        }
      });

      bugsRef.current.forEach((bug, i) => {
        bug.x += bug.vx;
        bug.y += bug.vy;

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

      if (Math.random() < 0.02 && bugsRef.current.length < 8) {
        spawnBug();
      }

      ctx.fillStyle = "#3b82f6";
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
      ctx.fill();

      const angle = Math.atan2(mouseRef.current.y - player.y, mouseRef.current.x - player.x);
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(player.x, player.y);
      ctx.lineTo(
        player.x + Math.cos(angle) * (player.size + 10),
        player.y + Math.sin(angle) * (player.size + 10)
      );
      ctx.stroke();

      ctx.fillStyle = "#fbbf24";
      bulletsRef.current.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      bugsRef.current.forEach(bug => {
        ctx.fillStyle = bug.health > 1 ? "#ef4444" : "#f97316";
        ctx.beginPath();
        ctx.arc(bug.x, bug.y, bug.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = "#000000";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText("🤖", bug.x, bug.y + 4);
      });

      ctx.strokeStyle = "#ffffff20";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(mouseRef.current.x - 10, mouseRef.current.y);
      ctx.lineTo(mouseRef.current.x + 10, mouseRef.current.y);
      ctx.moveTo(mouseRef.current.x, mouseRef.current.y - 10);
      ctx.lineTo(mouseRef.current.x, mouseRef.current.y + 10);
      ctx.stroke();

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStarted]);

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Bug Hunter</h2>
          <div className="font-mono text-lg" data-testid="text-score">
            Score: <span className="text-primary">{score}</span>
          </div>
        </div>
        
        <div className="border-2 border-border rounded-md overflow-hidden bg-black">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-auto cursor-crosshair"
            data-testid="canvas-game"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Collected Skills</h3>
          {collectedSkills.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Shoot the robot bugs to collect skill badges!
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {collectedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1"
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
