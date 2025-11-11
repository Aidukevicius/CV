
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
      <div className="min-h-screen w-full bg-background relative overflow-hidden">
        {/* Desktop Layout - 3 equal columns */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:h-screen">
          {/* Left Column - Personal Info */}
          <div className="flex items-center" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            <div className="w-full">
              <PersonalInfo />
            </div>
          </div>
          
          {/* Center Column - Game */}
          <div className="flex items-start justify-center relative py-8" style={{ backgroundColor: "hsl(0 0% 3%)" }}>
            <div className="w-full flex items-start justify-center">
              <BugShooterGame />
            </div>
          </div>
          
          {/* Right Column - Projects */}
          <div className="flex items-center justify-center" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            <ProjectsGrid />
          </div>
        </div>

        {/* Tablet Layout - 2 columns + scroll */}
        <div className="hidden md:grid md:grid-cols-2 lg:hidden min-h-screen">
          {/* Left Column - Personal Info */}
          <div className="h-screen flex items-center" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            <div className="w-full">
              <PersonalInfo />
            </div>
          </div>
          
          {/* Right Column - Game */}
          <div className="h-screen flex items-start justify-center relative py-8" style={{ backgroundColor: "hsl(0 0% 3%)" }}>
            <div className="w-full flex items-start justify-center">
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
          </div>
          
          {/* Projects Section - Full Width Below */}
          <div className="col-span-2 py-16 flex items-center justify-center" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            <ProjectsGrid />
          </div>
        </div>

        {/* Mobile Layout - Single column, more compact */}
        <div className="md:hidden overflow-y-auto">
          <div className="flex flex-col">
            {/* Personal Info Section */}
            <div className="min-h-[80vh] flex items-center py-8" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
              <PersonalInfo />
            </div>

            {/* Game Section */}
            <div className="py-8 flex items-center justify-center relative" style={{ backgroundColor: "hsl(0 0% 3%)" }}>
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

            {/* Projects Section */}
            <div className="py-12 flex items-center justify-center" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
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
