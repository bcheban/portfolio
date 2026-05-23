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
  {
    id: 5,
    title: "2048 JS Game",
    description:
      "A polished browser version of the classic 2048 game with smooth tile animations, keyboard and touch controls, and responsive layout. Built with JavaScript, semantic HTML, and SCSS for a clean and modern experience.",
    image: "/projects/project5.png",
    tags: ["JS", "HTML", "SCSS"],
    demoUrl: "https://bcheban.github.io/2048_js-game/",
    githubUrl: "https://github.com/bcheban/2048_js-game",
  },
  {
    id: 6,
    title: "MyBike Landing Page",
    description:
      "A stylish landing page for an electric bike brand, with an immersive hero section, product comparison layout, and responsive details. Built with HTML and SCSS, it highlights features, pricing, and the bike experience in a clean, modern design.",
    image: "/projects/project6.png",
    tags: ["HTML", "SCSS"],
    demoUrl: "https://bcheban.github.io/mybike_landing-page/",
    githubUrl: "https://github.com/bcheban/mybike_landing-page",
  },
  {
    id: 7,
    title: "Weather Dashboard",
    description:
      "A weather dashboard with city search, current conditions, interactive charts, and notification feedback. Built with React, Tailwind, Chart.js, React Toastify, and react-icons for a dynamic user experience.",
    image: "/projects/project7.png",
    tags: ["React", "Tailwind", "Chart.js", "React-toastify", "react-icons"],
    demoUrl: "https://react-weather-dashboard.vercel.app/",
    githubUrl: "https://github.com/bcheban/react-weather-app",
  },
  {
    id: 8,
    title: "React Phone Catalog",
    description:
      "A responsive phone catalog built with React, using Redux Toolkit, React Router DOM, Bulma, and i18next. The app includes searchable product cards, filters, animations, and polished UI interactions.",
    image: "/projects/project8.png",
    tags: ["React", "Redux Toolkit", "React Router", "Bulma", "i18next", "react-select", "Swiper"],
    demoUrl: "https://bcheban.github.io/phone-catalog_react/",
    githubUrl: "https://github.com/bcheban/phone-catalog_react",
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
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover flex flex-col h-full border border-border/50"
            >
              {/* Image section */}
              <div className="h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content section */}
              <div className="p-6 flex flex-col flex-grow">
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
                <p className="text-muted-foreground text-sm mb-6">
                  {project.description}
                </p>

                {/* Icons row - will always stay at the bottom */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/40">
                  <div className="flex space-x-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={18} />
                      <span>Demo</span>
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
            rel="noopener noreferrer"
            href="https://github.com/bcheban"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};