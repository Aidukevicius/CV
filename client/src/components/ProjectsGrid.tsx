import HoneycombButton from "./HoneycombButton";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SiInstagram } from "react-icons/si";

const PROJECTS = [
  { title: "E-Commerce", description: "Full-stack shop", color: "#3b82f6" },
  { title: "Chat App", description: "Real-time messaging", color: "#8b5cf6" },
  { title: "Dashboard", description: "Analytics platform", color: "#10b981" },
  { title: "AI Tool", description: "ML-powered app", color: "#f59e0b" },
  { title: "Mobile App", description: "React Native", color: "#ec4899" },
  { title: "API Service", description: "Microservices", color: "#06b6d4" },
];

const SOCIAL_LINKS = [
  { icon: <Github />, href: "https://github.com", color: "#333" },
  { icon: <Linkedin />, href: "https://linkedin.com", color: "#0077b5" },
  { icon: <Twitter />, href: "https://twitter.com", color: "#1da1f2" },
  { icon: <SiInstagram />, href: "https://instagram.com", color: "#e4405f" },
];

export default function ProjectsGrid() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Latest Projects</h2>
        
        <div className="relative">
          <div 
            className="grid gap-4"
            style={{
              gridTemplateColumns: 'repeat(2, 1fr)',
              marginLeft: '44px'
            }}
          >
            {PROJECTS.map((project, idx) => (
              <div 
                key={project.title}
                style={{
                  gridColumn: idx % 2 === 1 ? '2' : '1',
                  marginTop: idx >= 2 ? '-25px' : '0',
                  marginLeft: idx % 2 === 1 ? '-44px' : '0',
                }}
              >
                <HoneycombButton
                  title={project.title}
                  description={project.description}
                  color={project.color}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h3 className="text-lg font-semibold mb-4">Connect</h3>
        <div className="flex gap-2 flex-wrap">
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
