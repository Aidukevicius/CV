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

      ctx.strokeStyle = "#222";
      ctx.lineWidth = 1.5;

      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        const x1 = Math.random() * 200;
        const y1 = Math.random() * 80;
        const x2 = x1 + (Math.random() - 0.5) * 40;
        const y2 = y1 + (Math.random() - 0.5) * 40;
        const x3 = x2 + (Math.random() - 0.5) * 40;
        const y3 = y2 + (Math.random() - 0.5) * 40;
        
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.stroke();
      }

      const markerX = 140;
      const markerY = 35;

      const pulseSize = 3 + Math.sin(frame * 0.1) * 2;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(frame * 0.1) * 0.2})`;
      ctx.beginPath();
      ctx.arc(markerX, markerY, pulseSize * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(markerX, markerY, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(markerX, markerY, 8, 0, Math.PI * 2);
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
