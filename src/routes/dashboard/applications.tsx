import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/applications")({
  component: ApplicationsPage,
});

function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">My Applications</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track all your job applications in one place
        </p>
      </div>

      <div className="glass rounded-2xl p-12 text-center">
        <p className="text-muted-foreground">
          You haven't submitted any applications yet. Browse available jobs and let AI help you apply.
        </p>
      </div>
    </div>
  );
}
