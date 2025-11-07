
import { Mail, Linkedin, Github, FileText } from "lucide-react";
import HoneycombButton from "./HoneycombButton";
import HexagonBackground from "./HexagonBackground";

const PROJECTS = [
  {
    title: "E-Commerce",
    description: "Full-stack shopping platform",
    color: "rgba(120, 140, 100, 0.2)",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=400&fit=crop"
  },
  {
    title: "Task Manager",
    description: "Productivity app with kanban",
    color: "rgba(100, 130, 90, 0.2)",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=400&fit=crop"
  },
  {
    title: "Weather App",
    description: "Real-time weather tracking",
    color: "rgba(110, 135, 95, 0.2)",
    imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=400&fit=crop"
  },
  {
    title: "Blog CMS",
    description: "Content management system",
    color: "rgba(95, 125, 85, 0.2)",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=400&fit=crop"
  },
  {
    title: "Chat App",
    description: "Real-time messaging platform",
    color: "rgba(105, 130, 90, 0.2)",
    imageUrl: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=400&h=400&fit=crop"
  },
  {
    title: "Portfolio",
    description: "Personal portfolio website",
    color: "rgba(115, 138, 98, 0.2)",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop"
  },
  {
    title: "Dashboard",
    description: "Analytics dashboard",
    color: "rgba(108, 133, 93, 0.2)",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop"
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
    <div className="h-full flex flex-col relative" style={{ backgroundColor: 'hsl(0 0% 3%)' }}>
      <div className="absolute inset-0 opacity-8">
        <HexagonBackground />
      </div>
      
      <div className="p-6 flex-1 flex flex-col relative z-10 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "hsl(120 20% 55%)" }}>
            Projects
          </h2>
          <div className="h-px bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="flex-1 py-8">
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto px-4">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.title}
                className="flex justify-center"
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

        <div className="pt-6 relative z-10 mt-auto">
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
