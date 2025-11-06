import { Badge } from "@/components/ui/badge";

export interface WorkflowDocumentationData {
  description?: string;
  usage: string[];
  tags: string[];
  metadata: {
    category: string;
    created: string;
    updated: string;
  };
}

interface WorkflowDocumentationProps {
  data: WorkflowDocumentationData;
}

const WorkflowDocumentation = ({ data }: WorkflowDocumentationProps) => {
  return (
    <div className="mt-12 space-y-8">
      {/* Deskripsi */}
      {data.description && (
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-4">Deskripsi</h2>
          <p className="text-muted-foreground text-sm">
            {data.description}
          </p>
        </div>
      )}

      {/* Cara Penggunaan */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-4">Cara Menggunakan Workflow</h2>
        <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside font-mono">
          {data.usage.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      {/* Tag */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-4">Tag</h2>
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>

      {/* Informasi Workflow */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-semibold mb-4">Informasi Workflow</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="py-3 pr-4 text-muted-foreground font-medium">Kategori</td>
                <td className="py-3">{data.metadata.category}</td>
              </tr>
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="py-3 pr-4 text-muted-foreground font-medium">Dibuat</td>
                <td className="py-3">{data.metadata.created}</td>
              </tr>
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="py-3 pr-4 text-muted-foreground font-medium">Diperbarui</td>
                <td className="py-3">{data.metadata.updated}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDocumentation;
