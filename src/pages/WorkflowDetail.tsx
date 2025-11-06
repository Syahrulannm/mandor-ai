import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorkflowDocumentation from "@/components/WorkflowDocumentation";
import { supabase } from "@/integrations/supabase/supabase";
import { useN8NDemo } from "@/hooks/useN8NDemo";

export interface WorkflowData {
  title: string;
  subtitle: string;
  documentation: {
    description: string;
    usage: string[];
    tags: string[];
    metadata: {
      category: string;
      created: string;
      updated: string;
    };
  };
}

const WorkflowDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<WorkflowData | null>(null);
  const [wfJson, setWfJson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const ready = useN8NDemo();
  const n8nRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!id) return;

    const loadWorkflow = async () => {
      const { data, error } = await supabase.from("workflows").select("id, title, subtitle, json_data, documentation, created_at").eq("id", id).maybeSingle();

      if (!data || error) {
        setLoading(false);
        return;
      }

      setWfJson(data.json_data);

      const doc = data.documentation ?? {};
      setData({
        title: data.title,
        subtitle: data.subtitle,
        documentation: {
          description: doc.description ?? "Belum ada deskripsi.",
          usage: Array.isArray(doc.usage) ? doc.usage : [],
          tags: Array.isArray(doc.tags) ? doc.tags : [],
          metadata: {
            category: doc?.metadata?.category ?? "General",
            created: doc?.metadata?.created ?? new Date(data.created_at).toLocaleDateString(),
            updated: doc?.metadata?.updated ?? new Date(data.created_at).toLocaleDateString(),
          },
        },
      });

      setLoading(false);
    };

    loadWorkflow();
  }, [id]);

  useEffect(() => {
    if (!ready || !n8nRef.current || !wfJson) return;
    // @ts-ignore custom element
    n8nRef.current.setAttribute("workflow", JSON.stringify(wfJson));
  }, [ready, wfJson]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Memuat workflow...</div>;
  }

  if (!data) {
    return <Navigate to="/workflows" replace />;
  }

  return (
    <div className="min-h-screen bg-background py-6 md:py-10 px-3 md:px-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <Link to="/workflows" className="inline-block mb-6 md:mb-8">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
        </Link>

        <div className="mb-6 md:mb-8 text-center px-2">
          <h1 className="font-bold mb-3 md:mb-4 gradient-text" style={{ fontSize: "clamp(1.5rem, 5vw, 2.75rem)" }}>
            {data.title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">{data.subtitle}</p>
        </div>

        <div className="border border-border rounded-xl overflow-hidden shadow-2xl bg-card/50 backdrop-blur-sm min-h-[70vh] sm:h-[700px]">
          {ready ? (
            // @ts-ignore
            <n8n-demo ref={n8nRef as any} frame clicktointeract collapseformobile="false" theme="dark" style={{ display: "block", width: "100%", height: "100%", minHeight: "70vh" }} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">Menyiapkan canvas...</div>
          )}
        </div>

        <div className="mt-6 md:mt-8">
          <WorkflowDocumentation data={data.documentation} />
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetail;
