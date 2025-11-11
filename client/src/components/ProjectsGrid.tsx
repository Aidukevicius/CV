
import { Mail, Linkedin, Github, FileText } from "lucide-react";
import HoneycombButton from "./HoneycombButton";

const PROJECTS = [
  {
    title: "E-Commerce",
    description: "Full-stack shopping platform",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=800&fit=crop"
  },
  {
    title: "Task Manager",
    description: "Productivity app with kanban",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=800&fit=crop"
  },
  {
    title: "Weather App",
    description: "Real-time weather tracking",
    imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=800&fit=crop"
  },
  {
    title: "Blog CMS",
    description: "Content management system",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=800&fit=crop"
  },
  {
    title: "Chat App",
    description: "Real-time messaging platform",
    imageUrl: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=800&fit=crop"
  },
  {
    title: "Portfolio",
    description: "Personal portfolio website",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop"
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

function ProjectCard({ title, imageUrl, delay }: { title: string; imageUrl: string; delay: number }) {
  const createHexagonPath = () => {
    const size = 60;
    const points: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      points.push([
        size + size * Math.cos(angle),
        size + size * Math.sin(angle)
      ]);
    }
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ') + ' Z';
  };

  return (
    <div 
      className="relative w-full aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer"
      style={{ 
        animation: `fadeIn 0.6s ease-out ${delay}s both`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/40" />
      
      {/* Centered Hexagon with Title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="drop-shadow-2xl"
          >
            <defs>
              <filter id={`glow-${title}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Black hexagon background */}
            <path
              d={createHexagonPath()}
              fill="rgba(0, 0, 0, 0.85)"
              className="transition-all duration-300 group-hover:fill-black"
            />
            
            {/* White border */}
            <path
              d={createHexagonPath()}
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="transition-all duration-300"
              style={{ filter: `url(#glow-${title})` }}
            />
          </svg>
          
          {/* Title text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p 
              className="text-white font-bold text-center px-4 text-sm transition-all duration-300 group-hover:scale-105"
              style={{ 
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                maxWidth: '100px',
                lineHeight: '1.2'
              }}
            >
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsGrid() {
  return (
    <div className="w-full h-full flex items-center justify-center relative px-6 py-8" style={{ backgroundColor: 'transparent' }}>
      <div className="flex flex-col relative z-10 w-full max-w-4xl items-center">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "hsl(0 0% 70%)" }}>
            Projects
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto w-32" />
        </div>

        {/* 2x3 Grid of Project Cards */}
        <div className="w-full mb-10 grid grid-cols-2 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={idx}
              title={project.title}
              imageUrl={project.imageUrl}
              delay={idx * 0.1}
            />
          ))}
        </div>

        {/* Social Links Section */}
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
