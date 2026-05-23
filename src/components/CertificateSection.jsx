import { useState } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

const certificates = [
  {
    image: "CSS_на_курсі_FrontEnd_Чебан_Богдан_page1.png",
    title: "GoITeens Certificate",
    issuer: "GoITeens",
    description:
      "Final certificate from GoITeens, confirming completion of the final module and practical frontend achievements.",
    year: "2025",
    category: "GoITeens",
  },
  {
    image: "Сертифікат_про_досягнення_другого_року_JavaScript_на_курсі_FrontEnd_page1.png",
    title: "GoITeens Certificate",
    issuer: "GoITeens",
    description:
      "Certificate from GoITeens, confirming successful completion of a frontend learning module.",
    year: "2024",
    category: "GoITeens",
  },
  {
    image: "Сертифікат_про_досягнення_на_курсі_FrontEnd_Чебан_Богдан_page1.png",
    title: "GoITeens Certificate",
    issuer: "GoITeens",
    description:
      "Certificate from GoITeens, confirming successful completion of a frontend learning module.",
    year: "2024",
    category: "GoITeens",
  },
  {
    image: "cheban-certificate_page1.png",
    title: "Mate Academy Certificate 1",
    issuer: "Mate Academy",
    description:
      "Certificate from Mate Academy awarded for completion of a full stack course module.",
    year: "2026",
    module: "Module 1",
    category: "Mate Academy",
  },
  {
    image: "cheban-certificate_(1)_page1.png",
    title: "Mate Academy Certificate 2",
    issuer: "Mate Academy",
    description:
      "Certificate from Mate Academy awarded for completion of a full stack course module.",
    year: "2026",
    module: "Module 2",
    category: "Mate Academy",
  },
  {
    image: "cheban-certificate_(2)_page1.png",
    title: "Mate Academy Certificate 3",
    issuer: "Mate Academy",
    description:
      "Certificate from Mate Academy awarded for completion of a full stack course module.",
    year: "2026",
    module: "Module 3",
    category: "Mate Academy",
  },
  {
    image: "cheban-certificate_(4)_page1.png",
    title: "Mate Academy Certificate 4",
    issuer: "Mate Academy",
    description:
      "Certificate from Mate Academy awarded for completion of a full stack course module.",
    year: "2026",
    module: "Module 4",
    category: "Mate Academy",
  },
  {
    image: "cheban-certificate_(5)_page1.png",
    title: "Mate Academy Certificate 5",
    issuer: "Mate Academy",
    description:
      "Certificate from Mate Academy awarded for completion of a full stack course module.",
    year: "2026",
    module: "Module 5",
    category: "Mate Academy",
  },
  {
    image: "cheban-certificate_(6)_page1.png",
    title: "Mate Academy Certificate 6",
    issuer: "Mate Academy",
    description:
      "Certificate from Mate Academy awarded for completion of a full stack course module.",
    year: "2026",
    module: "Module 6",
    category: "Mate Academy",
  },
  {
    image: "cheban-certificate_(7)_page1.png",
    title: "Mate Academy Certificate 7",
    issuer: "Mate Academy",
    description:
      "Certificate from Mate Academy awarded for completion of a full stack course module.",
    year: "2026",
    module: "Module 7",
    category: "Mate Academy",
  },
  {
    image: "cheban-certificate_(8)_page1.png",
    title: "Mate Academy Certificate 8",
    issuer: "Mate Academy",
    description:
      "Certificate from Mate Academy awarded for completion of a full stack course module.",
    year: "2026",
    module: "Module 8",
    category: "Mate Academy",
  },
  {
    image: "cheban-certificate_(9)_page1.png",
    title: "Mate Academy Certificate 9",
    issuer: "Mate Academy",
    description:
      "Certificate from Mate Academy awarded for completion of a full stack course module.",
    year: "2026",
    module: "Module 9",
    category: "Mate Academy",
  },
  {
    image: "cheban-certificate_(10)_page1.png",
    title: "Mate Academy Certificate 10",
    issuer: "Mate Academy",
    description:
      "Certificate from Mate Academy awarded for completion of a full stack course module.",
    year: "2026",
    module: "Module 10",
    category: "Mate Academy",
  },
  {
    image: "cheban-certificate_(11)_page1.png",
    title: "Mate Academy Certificate 11",
    issuer: "Mate Academy",
    description:
      "Certificate from Mate Academy awarded for completion of a full stack course module.",
    year: "2026",
    module: "Module 11",
    category: "Mate Academy",
  },
  {
    image: "cheban-certificate_3_page1.png",
    title: "Mate Academy Certificate 12",
    issuer: "Mate Academy",
    description:
      "Certificate from Mate Academy awarded for completion of a full stack course module.",
    year: "2026",
    module: "Module 12",
    category: "Mate Academy",
  },
  {
    image: "cheban-certificate_12_page1.png",
    title: "Mate Academy Certificate 13",
    issuer: "Mate Academy",
    description:
      "Certificate from Mate Academy awarded for completion of a full stack course module.",
    year: "2026",
    module: "Module 13",
    category: "Mate Academy",
  },
];

const categories = ["GoITeens", "Mate Academy"];

export const CertificateSection = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const filteredCertificates = certificates.filter((cert) => cert.category === activeCategory);

  return (
    <section id="certificates" className="py-24 px-4 relative bg-secondary/20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Certificates <span className="text-primary">and Achievements</span>
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

        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">{activeCategory}</p>
          <h3 className="text-2xl font-semibold">
            {activeCategory === "GoITeens" ? "GoITeens Certificates" : "Mate Academy Certificates"}
          </h3>
        </div>

        {filteredCertificates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert, key) => {
              const certificatePath = `/certificates/${encodeURIComponent(cert.image)}`;

              return (
                <div
                  key={key}
                  className={cn(
                    "group bg-card rounded-3xl overflow-hidden border border-border/50 shadow-xs transition-transform duration-300 hover:-translate-y-1 h-full flex flex-col"
                  )}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-950/10">
                    <img
                      src={certificatePath}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-xs uppercase tracking-[0.24em] text-primary/90 mb-2">
                      {cert.issuer}
                    </p>
                    <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                    {cert.module && (
                      <p className="text-xs uppercase tracking-[0.24em] text-secondary mb-3">
                        {cert.module}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mb-6 flex-grow">
                      {cert.description}
                    </p>
                    <div className="mt-auto flex flex-col gap-4">
                      <div className="flex items-center justify-between text-sm text-secondary">
                        <span>{cert.year}</span>
                      </div>
                      <a
                        href={certificatePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                      >
                        View Certificate
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-primary/30 bg-card/80 p-12 text-center">
            <p className="text-lg font-medium mb-3">Certificates will be added later.</p>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Add certificate images to the folder <code className="rounded bg-secondary px-2 py-1">/public/certificates</code> and update the array in <code className="font-mono">CertificateSection.jsx</code>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
