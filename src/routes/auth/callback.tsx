import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Auth callback error:", error);
        toast.error("Authentication failed");
        navigate({ to: "/" });
        return;
      }

      if (session) {
        toast.success("Successfully signed in!");
        navigate({ to: "/dashboard" });
      } else {
        navigate({ to: "/" });
      }
    });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-lg">Completing sign in...</div>
    </div>
  );
}
