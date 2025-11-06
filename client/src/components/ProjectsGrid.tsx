import HoneycombButton from "./HoneycombButton";
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
  const hexWidth = 98;
  const hexHeight = 111;
  const radius = 115;

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h2 className="text-sm font-semibold mb-6 text-muted-foreground uppercase tracking-wide">
          Latest Projects
        </h2>
        
        <div className="flex justify-center items-center" style={{ minHeight: '320px' }}>
          <div className="relative" style={{ width: `${radius * 2 + hexWidth}px`, height: `${radius * 2 + hexHeight}px` }}>
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

      <div className="pt-4 border-t border-border">
        <h3 className="text-xs font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
          Connect
        </h3>
        <div className="flex gap-2 justify-center">
          {SOCIAL_LINKS.map((social, idx) => (
            <HoneycombButton
              key={idx}
              icon={social.icon}
              href={social.href}
              size="sm"
              color={social.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
