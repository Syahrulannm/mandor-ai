import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const WorkflowPreview = () => {
  // Example n8n workflow URL - can be updated to actual workflow URL
  const workflowUrl = "https://n8n.example.com/workflow/123";

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
            AI Agent Workflow Preview
          </h1>
          <p className="text-muted-foreground text-lg">
            Visualisasi interaktif workflow n8n
          </p>
        </div>

        {/* Iframe Container */}
        <div className="relative w-full">
          <div className="border border-border rounded-xl overflow-hidden shadow-2xl glow-effect bg-card/50 backdrop-blur-sm">
            <iframe
              src={workflowUrl}
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
      </div>
    </div>
  );
};

export default WorkflowPreview;
