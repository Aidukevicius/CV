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
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h2 className="text-sm font-semibold mb-6 text-muted-foreground uppercase tracking-wide">
          Latest Projects
        </h2>
        
        <div className="flex flex-col items-center">
          <div className="flex justify-center mb-[-28px]">
            <HoneycombButton
              title={PROJECTS[0].title}
              description={PROJECTS[0].description}
              color={PROJECTS[0].color}
            />
          </div>

          <div className="flex justify-center gap-1 mb-[-28px]">
            <HoneycombButton
              title={PROJECTS[1].title}
              description={PROJECTS[1].description}
              color={PROJECTS[1].color}
            />
            <HoneycombButton
              title={PROJECTS[2].title}
              description={PROJECTS[2].description}
              color={PROJECTS[2].color}
            />
          </div>

          <div className="flex justify-center mb-[-28px]" style={{ marginLeft: '50px' }}>
            <HoneycombButton
              title="Portfolio"
              description="This website"
              color="rgba(168, 85, 247, 0.7)"
            />
          </div>

          <div className="flex justify-center gap-1 mb-[-28px]">
            <HoneycombButton
              title={PROJECTS[3].title}
              description={PROJECTS[3].description}
              color={PROJECTS[3].color}
            />
            <HoneycombButton
              title={PROJECTS[4].title}
              description={PROJECTS[4].description}
              color={PROJECTS[4].color}
            />
          </div>

          <div className="flex justify-center">
            <HoneycombButton
              title={PROJECTS[5].title}
              description={PROJECTS[5].description}
              color={PROJECTS[5].color}
            />
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
