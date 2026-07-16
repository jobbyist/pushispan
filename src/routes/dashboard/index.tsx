import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Send, Briefcase, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const [stats, setStats] = useState({
    cvs: 0,
    applications: 0,
    savedJobs: 0,
    interviewRate: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load CVs count
      const { count: cvsCount } = await supabase
        .from("cvs")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      // Load applications count
      const { count: appsCount } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      // Load saved jobs count
      const { count: savedCount } = await supabase
        .from("saved_jobs")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      setStats({
        cvs: cvsCount || 0,
        applications: appsCount || 0,
        savedJobs: savedCount || 0,
        interviewRate: 0,
      });
    };

    loadStats();
  }, []);

  const statCards = [
    { icon: FileText, label: "CVs Created", value: stats.cvs, color: "text-blue-500" },
    { icon: Send, label: "Applications Sent", value: stats.applications, color: "text-emerald-500" },
    { icon: Briefcase, label: "Jobs Saved", value: stats.savedJobs, color: "text-orange-500" },
    { icon: TrendingUp, label: "Interview Rate", value: `${stats.interviewRate}%`, color: "text-pink-500" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">Welcome back!</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold mb-4">Quick Actions</h2>
        <p className="text-muted-foreground">Get started by creating your first CV or browsing available jobs.</p>
      </div>
    </div>
  );
}
