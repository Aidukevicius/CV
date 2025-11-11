
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import PersonalInfo from "@/components/PersonalInfo";
import BugShooterGame from "@/components/BugShooterGame";
import ProjectsGrid from "@/components/ProjectsGrid";
import { Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const [gameFullscreen, setGameFullscreen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <div className="min-h-screen w-full bg-background relative overflow-hidden">
        {/* Desktop Layout - 3 equal columns */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:h-screen lg:gap-0">
          {/* Left Column - Personal Info */}
          <div className="flex items-center relative border-r border-border/30" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            <div className="w-full px-8 py-12">
              <PersonalInfo />
            </div>
            {/* Gradient divider */}
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent pointer-events-none" />
          </div>
          
          {/* Center Column - Game */}
          <div className="flex items-start justify-center relative py-8 border-r border-border/30" style={{ backgroundColor: "hsl(0 0% 3%)" }}>
            <div className="w-full flex items-start justify-center px-6">
              <BugShooterGame />
            </div>
            {/* Gradient divider */}
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent pointer-events-none" />
          </div>
          
          {/* Right Column - Projects */}
          <div className="flex items-center justify-center" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            <div className="w-full px-8 py-12">
              <ProjectsGrid />
            </div>
          </div>
        </div>

        {/* Tablet Layout - 2 columns + scroll */}
        <div className="hidden md:grid md:grid-cols-2 lg:hidden min-h-screen">
          {/* Left Column - Personal Info */}
          <div className="h-screen flex items-center relative border-r border-border/30" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            <div className="w-full px-8 py-12">
              <PersonalInfo />
            </div>
            {/* Gradient divider */}
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent pointer-events-none" />
          </div>
          
          {/* Right Column - Game */}
          <div className="h-screen flex items-start justify-center relative py-8" style={{ backgroundColor: "hsl(0 0% 3%)" }}>
            <div className="w-full flex items-start justify-center px-6">
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
          <div className="col-span-2 py-16 flex items-center justify-center border-t border-border/30 relative" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
            {/* Gradient divider */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent pointer-events-none" />
            <div className="w-full px-8">
              <ProjectsGrid />
            </div>
          </div>
        </div>

        {/* Mobile Layout - Single column, more compact */}
        <div className="md:hidden overflow-y-auto">
          <div className="flex flex-col">
            {/* Personal Info Section */}
            <div className="min-h-[80vh] flex items-center py-8 px-6 relative border-b border-border/30" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
              <PersonalInfo />
              {/* Gradient divider */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent pointer-events-none" />
            </div>

            {/* Game Section - Mobile with auto-fullscreen */}
            <div className="py-8 px-4 flex items-center justify-center relative border-b border-border/30" style={{ backgroundColor: "hsl(0 0% 3%)" }}>
              <div className={gameFullscreen ? "fixed inset-0 z-50 bg-background flex items-center justify-center p-4" : "w-full"}>
                {gameFullscreen && (
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
                )}
                {!gameFullscreen && (
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
                )}
                <BugShooterGame 
                  autoFullscreenOnMobile={isMobile && !gameFullscreen}
                  onRequestFullscreen={() => setGameFullscreen(true)}
                  isInFullscreen={gameFullscreen}
                />
              </div>
              {/* Gradient divider */}
              {!gameFullscreen && (
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent pointer-events-none" />
              )}
            </div>

            {/* Projects Section */}
            <div className="py-12 px-6 flex items-center justify-center" style={{ backgroundColor: "hsl(0 0% 5%)" }}>
              <ProjectsGrid />
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Game Modal for Desktop/Tablet */}
      {gameFullscreen && (
        <div className="hidden md:block fixed inset-0 z-50 bg-background flex-col">
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
            <BugShooterGame isInFullscreen={true} />
          </div>
        </div>
      )}
    </>
  );
}
