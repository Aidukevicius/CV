import { MapPin, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PersonalInfo() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-5xl font-bold mb-3 leading-tight" data-testid="text-name">
            Hello!<br />I'm Alex
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-intro">
            Full-stack developer with 5+ years of experience building modern web applications. 
            Passionate about clean code, interactive experiences, and hunting down bugs in the system.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 text-xs bg-accent rounded-md font-medium" data-testid="badge-age">
            28 y.o.
          </span>
          <span className="px-3 py-1.5 text-xs bg-accent rounded-md font-medium" data-testid="badge-stack">
            Full-Stack
          </span>
          <span className="px-3 py-1.5 text-xs bg-accent rounded-md font-medium" data-testid="badge-specialty">
            React/Node
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3 text-sm p-4 bg-card rounded-md border border-card-border" data-testid="location-info">
          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">San Francisco, CA</div>
            <div className="text-muted-foreground font-mono text-xs mt-1">
              {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })} PST · Local time
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <Button 
          className="w-full h-12 text-sm"
          asChild
          data-testid="button-contact"
        >
          <a href="mailto:hello@example.com">
            <Mail className="w-4 h-4 mr-2" />
            Contact me
          </a>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full h-12 text-sm"
          asChild
          data-testid="button-cv"
        >
          <Link href="/cv">
            <FileText className="w-4 h-4 mr-2" />
            CV
          </Link>
        </Button>
      </div>
    </div>
  );
}
