import HoneycombButton from "./HoneycombButton";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SiInstagram } from "react-icons/si";

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
  { icon: <SiInstagram />, href: "https://instagram.com", color: "rgba(228, 64, 95, 0.8)" },
];

export default function ProjectsGrid() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h2 className="text-lg font-semibold mb-6 text-muted-foreground uppercase tracking-wide text-sm">
          Latest Projects
        </h2>
        
        <div className="flex flex-col items-center gap-1">
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={project.title}
                className="flex justify-center"
                style={{
                  marginLeft: isEven ? '0' : '50px',
                  marginTop: idx === 0 ? '0' : '-28px',
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

      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
          Connect
        </h3>
        <div className="flex gap-1 flex-wrap justify-center">
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
