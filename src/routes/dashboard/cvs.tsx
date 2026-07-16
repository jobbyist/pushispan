import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/cvs")({
  component: CVsPage,
});

function CVsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">My CVs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create and manage your professional CVs
          </p>
        </div>
        <Button className="rounded-full gradient-brand text-white">
          <Plus className="mr-2 h-4 w-4" />
          Create CV
        </Button>
      </div>

      <div className="glass rounded-2xl p-12 text-center">
        <p className="text-muted-foreground">
          You haven't created any CVs yet. Get started by creating your first CV using our AI-powered CV builder.
        </p>
      </div>
    </div>
  );
}
