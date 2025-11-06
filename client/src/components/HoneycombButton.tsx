import { useState } from "react";

interface HoneycombButtonProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  href?: string;
  size?: "sm" | "md";
  color?: string;
}

export default function HoneycombButton({ 
  icon, 
  title, 
  description, 
  href,
  size = "md",
  color = "#3b82f6"
}: HoneycombButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const hexSize = size === "sm" ? 50 : 70;
  const hexHeight = hexSize * 2;
  const hexWidth = Math.sqrt(3) * hexSize;
  
  const points = [
    [hexWidth / 2, 0],
    [hexWidth, hexSize / 2],
    [hexWidth, (3 * hexSize) / 2],
    [hexWidth / 2, hexHeight],
    [0, (3 * hexSize) / 2],
    [0, hexSize / 2],
  ].map(([x, y]) => `${x},${y}`).join(" ");

  const content = (
    <div 
      className="relative inline-block cursor-pointer transition-transform duration-200"
      style={{
        width: `${hexWidth}px`,
        height: `${hexHeight}px`,
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`honeycomb-${title?.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <svg
        width={hexWidth}
        height={hexHeight}
        className="absolute inset-0"
      >
        <polygon
          points={points}
          fill={isHovered ? color : "transparent"}
          stroke={isHovered ? color : "#444"}
          strokeWidth="2"
          className="transition-all duration-200"
          style={{ opacity: isHovered ? 0.8 : 1 }}
        />
      </svg>
      
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 transition-opacity duration-200"
        style={{
          opacity: isHovered && description ? 0 : 1,
        }}
      >
        {icon && (
          <div className="text-foreground" style={{ fontSize: size === "sm" ? "20px" : "28px" }}>
            {icon}
          </div>
        )}
        {title && !icon && (
          <div className="text-xs font-medium text-foreground px-2">
            {title}
          </div>
        )}
      </div>

      {description && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 transition-opacity duration-200"
          style={{
            opacity: isHovered ? 1 : 0,
          }}
        >
          <div className="text-xs font-semibold text-white mb-1">{title}</div>
          <div className="text-[10px] text-white/80 leading-tight">{description}</div>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
