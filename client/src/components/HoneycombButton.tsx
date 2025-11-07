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
  color = "rgba(99, 102, 241, 0.7)"
}: HoneycombButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const scale = size === "sm" ? 0.7 : 1.15;
  const width = 98 * scale;
  const height = 111 * scale;
  
  const svgPath = "M 47.384 1.64 C 48.385 1.067 49.615 1.067 50.616 1.64 L 95.183 27.17 C 96.194 27.75 96.818 28.826 96.818 29.992 L 96.818 81.008 C 96.818 82.174 96.194 83.25 95.183 83.83 L 50.616 109.36 C 49.615 109.933 48.385 109.933 47.384 109.36 L 2.817 83.83 C 1.806 83.25 1.182 82.174 1.182 81.008 L 1.182 29.992 C 1.182 28.826 1.806 27.75 2.817 27.17 Z";

  const content = (
    <div 
      className="relative inline-block cursor-pointer transition-all duration-300 ease-out"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`honeycomb-${title?.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 98 111"
        className="absolute inset-0"
      >
        <defs>
          <filter id={`glow-${title || Math.random()}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <path
          d={svgPath}
          fill={color}
          stroke={isHovered ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.15)"}
          strokeWidth="1.2"
          className="transition-all duration-300"
          style={{ filter: isHovered ? `url(#glow-${title || Math.random()})` : 'none' }}
        />
      </svg>
      
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 transition-opacity duration-300"
        style={{
          opacity: isHovered && description ? 0 : 1,
        }}
      >
        {icon && (
          <div className="text-white transition-transform duration-300" style={{ 
            fontSize: size === "sm" ? "20px" : "28px",
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}>
            {icon}
          </div>
        )}
        {title && !icon && (
          <div className="text-sm font-semibold text-white px-2 leading-tight">
            {title}
          </div>
        )}
      </div>

      {description && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-3 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
          }}
        >
          <div className="text-sm font-bold text-white mb-1">{title}</div>
          <div className="text-xs text-white/80 leading-tight">{description}</div>
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
