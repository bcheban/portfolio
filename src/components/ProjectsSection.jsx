import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description:
      "A modern and responsive landing page template designed for SaaS products. It includes animated sections, smooth scrolling, dark mode, and clean layout. Built with React, TailwindCSS, and Zustand, it's optimized for performance and accessibility across all devices.",
    image: "/projects/project1.png",
    tags: ["React", "TailwindCSS", "TypeScript", "Zustand"],
    demoUrl: "https://react-landing-page-ivory-one.vercel.app",
    githubUrl: "https://github.com/bcheban/react-landing-page",
  },
  {
    id: 2,
    title: "NoteForge",
    description:
      "A full-stack note-taking platform that offers user authentication, advanced search capabilities, and persistent data storage. Built with Next.js leveraging the App Router architecture, it features a clean UI and efficient state management to provide a seamless user experience.",
    image: "/projects/project2.png",
    tags: ["Next.js", "Typescript", "Drizzle", "NeonDB", "ShadCN"],
    demoUrl: "https://next-noteforge.vercel.app",
    githubUrl: "https://github.com/bcheban/next-noteforge",
  },
  {
    id: 3,
    title: "Nuxt Recipe App",
    description:
      "An elegant and user-friendly recipe application built with Nuxt 4. Users can browse through a variety of recipes, view detailed instructions, and enjoy a smooth, responsive UI. The app emphasizes clean design and efficient performance on all devices.",
    image: "/projects/project3.png",
    tags: ["Nuxt", "Vue", "TypeScript", "TailwindCSS"],
    demoUrl: "https://nuxt-recipe-app-zeta.vercel.app",
    githubUrl: "https://github.com/bcheban/nuxt-recipe-app",
  },
  {
    id: 4,
    title: "HabitTracker Mobile",
    description:
      "A mobile app built with React Native to help users track daily habits. Includes streaks, reminders, and clean minimal UI. Available as an APK for Android.",
    image: "/projects/project4.png",
    tags: ["React Native", "Expo", "TypeScript", "Appwrite"],
    demoUrl: "https://t.me/+PcPU9gD4mwg0MmJi",
    githubUrl: "https://github.com/bcheban/rn-habit-tracker",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/bcheban"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
