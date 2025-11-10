
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
    <div className="w-full h-full flex items-center justify-center relative px-6 py-8" style={{ backgroundColor: 'transparent' }}>
      <div className="absolute inset-0 opacity-8 pointer-events-none">
        <HexagonBackground />
      </div>
      
      <div className="flex flex-col relative z-10 w-full max-w-2xl items-center">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "hsl(0 0% 70%)" }}>
            Projects
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto w-32" />
        </div>

        <div className="w-full mb-10">
          {/* Honeycomb Grid - Row 1: 2 hexagons */}
          <div className="flex justify-center gap-1 mb-[-1rem]">
            <div style={{ animation: 'fadeIn 0.6s ease-out 0.1s both' }}>
              <HoneycombButton
                title={PROJECTS[1].title}
                description={PROJECTS[1].description}
                color={PROJECTS[1].color}
                imageUrl={PROJECTS[1].imageUrl}
                popDirection="center"
              />
            </div>
            <div style={{ animation: 'fadeIn 0.6s ease-out 0.2s both' }}>
              <HoneycombButton
                title={PROJECTS[2].title}
                description={PROJECTS[2].description}
                color={PROJECTS[2].color}
                imageUrl={PROJECTS[2].imageUrl}
                popDirection="center"
              />
            </div>
          </div>

          {/* Row 2: 3 hexagons (including center) */}
          <div className="flex justify-center gap-1 mb-[-1rem]">
            <div style={{ animation: 'fadeIn 0.6s ease-out 0.3s both' }}>
              <HoneycombButton
                title={PROJECTS[3].title}
                description={PROJECTS[3].description}
                color={PROJECTS[3].color}
                imageUrl={PROJECTS[3].imageUrl}
                popDirection="center"
              />
            </div>
            <div style={{ animation: 'fadeIn 0.6s ease-out 0s both' }}>
              <HoneycombButton
                title={PROJECTS[0].title}
                description={PROJECTS[0].description}
                color={PROJECTS[0].color}
                imageUrl={PROJECTS[0].imageUrl}
                popDirection="up"
              />
            </div>
            <div style={{ animation: 'fadeIn 0.6s ease-out 0.4s both' }}>
              <HoneycombButton
                title={PROJECTS[4].title}
                description={PROJECTS[4].description}
                color={PROJECTS[4].color}
                imageUrl={PROJECTS[4].imageUrl}
                popDirection="center"
              />
            </div>
          </div>

          {/* Row 3: 2 hexagons */}
          <div className="flex justify-center gap-1">
            <div style={{ animation: 'fadeIn 0.6s ease-out 0.5s both' }}>
              <HoneycombButton
                title={PROJECTS[5].title}
                description={PROJECTS[5].description}
                color={PROJECTS[5].color}
                imageUrl={PROJECTS[5].imageUrl}
                popDirection="center"
              />
            </div>
            <div style={{ animation: 'fadeIn 0.6s ease-out 0.6s both' }}>
              <HoneycombButton
                title={PROJECTS[6].title}
                description={PROJECTS[6].description}
                color={PROJECTS[6].color}
                imageUrl={PROJECTS[6].imageUrl}
                popDirection="center"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="flex items-center gap-4 mb-5 justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
            <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "hsl(0 0% 60%)" }}>
              Connect
            </h3>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            {SOCIAL_LINKS.map((social, idx) => (
              <div 
                key={idx}
                style={{ animation: `fadeIn 0.5s ease-out ${0.7 + idx * 0.1}s both` }}
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
