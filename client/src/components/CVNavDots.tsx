import { useEffect, useState } from "react";

interface CVNavDotsProps {
  sections: string[];
}

export default function CVNavDots({ sections }: CVNavDotsProps) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(id => document.getElementById(id));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index]);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => scrollToSection(index)}
          className="group relative"
          data-testid={`nav-dot-${section}`}
          aria-label={`Navigate to ${section}`}
        >
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${
              activeSection === index
                ? "bg-primary border-primary scale-125"
                : "bg-transparent border-muted-foreground/50 hover:border-primary hover:scale-110"
            }`}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover border border-popover-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {section}
          </span>
        </button>
      ))}
    </div>
  );
}
