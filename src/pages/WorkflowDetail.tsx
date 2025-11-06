import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorkflowDocumentation, { WorkflowDocumentationData } from "@/components/WorkflowDocumentation";

// Interface untuk data workflow
export interface WorkflowData {
  title: string;
  subtitle: string;
  workflowUrl: string;
  documentation: WorkflowDocumentationData;
}

// Database workflow - tambahkan workflow baru di sini
const workflowDatabase: Record<string, WorkflowData> = {
  "chatbot-ai": {
    title: "AI Chatbot Workflow",
    subtitle: "Workflow otomatis untuk chatbot AI dengan webhook integration",
    workflowUrl: "https://n8n.example.com/workflow/123",
    documentation: {
      description: "Workflow ini mengintegrasikan AI chatbot dengan webhook untuk menerima dan membalas pesan secara otomatis menggunakan model AI seperti Gemini atau OpenAI.",
      usage: [
        "Unduh file workflow JSON dari repository",
        "Buka dashboard n8n Anda",
        "Import file workflow tersebut",
        "Konfigurasi kredensial AI (Gemini atau OpenAI API key)",
        "Ubah endpoint webhook sesuai URL proyek Anda",
        "Test webhook dengan mengirim POST request",
        "Aktifkan workflow dan integrasikan dengan aplikasi"
      ],
      tags: ["AI", "Chatbot", "Automation", "Gemini", "OpenAI", "n8n", "Webhook"],
      metadata: {
        category: "Chatbot / AI Automation",
        created: "5 November 2025",
        updated: "5 November 2025"
      }
    }
  },
  // Tambahkan workflow lain di sini dengan format yang sama
};

const WorkflowDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id || !workflowDatabase[id]) {
    return <Navigate to="/workflows" replace />;
  }

  const data = workflowDatabase[id];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Back Button */}
        <Link to="/workflows" className="inline-block mb-8">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
        </Link>

        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {data.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {data.subtitle}
          </p>
        </div>

        {/* Iframe Container */}
        <div className="relative w-full">
          <div className="border border-border rounded-xl overflow-hidden shadow-2xl glow-effect bg-card/50 backdrop-blur-sm">
            <iframe
              src={data.workflowUrl}
              className="w-full h-[600px] md:h-[700px] lg:h-[800px]"
              title="N8N Workflow Preview"
              allow="fullscreen"
              loading="lazy"
            />
          </div>
        </div>

        {/* Optional Info Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Gunakan scroll untuk menjelajahi workflow secara detail
          </p>
        </div>

        {/* Documentation Blocks */}
        <WorkflowDocumentation data={data.documentation} />
      </div>
    </div>
  );
};

export default WorkflowDetail;
