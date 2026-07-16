import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Home, FileText, Send, Briefcase, BookmarkCheck, CreditCard, Newspaper, LogOut } from "lucide-react";
import { AIChatbot } from "@/components/AIChatbot";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }
  },
  errorComponent: () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate({ to: "/" });
    }, [navigate]);
    return null;
  },
});

function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate({ to: "/" });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate({ to: "/" });
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "My CVs", href: "/dashboard/cvs" },
    { icon: Send, label: "Applications", href: "/dashboard/applications" },
    { icon: Briefcase, label: "Jobs", href: "/dashboard/jobs" },
    { icon: BookmarkCheck, label: "Saved Jobs", href: "/dashboard/saved" },
    { icon: Newspaper, label: "Newsroom", href: "/dashboard/newsroom" },
    { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
  ];

  return (
    <div className="min-h-screen bg-aurora">
      {/* Header */}
      <header className="glass-strong sticky top-0 z-50 border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://cdn.shopify.com/s/files/1/0779/5369/5849/files/IMG-0872.png" alt="push i-span" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="rounded-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 md:block">
          <nav className="glass sticky top-20 rounded-2xl p-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary [&.active]:bg-secondary [&.active]:gradient-text"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="glass rounded-3xl p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
}
