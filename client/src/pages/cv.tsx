import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import CVNavDots from "@/components/CVNavDots";

const CV_SECTIONS = ["About", "Experience", "Education", "Skills", "Projects"];

export default function CV() {
  return (
    <div className="min-h-screen bg-background">
      <CVNavDots sections={CV_SECTIONS} />
      
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild data-testid="button-back">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </div>

        <div id="About" className="py-12 scroll-mt-8">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-cv-name">Alex Johnson - CV</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Full-Stack Developer · 28 y.o. · San Francisco, CA
          </p>
          <p className="text-base leading-relaxed text-foreground max-w-prose">
            Full-stack developer with 5+ years of production experience in various tech areas. 
            Experienced in creating modern web applications, APIs, and interactive user experiences. 
            I have experience working for companies on both local and international scale.
          </p>
          <p className="text-base leading-relaxed text-foreground max-w-prose mt-4">
            As a developer, I always consider balance—the balance between code quality and development 
            speed, between user needs and business goals. However, I prefer high-quality solutions and 
            clean, maintainable code. I'm always ready to learn something new.
          </p>
        </div>

        <div id="Experience" className="py-12 border-t border-border scroll-mt-8">
          <h2 className="text-3xl font-bold mb-8">Experience</h2>
          
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">Senior Full-Stack Developer</h3>
                  <p className="text-muted-foreground">TechCorp Inc.</p>
                </div>
                <span className="text-sm text-muted-foreground font-mono">2021 - Present</span>
              </div>
              <p className="text-foreground leading-relaxed">
                Led development of modern web applications using React, Node.js, and PostgreSQL. 
                Implemented CI/CD pipelines and mentored junior developers. Improved application 
                performance by 40% through optimization strategies.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">Full-Stack Developer</h3>
                  <p className="text-muted-foreground">StartupXYZ</p>
                </div>
                <span className="text-sm text-muted-foreground font-mono">2019 - 2021</span>
              </div>
              <p className="text-foreground leading-relaxed">
                Built and maintained multiple web applications from scratch. Collaborated with 
                designers to create pixel-perfect UIs. Developed RESTful APIs and integrated 
                third-party services.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">Junior Developer</h3>
                  <p className="text-muted-foreground">Digital Agency Co.</p>
                </div>
                <span className="text-sm text-muted-foreground font-mono">2018 - 2019</span>
              </div>
              <p className="text-foreground leading-relaxed">
                Developed responsive websites and web applications for various clients. 
                Worked with HTML, CSS, JavaScript, and WordPress. Learned modern development 
                practices and agile methodologies.
              </p>
            </div>
          </div>
        </div>

        <div id="Education" className="py-12 border-t border-border scroll-mt-8">
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">Bachelor of Science in Computer Science</h3>
                  <p className="text-muted-foreground">University of California, Berkeley</p>
                </div>
                <span className="text-sm text-muted-foreground font-mono">2014 - 2018</span>
              </div>
              <p className="text-foreground">
                Focus on software engineering, algorithms, and web technologies. 
                Graduated with honors.
              </p>
            </div>
          </div>
        </div>

        <div id="Skills" className="py-12 border-t border-border scroll-mt-8">
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Next.js", "TailwindCSS", "HTML/CSS"].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-accent rounded-md text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-accent rounded-md text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">DevOps & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {["Git", "Docker", "AWS", "CI/CD", "Linux"].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-accent rounded-md text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "TypeScript", "Python", "SQL"].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-accent rounded-md text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="Projects" className="py-12 border-t border-border scroll-mt-8">
          <h2 className="text-3xl font-bold mb-8">Notable Projects</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">E-Commerce Platform</h3>
              <p className="text-foreground leading-relaxed">
                Built a full-stack e-commerce platform with React, Node.js, and PostgreSQL. 
                Features include product catalog, shopping cart, payment integration, and admin dashboard. 
                Handles 10k+ daily active users.
              </p>
              <div className="flex gap-2 flex-wrap mt-2">
                <span className="text-xs px-2 py-1 bg-muted rounded">React</span>
                <span className="text-xs px-2 py-1 bg-muted rounded">Node.js</span>
                <span className="text-xs px-2 py-1 bg-muted rounded">PostgreSQL</span>
                <span className="text-xs px-2 py-1 bg-muted rounded">Stripe</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Real-Time Chat Application</h3>
              <p className="text-foreground leading-relaxed">
                Developed a real-time messaging platform using WebSockets, Redis, and React. 
                Supports group chats, direct messages, file sharing, and push notifications.
              </p>
              <div className="flex gap-2 flex-wrap mt-2">
                <span className="text-xs px-2 py-1 bg-muted rounded">React</span>
                <span className="text-xs px-2 py-1 bg-muted rounded">WebSocket</span>
                <span className="text-xs px-2 py-1 bg-muted rounded">Redis</span>
                <span className="text-xs px-2 py-1 bg-muted rounded">MongoDB</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
              <p className="text-foreground leading-relaxed">
                Created an interactive analytics dashboard with data visualization, real-time updates, 
                and custom reporting features. Processes millions of data points efficiently.
              </p>
              <div className="flex gap-2 flex-wrap mt-2">
                <span className="text-xs px-2 py-1 bg-muted rounded">React</span>
                <span className="text-xs px-2 py-1 bg-muted rounded">D3.js</span>
                <span className="text-xs px-2 py-1 bg-muted rounded">Node.js</span>
                <span className="text-xs px-2 py-1 bg-muted rounded">TimescaleDB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
