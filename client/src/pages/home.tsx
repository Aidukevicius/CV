import PersonalInfo from "@/components/PersonalInfo";
import BugShooterGame from "@/components/BugShooterGame";
import ProjectsGrid from "@/components/ProjectsGrid";

export default function Home() {
  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <div className="grid grid-cols-12 h-full">
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
    </div>
  );
}
