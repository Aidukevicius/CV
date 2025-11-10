
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
    <div className="w-full h-full flex flex-col relative py-12 px-8" style={{ backgroundColor: 'transparent' }}>
      <div className="absolute inset-0 opacity-8 pointer-events-none">
        <HexagonBackground />
      </div>
      
      <div className="flex-1 flex flex-col relative z-10 max-w-xl mx-auto w-full justify-center">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "hsl(0 0% 70%)" }}>
            Projects
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto w-32" />
        </div>

        <div className="flex items-center justify-center mb-12">
          <div className="relative flex items-center justify-center" style={{ width: '450px', height: '450px' }}>
            {/* Center hexagon - pops straight up */}
            <div
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'fadeIn 0.6s ease-out 0s both'
              }}
            >
              <HoneycombButton
                title={PROJECTS[0].title}
                description={PROJECTS[0].description}
                color={PROJECTS[0].color}
                imageUrl={PROJECTS[0].imageUrl}
                popDirection="up"
              />
            </div>
            
            {/* 6 hexagons around center - pop toward the center */}
            {PROJECTS.slice(1).map((project, idx) => {
              const angle = (Math.PI / 3) * idx; // 60° increments
              const radius = 127; // Distance from center for proper honeycomb fit
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div
                  key={project.title}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    animation: `fadeIn 0.6s ease-out ${(idx + 1) * 0.1}s both`
                  }}
                >
                  <HoneycombButton
                    title={project.title}
                    description={project.description}
                    color={project.color}
                    imageUrl={project.imageUrl}
                    popDirection="center"
                    angle={angle}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border max-w-20" />
            <h3 className="text-sm font-semibold uppercase tracking-wide text-center" style={{ color: "hsl(0 0% 60%)" }}>
              Connect
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border max-w-20" />
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
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
