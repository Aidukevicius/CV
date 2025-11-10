
import { useState } from "react";

interface HoneycombButtonProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  href?: string;
  size?: "sm" | "md";
  color?: string;
  imageUrl?: string;
  popDirection?: "up" | "center";
  angle?: number;
}

export default function HoneycombButton({ 
  icon, 
  title, 
  description, 
  href,
  size = "md",
  color = "rgba(120, 140, 100, 0.3)",
  imageUrl,
  popDirection = "up",
  angle = 0
}: HoneycombButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseScale = size === "sm" ? 0.5 : 0.9;
  const width = 98 * baseScale;
  const height = 111 * baseScale;
  const hoverScale = isHovered && imageUrl ? 2.2 : 1;
  
  // Calculate transform origin for pop direction
  let transformOrigin = 'center center';
  if (popDirection === 'up') {
    transformOrigin = 'center bottom';
  } else if (popDirection === 'center') {
    // Pop toward center means transform origin is away from center
    const originX = 50 - Math.cos(angle) * 100; // Opposite direction
    const originY = 50 - Math.sin(angle) * 100;
    transformOrigin = `${originX}% ${originY}%`;
  }
  
  const svgPath = "M 47.384 1.64 C 48.385 1.067 49.615 1.067 50.616 1.64 L 95.183 27.17 C 96.194 27.75 96.818 28.826 96.818 29.992 L 96.818 81.008 C 96.818 82.174 96.194 83.25 95.183 83.83 L 50.616 109.36 C 49.615 109.933 48.385 109.933 47.384 109.36 L 2.817 83.83 C 1.806 83.25 1.182 82.174 1.182 81.008 L 1.182 29.992 C 1.182 28.826 1.806 27.75 2.817 27.17 Z";

  const testId = title ? `honeycomb-${title.toLowerCase().replace(/\s+/g, '-')}` : 'honeycomb-icon';

  const content = (
    <div 
      className="relative inline-block cursor-pointer overflow-hidden"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        clipPath: `polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={testId}
    >
      <div
        className="absolute inset-0 transition-all duration-500 ease-out"
        style={{
          transform: `scale(${hoverScale})`,
          transformOrigin: 'center center',
          zIndex: isHovered ? 50 : 1,
        }}
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
          {imageUrl && (
            <clipPath id={`hexClip-${title || Math.random()}`}>
              <path d={svgPath} />
            </clipPath>
          )}
        </defs>
        
        <g>
          {imageUrl && isHovered ? (
            <image
              href={imageUrl}
              x="0"
              y="0"
              width="98"
              height="111"
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#hexClip-${title || Math.random()})`}
              opacity="0.6"
            />
          ) : null}
          
          <path
            d={svgPath}
            fill={imageUrl && isHovered ? "rgba(0, 0, 0, 0.7)" : color}
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="1.5"
            className="transition-all duration-500"
            style={{ filter: isHovered ? `url(#glow-${title || Math.random()})` : 'none' }}
          />
        </g>
      </svg>
      
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 transition-all duration-500"
        style={{
          opacity: isHovered && imageUrl ? 0 : 1,
        }}
      >
        {icon && (
          <div className="text-white transition-transform duration-500" style={{ 
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

      {(description || imageUrl) && isHovered && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-4 transition-opacity duration-500"
          style={{
            opacity: 1,
          }}
        >
          {title && <div className="text-base font-bold text-white mb-2 z-10">{title}</div>}
          {description && <div className="text-xs text-white/90 leading-tight z-10">{description}</div>}
        </div>
      )}
      </div>
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
