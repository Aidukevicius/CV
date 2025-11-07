interface LocationMapProps {
  city: string;
  timezone: string;
}

export default function LocationMap({ city, timezone }: LocationMapProps) {
  return (
    <div className="relative p-4 bg-card rounded-md border border-card-border overflow-hidden hover-elevate transition-all group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="flex items-center gap-4" style={{ height: '80px' }}>
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-foreground">Sibiu, Romania</h3>
          <div className="text-muted-foreground font-mono text-xs mt-1">
            {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            })} {timezone} · Local time
          </div>
        </div>
        <div className="relative rounded overflow-hidden" style={{ width: '60%', height: '100%' }}>
          <video
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover rounded"
          >
            <source src="/Sibiu.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
