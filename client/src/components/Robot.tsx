export default function Robot() {
  return (
    <div 
      className="fixed left-1/2 -translate-x-1/2 z-40 pointer-events-none"
      data-testid="robot-decoration"
      style={{ bottom: '-25px', margin: 0, padding: 0 }}
    >
      <svg 
        width="180" 
        height="200" 
        viewBox="0 0 180 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(120 25% 30%)" />
            <stop offset="100%" stopColor="hsl(120 20% 20%)" />
          </linearGradient>
        </defs>
        
        <g filter="url(#glow)">
          <rect x="50" y="25" width="80" height="80" rx="12" fill="url(#bodyGradient)" stroke="hsl(120 45% 55%)" strokeWidth="3"/>
          
          <circle cx="75" cy="55" r="10" fill="hsl(120 70% 65%)" stroke="hsl(120 50% 50%)" strokeWidth="2">
            <animate attributeName="opacity" values="1;0.6;1" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="105" cy="55" r="10" fill="hsl(120 70% 65%)" stroke="hsl(120 50% 50%)" strokeWidth="2">
            <animate attributeName="opacity" values="1;0.6;1" dur="3s" repeatCount="indefinite"/>
          </circle>
          
          <circle cx="75" cy="55" r="5" fill="hsl(120 90% 80%)">
            <animate attributeName="r" values="5;6;5" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="105" cy="55" r="5" fill="hsl(120 90% 80%)">
            <animate attributeName="r" values="5;6;5" dur="3s" repeatCount="indefinite"/>
          </circle>
          
          <rect x="65" y="75" width="50" height="4" rx="2" fill="hsl(120 45% 55%)" opacity="0.8"/>
          <rect x="70" y="82" width="40" height="3" rx="1.5" fill="hsl(120 45% 55%)" opacity="0.6"/>
          <rect x="75" y="88" width="30" height="3" rx="1.5" fill="hsl(120 45% 55%)" opacity="0.4"/>
          
          <rect x="25" y="50" width="25" height="35" rx="6" fill="url(#bodyGradient)" stroke="hsl(120 45% 55%)" strokeWidth="2.5"/>
          <rect x="130" y="50" width="25" height="35" rx="6" fill="url(#bodyGradient)" stroke="hsl(120 45% 55%)" strokeWidth="2.5"/>
          
          <circle cx="37.5" cy="67.5" r="4" fill="hsl(120 60% 60%)" opacity="0.6"/>
          <circle cx="142.5" cy="67.5" r="4" fill="hsl(120 60% 60%)" opacity="0.6"/>
          
          <rect x="40" y="105" width="100" height="70" rx="10" fill="url(#bodyGradient)" stroke="hsl(120 45% 55%)" strokeWidth="3"/>
          
          <circle cx="70" cy="135" r="6" fill="hsl(120 55% 55%)" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.4;0.7" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="90" cy="135" r="6" fill="hsl(120 55% 55%)" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.4;0.7" dur="2s" begin="0.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="110" cy="135" r="6" fill="hsl(120 55% 55%)" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.4;0.7" dur="2s" begin="1s" repeatCount="indefinite"/>
          </circle>
          
          <rect x="50" y="150" width="12" height="4" rx="2" fill="hsl(120 45% 55%)" opacity="0.5"/>
          <rect x="65" y="150" width="12" height="4" rx="2" fill="hsl(120 45% 55%)" opacity="0.5"/>
          <rect x="80" y="150" width="12" height="4" rx="2" fill="hsl(120 45% 55%)" opacity="0.5"/>
          <rect x="95" y="150" width="12" height="4" rx="2" fill="hsl(120 45% 55%)" opacity="0.5"/>
          <rect x="110" y="150" width="12" height="4" rx="2" fill="hsl(120 45% 55%)" opacity="0.5"/>
          <rect x="125" y="150" width="12" height="4" rx="2" fill="hsl(120 45% 55%)" opacity="0.5"/>
          
          <rect x="55" y="175" width="18" height="25" rx="4" fill="url(#bodyGradient)" stroke="hsl(120 45% 55%)" strokeWidth="2.5"/>
          <rect x="107" y="175" width="18" height="25" rx="4" fill="url(#bodyGradient)" stroke="hsl(120 45% 55%)" strokeWidth="2.5"/>
          
          <line x1="90" y1="10" x2="90" y2="25" stroke="hsl(120 45% 55%)" strokeWidth="3"/>
          <circle cx="90" cy="8" r="5" fill="hsl(120 70% 65%)" stroke="hsl(120 50% 50%)" strokeWidth="2">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
          </circle>
        </g>
      </svg>
    </div>
  );
}
