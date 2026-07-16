import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/jobs")({
  component: JobsPage,
});

function JobsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Available Jobs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse and apply to jobs matching your profile
        </p>
      </div>

      <div className="glass rounded-2xl p-12 text-center">
        <p className="text-muted-foreground">
          Jobs will appear here once you complete your profile and set your preferences.
        </p>
      </div>
    </div>
  );
}
