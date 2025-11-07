interface LocationMapProps {
  city: string;
  timezone: string;
}

export default function LocationMap({ city, timezone }: LocationMapProps) {
  return (
    <div className="relative p-4 bg-card rounded-md border border-card-border overflow-hidden hover-elevate transition-all group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="relative rounded overflow-hidden" style={{ height: '80px' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover rounded"
        >
          <source src="/Sibiu.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute bottom-2 left-4 text-sm z-10 bg-black/50 px-2 py-1 rounded">
        <div className="font-medium text-white">{city}</div>
        <div className="text-white/80 font-mono text-xs">
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
