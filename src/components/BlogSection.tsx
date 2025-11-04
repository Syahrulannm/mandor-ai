import { useState } from "react";
import { Search } from "lucide-react";
import BlogCard from "./BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    title: "Membangun Automation Workflow dengan n8n dan AI",
    excerpt: "Panduan lengkap untuk membuat workflow automation yang powerful menggunakan n8n dan integrasi AI untuk meningkatkan produktivitas.",
    category: "Automation",
    date: "15 Mar 2024",
    readTime: "8 menit",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
  },
  {
    title: "GPT-4 untuk Business Process Automation",
    excerpt: "Cara memanfaatkan GPT-4 untuk mengotomasi proses bisnis, dari customer support hingga content generation.",
    category: "AI",
    date: "12 Mar 2024",
    readTime: "10 menit",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
  },
  {
    title: "Machine Learning Pipeline: Best Practices",
    excerpt: "Tips dan trik untuk membangun ML pipeline yang robust, scalable, dan mudah dimaintain untuk production.",
    category: "Machine Learning",
    date: "8 Mar 2024",
    readTime: "12 menit",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",
  },
  {
    title: "Integrasi AI dalam Daily Workflow",
    excerpt: "Strategi praktis untuk mengintegrasikan AI tools dalam workflow harian untuk meningkatkan efisiensi kerja.",
    category: "Productivity",
    date: "5 Mar 2024",
    readTime: "6 menit",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop",
  },
  {
    title: "Automation Testing dengan Playwright dan AI",
    excerpt: "Menggunakan Playwright dan AI untuk membuat automation testing yang lebih intelligent dan reliable.",
    category: "Testing",
    date: "1 Mar 2024",
    readTime: "9 menit",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
  },
  {
    title: "Future of Work: AI & Automation Trends 2024",
    excerpt: "Analisis tren terkini dalam AI dan automation yang akan membentuk masa depan pekerjaan di tahun 2024 dan seterusnya.",
    category: "Trends",
    date: "28 Feb 2024",
    readTime: "7 menit",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
  },
];

const categories = ["Semua", "Automation", "AI", "Machine Learning", "Productivity", "Testing", "Trends"];

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "Semua" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Blog & <span className="gradient-text">Artikel</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorial, dan pemikiran tentang AI, automation, dan teknologi terkini
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "gradient-primary hover:opacity-90"
                    : "border-border hover:border-primary/50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tidak ada artikel yang ditemukan.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
