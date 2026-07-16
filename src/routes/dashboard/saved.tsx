import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/saved")({
  component: SavedJobsPage,
});

function SavedJobsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Saved Jobs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Jobs you've bookmarked for later
        </p>
      </div>

      <div className="glass rounded-2xl p-12 text-center">
        <p className="text-muted-foreground">
          You haven't saved any jobs yet. Browse jobs and click the bookmark icon to save them here.
        </p>
      </div>
    </div>
  );
}
