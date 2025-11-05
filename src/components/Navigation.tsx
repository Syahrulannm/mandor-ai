import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg gradient-text">AI Automation</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("about")} className="text-muted-foreground hover:text-primary transition-colors">
              Tentang
            </button>
            <button onClick={() => scrollToSection("projects")} className="text-muted-foreground hover:text-primary transition-colors">
              Proyek
            </button>
            <Link to={"workflow"} className="text-muted-foreground hover:text-primary transition-colors">
              Workflow
            </Link>
            <button onClick={() => scrollToSection("blog")} className="text-muted-foreground hover:text-primary transition-colors">
              Blog
            </button>
            <Button onClick={() => scrollToSection("contact")} className="gradient-primary hover:opacity-90 transition-opacity">
              Kontak
            </Button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button onClick={() => scrollToSection("about")} className="block w-full text-left text-muted-foreground hover:text-primary transition-colors">
              Tentang
            </button>
            <button onClick={() => scrollToSection("projects")} className="block w-full text-left text-muted-foreground hover:text-primary transition-colors">
              Proyek
            </button>
            <Link to={"workflow"} className="text-muted-foreground hover:text-primary transition-colors">
              Workflow
            </Link>
            <button onClick={() => scrollToSection("blog")} className="block w-full text-left text-muted-foreground hover:text-primary transition-colors">
              Blog
            </button>
            <Button onClick={() => scrollToSection("contact")} className="w-full gradient-primary hover:opacity-90 transition-opacity">
              Kontak
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
