import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Workflow, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/supabase";

interface WorkflowItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
}

const Workflows = () => {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from("workflows").select("id, title, subtitle, documentation");

      if (!data || error) {
        console.error("Gagal mengambil workflows:", error);
        setLoading(false);
        return;
      }

      const mapped = data.map((w) => {
        const doc = w.documentation ?? {};
        return {
          id: w.id,
          title: w.title,
          description: doc.description ?? w.subtitle ?? "",
          tags: Array.isArray(doc.tags) ? doc.tags : [],
          category: doc?.metadata?.category ?? "General",
        };
      });

      setWorkflows(mapped);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-[1200px] mx-auto">
        <Link to="/" className="inline-block mb-8">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Workflow className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Workflow Gallery</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">Koleksi workflow n8n untuk automasi AI dan integrasi sistem</p>
        </div>
      </div>

      {/* Workflow Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center text-muted-foreground py-16">Memuat daftar workflow...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="group hover:shadow-lg transition-all duration-300 border-border bg-card hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Workflow className="w-6 h-6 text-primary" />
                    <Badge variant="secondary" className="text-xs">
                      {workflow.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{workflow.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{workflow.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {workflow.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  <Link to={`/workflows/${workflow.id}`} className="w-full">
                    <Button variant="ghost" className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-colors gap-2">
                      Lihat Detail
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!loading && workflows.length === 0 && (
          <div className="text-center py-16">
            <Workflow className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Belum Ada Workflow</h3>
            <p className="text-muted-foreground">Workflow akan ditampilkan di sini</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workflows;
