
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
        {/* Desktop Layout - 3 equal columns */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:h-screen">
          {/* Left Column - Personal Info */}
          <div className="overflow-y-auto flex items-center" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            <div className="w-full">
              <PersonalInfo />
            </div>
          </div>
          
          {/* Center Column - Game + Robot */}
          <div className="overflow-y-auto flex flex-col items-center justify-center relative" style={{ backgroundColor: "hsl(0 0% 3%)" }}>
            <div className="w-full flex-1 flex items-center justify-center">
              <BugShooterGame />
            </div>
            <div className="w-full h-80 flex-shrink-0">
              <Robot />
            </div>
          </div>
          
          {/* Right Column - Projects */}
          <div className="overflow-y-auto flex items-center justify-center" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            <ProjectsGrid />
          </div>
        </div>

        {/* Tablet Layout - 2 columns + scroll */}
        <div className="hidden md:grid md:grid-cols-2 lg:hidden min-h-screen">
          {/* Left Column - Personal Info */}
          <div className="h-screen overflow-y-auto flex items-center" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            <div className="w-full">
              <PersonalInfo />
            </div>
          </div>
          
          {/* Right Column - Game + Robot */}
          <div className="h-screen overflow-y-auto flex flex-col items-center justify-center" style={{ backgroundColor: "hsl(0 0% 3%)" }}>
            <div className="w-full flex-1 flex items-center justify-center relative">
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
            <div className="w-full h-64 flex-shrink-0">
              <Robot />
            </div>
          </div>
          
          {/* Projects Section - Full Width Below */}
          <div className="col-span-2 min-h-screen flex items-center justify-center" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            <ProjectsGrid />
          </div>
        </div>

        {/* Mobile Layout - Single column, no robot */}
        <div className="md:hidden min-h-screen overflow-y-auto">
          <div className="flex flex-col">
            {/* Personal Info Section */}
            <div className="min-h-screen flex items-center sticky top-0 z-10" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
              <PersonalInfo />
            </div>

            {/* Game Section */}
            <div className="min-h-screen flex items-center justify-center relative" style={{ backgroundColor: "hsl(0 0% 3%)" }}>
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
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
              <ProjectsGrid />
            </div>
          </div>
        </div>
      </div>

      {/* Robot decoration at bottom center - Desktop only */}
      <div className="hidden lg:block fixed bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 pointer-events-none z-0" style={{ left: '50%' }}>
        {/* This is now handled in the center column */}
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
