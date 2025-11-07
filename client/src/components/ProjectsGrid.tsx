
import { Mail, Linkedin, Github, FileText } from "lucide-react";
import HoneycombButton from "./HoneycombButton";
import HexagonBackground from "./HexagonBackground";

const PROJECTS = [
  {
    title: "E-Commerce",
    description: "Full-stack shopping platform",
    color: "rgba(120, 140, 100, 0.3)",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=400&fit=crop"
  },
  {
    title: "Task Manager",
    description: "Productivity app with kanban",
    color: "rgba(100, 130, 90, 0.3)",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=400&fit=crop"
  },
  {
    title: "Weather App",
    description: "Real-time weather tracking",
    color: "rgba(110, 135, 95, 0.3)",
    imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=400&fit=crop"
  },
  {
    title: "Blog CMS",
    description: "Content management system",
    color: "rgba(95, 125, 85, 0.3)",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=400&fit=crop"
  },
  {
    title: "Chat App",
    description: "Real-time messaging platform",
    color: "rgba(105, 130, 90, 0.3)",
    imageUrl: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=400&h=400&fit=crop"
  },
];

const SOCIAL_LINKS = [
  {
    icon: <Github />,
    href: "https://github.com",
    color: "rgba(100, 130, 90, 0.4)"
  },
  {
    icon: <Linkedin />,
    href: "https://linkedin.com",
    color: "rgba(110, 135, 95, 0.4)"
  },
  {
    icon: <Mail />,
    href: "mailto:example@email.com",
    color: "rgba(95, 125, 85, 0.4)"
  },
  {
    icon: <FileText />,
    href: "/cv",
    color: "rgba(105, 130, 90, 0.4)"
  }
];

export default function ProjectsGrid() {
  return (
    <div className="h-full flex flex-col bg-background relative">
      <div className="absolute inset-0 opacity-10">
        <HexagonBackground />
      </div>
      
      <div className="p-6 flex-1 flex flex-col relative z-10 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "hsl(120 20% 60%)" }}>
            Projects
          </h2>
          <div className="h-px bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-8 items-center justify-items-center">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.title}
                style={{
                  animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both`
                }}
              >
                <HoneycombButton
                  title={project.title}
                  description={project.description}
                  color={project.color}
                  imageUrl={project.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t relative z-10 mt-auto" style={{ borderColor: "hsl(120 20% 30%)" }}>
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: "hsl(120 20% 50%)" }}>
              Connect
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
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
    </div>
  );
}
