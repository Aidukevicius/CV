import { Mail, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import LocationMap from "./LocationMap";

export default function PersonalInfo() {
  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 max-h-screen lg:max-h-none overflow-hidden max-w-md mx-auto w-full">
      <div className="flex items-center justify-center">
        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-accent border-2 border-border flex items-center justify-center hover-elevate transition-all">
          <User className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-3 lg:space-y-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 leading-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text" data-testid="text-name">
            Hello!<br />I'm Alex
          </h1>
          <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed" data-testid="text-intro">
            Full-stack developer with 5+ years of experience building modern web applications. 
            Passionate about clean code and hunting bugs.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 text-xs bg-accent/80 backdrop-blur-sm rounded-md font-medium hover-elevate transition-all" data-testid="badge-age">
            28 y.o.
          </span>
          <span className="px-3 py-1.5 text-xs bg-accent/80 backdrop-blur-sm rounded-md font-medium hover-elevate transition-all" data-testid="badge-stack">
            Full-Stack
          </span>
          <span className="px-3 py-1.5 text-xs bg-accent/80 backdrop-blur-sm rounded-md font-medium hover-elevate transition-all" data-testid="badge-specialty">
            React/Node
          </span>
        </div>
      </div>

      <LocationMap city="San Francisco, CA" timezone="PST" />

      <div className="flex flex-col gap-3">
        <Button 
          className="w-full h-10 lg:h-11 text-sm transition-all"
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
          className="w-full h-10 lg:h-11 text-sm transition-all"
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
