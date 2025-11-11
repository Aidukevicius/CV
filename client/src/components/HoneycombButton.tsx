
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
  const hoverScale = isHovered ? (imageUrl ? 2.8 : 1.12) : 1;
  
  // Calculate transform origin for pop direction
  let transformOrigin = 'center center';
  if (popDirection === 'up') {
    transformOrigin = 'center bottom';
  } else if (popDirection === 'center') {
    // Pop toward center means transform origin is away from center
    const originX = 50 + Math.cos(angle) * 150; // Opposite direction for outward origin
    const originY = 50 + Math.sin(angle) * 150;
    transformOrigin = `${originX}% ${originY}%`;
  }
  
  const svgPath = "M 47.384 1.64 C 48.385 1.067 49.615 1.067 50.616 1.64 L 95.183 27.17 C 96.194 27.75 96.818 28.826 96.818 29.992 L 96.818 81.008 C 96.818 82.174 96.194 83.25 95.183 83.83 L 50.616 109.36 C 49.615 109.933 48.385 109.933 47.384 109.36 L 2.817 83.83 C 1.806 83.25 1.182 82.174 1.182 81.008 L 1.182 29.992 C 1.182 28.826 1.806 27.75 2.817 27.17 Z";

  const testId = title ? `honeycomb-${title.toLowerCase().replace(/\s+/g, '-')}` : 'honeycomb-icon';

  const content = (
    <div 
      className="relative inline-block cursor-pointer"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={testId}
    >
      <div
        className="absolute inset-0 transition-all duration-300 ease-out"
        style={{
          transform: `scale(${hoverScale}) translateY(${isHovered ? '-2px' : '0'})`,
          transformOrigin: transformOrigin,
          zIndex: isHovered ? 50 : 1,
          filter: isHovered ? 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))' : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
        }}
      >
      <svg
        width={width}
        height={height}
        viewBox="0 0 98 111"
        className="absolute inset-0"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id={`glow-${title || Math.random()}`}>
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id={`gradient-${title || Math.random()}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
          {imageUrl && (
            <clipPath id={`hexClip-${title || Math.random()}`}>
              <path d={svgPath} />
            </clipPath>
          )}
        </defs>
        
        <g>
          {/* Background layer */}
          <path
            d={svgPath}
            fill={imageUrl && isHovered ? "rgba(0, 0, 0, 0.8)" : color}
            className="transition-all duration-300"
          />
          
          {/* Image layer */}
          {imageUrl && isHovered && (
            <image
              href={imageUrl}
              x="0"
              y="0"
              width="98"
              height="111"
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#hexClip-${title || Math.random()})`}
              opacity="0.7"
              className="transition-opacity duration-300"
            />
          )}
          
          {/* Gradient overlay for depth */}
          <path
            d={svgPath}
            fill={`url(#gradient-${title || Math.random()})`}
            className="transition-opacity duration-300"
            opacity={isHovered ? 0.3 : 0.5}
          />
          
          {/* Border stroke */}
          <path
            d={svgPath}
            fill="none"
            stroke={isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.5)"}
            strokeWidth={isHovered ? "2" : "1.5"}
            className="transition-all duration-300"
            style={{ filter: isHovered ? `url(#glow-${title || Math.random()})` : 'none' }}
          />
        </g>
      </svg>
      
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 transition-all duration-300"
        style={{
          opacity: isHovered && imageUrl ? 0 : 1,
          transform: isHovered && !imageUrl ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {icon && (
          <div 
            className="text-white transition-all duration-300" 
            style={{ 
              fontSize: size === "sm" ? "20px" : "28px",
              filter: isHovered ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))' : 'none',
              transform: isHovered ? 'translateY(-1px)' : 'translateY(0)'
            }}
          >
            {icon}
          </div>
        )}
        {title && !icon && (
          <div 
            className="text-sm font-semibold text-white px-2 leading-tight transition-all duration-300"
            style={{
              textShadow: isHovered ? '0 2px 4px rgba(0, 0, 0, 0.5)' : 'none'
            }}
          >
            {title}
          </div>
        )}
      </div>

      {(description || imageUrl) && isHovered && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 py-6 transition-all duration-300"
          style={{
            opacity: 1,
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {title && (
            <div 
              className="text-lg font-bold text-white mb-3 z-10 leading-tight"
              style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)' }}
            >
              {title}
            </div>
          )}
          {description && (
            <div 
              className="text-sm text-white leading-relaxed z-10 max-w-[90%]"
              style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)' }}
            >
              {description}
            </div>
          )}
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
