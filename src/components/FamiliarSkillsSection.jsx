import { useState } from "react";
import { cn } from "@/lib/utils";

const familiarSkills = [
  // Frontend
  { name: "Next.js", icon: "nextjs.svg", category: "frontend" },
  { name: "Vue", icon: "vue.svg", category: "frontend" },
  { name: "Nuxt", icon: "nuxt.svg", category: "frontend" },
  { name: "Zustand", icon: "zustand.svg", category: "frontend" },
  { name: "React Native", icon: "react-native.svg", category: "frontend" },
  { name: "ShadCN", icon: "shadcn.png", category: "frontend" },

  // Backend
  { name: "Appwrite", icon: "appwrite.svg", category: "backend" },
  { name: "Drizzle", icon: "drizzle.svg", category: "backend" },
  { name: "NeonDB", icon: "neondb.svg", category: "backend" },

  // Tools
  { name: "Expo", icon: "expo.svg", category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

export const FamiliarSkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = familiarSkills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="familiar-skills" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Familiar <span className="text-primary">Technologies</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card/50 p-6 rounded-xl shadow-md flex flex-col items-center justify-center gap-4 transition-transform hover:scale-[1.03] card-hover border border-primary/10"
            >
              <img
                src={`/icons/${skill.icon}`}
                alt={skill.name}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain opacity-80"
              />
              <h3 className="text-sm sm:text-base font-medium text-center opacity-80">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
