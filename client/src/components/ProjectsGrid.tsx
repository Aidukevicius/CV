import HoneycombButton from "./HoneycombButton";
import HexagonBackground from "./HexagonBackground";
import { Github, Linkedin, Twitter } from "lucide-react";

const PROJECTS = [
  { title: "E-Commerce", description: "Full-stack platform", color: "rgba(99, 102, 241, 0.7)" },
  { title: "Chat App", description: "Real-time messaging", color: "rgba(139, 92, 246, 0.7)" },
  { title: "Dashboard", description: "Analytics suite", color: "rgba(16, 185, 129, 0.7)" },
  { title: "AI Tool", description: "ML-powered SaaS", color: "rgba(245, 158, 11, 0.7)" },
  { title: "Mobile App", description: "React Native", color: "rgba(236, 72, 153, 0.7)" },
  { title: "API Gateway", description: "Microservices", color: "rgba(6, 182, 212, 0.7)" },
];

const SOCIAL_LINKS = [
  { icon: <Github />, href: "https://github.com", color: "rgba(51, 51, 51, 0.8)" },
  { icon: <Linkedin />, href: "https://linkedin.com", color: "rgba(0, 119, 181, 0.8)" },
  { icon: <Twitter />, href: "https://twitter.com", color: "rgba(29, 161, 242, 0.8)" },
];

export default function ProjectsGrid() {
  const hexWidth = 120;
  const hexHeight = 136;
  const radius = 145;

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-8 relative animate-fade-in">
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide relative z-10">
            Latest Projects
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent ml-4" />
        </div>
        
        <div className="relative flex justify-center items-center pb-8" style={{ minHeight: '520px' }}>
          <HexagonBackground />
          
          <div className="relative z-10" style={{ width: `${radius * 2 + hexWidth}px`, height: `${radius * 2 + hexHeight}px` }}>
            <div 
              className="absolute"
              style={{
                left: `${radius}px`,
                top: `${radius}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <HoneycombButton
                title="Portfolio"
                description="This website"
                color="rgba(168, 85, 247, 0.7)"
              />
            </div>

            {PROJECTS.map((project, idx) => {
              const angle = (idx * 60 - 90) * (Math.PI / 180);
              const x = radius + Math.cos(angle) * radius;
              const y = radius + Math.sin(angle) * radius;

              return (
                <div
                  key={project.title}
                  className="absolute"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -50%)',
                    animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both`
                  }}
                >
                  <HoneycombButton
                    title={project.title}
                    description={project.description}
                    color={project.color}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Connect
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="flex gap-2 justify-center">
          {SOCIAL_LINKS.map((social, idx) => (
            <div 
              key={idx}
              style={{ animation: `fadeIn 0.5s ease-out ${0.6 + idx * 0.1}s both` }}
            >
              <HoneycombButton
                icon={social.icon}
                href={social.href}
                size="sm"
                color={social.color}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
