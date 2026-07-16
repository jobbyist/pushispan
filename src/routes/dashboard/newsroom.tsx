import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/newsroom")({
  component: NewsroomPage,
});

interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  published_date: string;
  summary: string;
  image_url?: string;
  category?: string;
}

function NewsroomPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      const { data, error } = await supabase
        .from("newsroom_articles")
        .select("*")
        .order("published_date", { ascending: false })
        .limit(10);

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    };

    loadArticles();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Newsroom</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Latest career news and job market insights
        </p>
      </div>

      {loading ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">
            No articles available yet. Check back soon for the latest career news and insights.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <Card key={article.id} className="glass border-white/10">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  {article.category && (
                    <Badge variant="secondary" className="shrink-0">
                      {article.category}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {article.source} • {new Date(article.published_date).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{article.summary}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[color:var(--brand-blue)] hover:underline"
                >
                  Read more →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
