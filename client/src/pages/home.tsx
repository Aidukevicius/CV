
import { useState } from "react";
import PersonalInfo from "@/components/PersonalInfo";
import BugShooterGame from "@/components/BugShooterGame";
import ProjectsGrid from "@/components/ProjectsGrid";
import Robot from "@/components/Robot";
import { Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [gameFullscreen, setGameFullscreen] = useState(false);

  return (
    <>
      <div className="min-h-screen w-full bg-background relative">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:h-screen">
          <div className="col-span-4 overflow-y-auto" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            <PersonalInfo />
          </div>
          
          <div className="col-span-4 overflow-y-auto" style={{ backgroundColor: "hsl(0 0% 3%)" }}>
            <BugShooterGame />
          </div>
          
          <div className="col-span-4 overflow-y-auto flex items-center" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            <ProjectsGrid />
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden min-h-screen overflow-y-auto">
          <div className="flex flex-col">
            <div className="flex-shrink-0 bg-card/50 backdrop-blur-sm sticky top-0 z-10" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
              <PersonalInfo />
            </div>

            <div className="relative min-h-[60vh]" style={{ backgroundColor: "hsl(0 0% 3%)" }}>
              <div className="absolute top-4 right-4 z-20">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setGameFullscreen(true)}
                  className="bg-background/80 backdrop-blur-sm"
                  data-testid="button-fullscreen"
                >
                  <Maximize2 className="w-5 h-5" />
                </Button>
              </div>
              <BugShooterGame />
            </div>

            <div className="min-h-screen" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
              <ProjectsGrid />
            </div>
          </div>
        </div>
      </div>

      {/* Robot decoration at bottom center */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 pointer-events-none z-30">
        <Robot />
      </div>

      {/* Fullscreen Game Modal */}
      {gameFullscreen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="absolute top-4 right-4 z-20">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setGameFullscreen(false)}
              className="bg-background/80 backdrop-blur-sm"
              data-testid="button-close-fullscreen"
              style={{ borderColor: "hsl(120 20% 30%)" }}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <BugShooterGame />
          </div>
        </div>
      )}
    </>
  );
}
