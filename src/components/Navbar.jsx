import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeMobileToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      const sections = ["hero", "about", "skills", "projects", "contact"];
      let current = "hero";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      
      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed w-full z-40 transition-all duration-300 py-5"
    >
      <div className="container flex items-center justify-between">
        <a
          className={cn(
            "text-xl font-bold text-primary flex items-center transition-opacity duration-300",
            "md:opacity-100",
            currentSection === "hero" ? "opacity-100" : "opacity-0 max-md:pointer-events-none"
          )}
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"> BohdanCheban </span>
            Portfolio
          </span>
        </a>

        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
          <div className="lg:hidden ml-4">
            <ThemeMobileToggle />
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <div className={cn(
            "mr-3 transition-all duration-300",
            currentSection === "hero" ? "order-1" : "order-0 mr-0 absolute left-4"
          )}>
            <ThemeMobileToggle />
          </div>
          
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={cn(
              "p-2 text-foreground z-50 transition-all duration-300",
              currentSection === "hero" ? "order-2" : "order-1"
            )}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl text-center">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}; 