import { useEffect, useRef } from "react";

interface LocationMapProps {
  city: string;
  timezone: string;
}

export default function LocationMap({ city, timezone }: LocationMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animationId: number;

    const drawMap = () => {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, 200, 80);

      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 2;
      
      for (let x = 0; x <= 200; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 80);
        ctx.stroke();
      }
      
      for (let y = 0; y <= 80; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(200, y);
        ctx.stroke();
      }

      ctx.strokeStyle = "#252525";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(10, 20);
      ctx.lineTo(60, 20);
      ctx.lineTo(60, 50);
      ctx.lineTo(100, 50);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(100, 30);
      ctx.lineTo(150, 30);
      ctx.lineTo(150, 60);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(40, 40);
      ctx.lineTo(40, 70);
      ctx.lineTo(120, 70);
      ctx.stroke();

      const markerX = 140;
      const markerY = 35;

      const pulseSize = 3 + Math.sin(frame * 0.1) * 2;
      const pulseOpacity = 0.3 + Math.sin(frame * 0.1) * 0.2;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity * 0.5})`;
      ctx.beginPath();
      ctx.arc(markerX, markerY, pulseSize * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity})`;
      ctx.beginPath();
      ctx.arc(markerX, markerY, pulseSize * 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(markerX, markerY, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(markerX, markerY, 9, 0, Math.PI * 2);
      ctx.stroke();

      frame++;
      animationId = requestAnimationFrame(drawMap);
    };

    drawMap();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="relative p-4 bg-card rounded-md border border-card-border overflow-hidden">
      <canvas
        ref={canvasRef}
        width={200}
        height={80}
        className="w-full h-auto rounded"
      />
      <div className="absolute bottom-2 left-4 text-sm">
        <div className="font-medium text-foreground">{city}</div>
        <div className="text-muted-foreground font-mono text-xs">
          {new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          })} {timezone} · Local time
        </div>
      </div>
    </div>
  );
}
