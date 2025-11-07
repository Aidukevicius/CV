
import { useState } from "react";
import PersonalInfo from "@/components/PersonalInfo";
import BugShooterGame from "@/components/BugShooterGame";
import ProjectsGrid from "@/components/ProjectsGrid";
import { Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [gameFullscreen, setGameFullscreen] = useState(false);

  return (
    <>
      <div className="min-h-screen w-full bg-background relative">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:h-screen">
          <div className="col-span-4 border-r overflow-y-auto" style={{ borderColor: "hsl(120 20% 30%)" }}>
            <PersonalInfo />
          </div>
          
          <div className="col-span-4 overflow-y-auto">
            <BugShooterGame />
          </div>
          
          <div className="col-span-4 border-l overflow-y-auto" style={{ borderColor: "hsl(120 20% 30%)" }}>
            <ProjectsGrid />
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden min-h-screen overflow-y-auto">
          <div className="flex flex-col">
            <div className="flex-shrink-0 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10" style={{ borderColor: "hsl(120 20% 30%)" }}>
              <PersonalInfo />
            </div>

            <div className="relative bg-background min-h-[60vh]">
              <div className="absolute top-4 right-4 z-20">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setGameFullscreen(true)}
                  className="bg-background/80 backdrop-blur-sm"
                  data-testid="button-fullscreen"
                  style={{ borderColor: "hsl(120 20% 30%)" }}
                >
                  <Maximize2 className="w-5 h-5" />
                </Button>
              </div>
              <BugShooterGame />
            </div>

            <div className="border-t min-h-screen" style={{ borderColor: "hsl(120 20% 30%)" }}>
              <ProjectsGrid />
            </div>
          </div>
        </div>
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
