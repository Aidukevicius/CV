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
      <div className="h-screen w-full overflow-hidden bg-background relative">
        <div className="hidden lg:grid grid-cols-12 h-full">
          <div className="col-span-4 border-r border-border overflow-y-auto">
            <PersonalInfo />
          </div>
          
          <div className="col-span-4 overflow-y-auto">
            <BugShooterGame />
          </div>
          
          <div className="col-span-4 border-l border-border overflow-y-auto">
            <ProjectsGrid />
          </div>
        </div>

        <div className="lg:hidden h-full overflow-y-auto">
          <div className="min-h-screen flex flex-col">
            <div className="flex-shrink-0 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
              <PersonalInfo />
            </div>

            <div className="relative bg-background">
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

            <div className="border-t border-border">
              <ProjectsGrid />
            </div>
          </div>
        </div>
      </div>

      {gameFullscreen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="absolute top-4 right-4 z-20">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setGameFullscreen(false)}
              className="bg-background/80 backdrop-blur-sm"
              data-testid="button-close-fullscreen"
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
