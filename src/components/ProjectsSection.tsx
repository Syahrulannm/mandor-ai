import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "AI Email Automation",
    description: "Sistem otomasi email cerdas menggunakan GPT-4 untuk merespons dan mengkategorikan email secara otomatis.",
    tags: ["Python", "OpenAI", "Automation"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Workflow Orchestrator",
    description: "Platform visual untuk membangun dan mengelola workflow automation yang kompleks dengan drag-and-drop interface.",
    tags: ["TypeScript", "React", "Node.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    githubUrl: "https://github.com",
  },
  {
    title: "Smart Document Parser",
    description: "AI-powered document parser yang mengekstrak informasi penting dari berbagai format dokumen secara otomatis.",
    tags: ["Python", "NLP", "Machine Learning"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Voice Command Automation",
    description: "Sistem otomasi berbasis perintah suara untuk mengontrol aplikasi dan workflow menggunakan speech recognition.",
    tags: ["Python", "Speech API", "Automation"],
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&auto=format&fit=crop",
    githubUrl: "https://github.com",
  },
  {
    title: "Data Pipeline Builder",
    description: "Tool untuk membangun dan mengelola data pipeline dengan monitoring real-time dan error handling otomatis.",
    tags: ["Python", "Apache Airflow", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "AI Content Generator",
    description: "Platform untuk generate konten marketing menggunakan AI dengan personalisasi dan optimization otomatis.",
    tags: ["Next.js", "OpenAI", "TailwindCSS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    githubUrl: "https://github.com",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Proyek <span className="gradient-text">Unggulan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Kumpulan proyek AI dan automation yang telah saya kembangkan untuk memecahkan masalah nyata
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
