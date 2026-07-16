import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export const Route = createFileRoute("/dashboard/billing")({
  component: BillingPage,
});

function BillingPage() {
  const tiers = [
    {
      name: "Free Trial",
      price: "Free",
      period: "3 days",
      cta: "Current Plan",
      features: [
        "10 AI applications per day",
        "Gemini Free AI",
        "Resume Builder",
        "Cover Letters",
        "Application Tracker",
      ],
      current: true,
    },
    {
      name: "Starter",
      price: "R99",
      period: "/month",
      cta: "Upgrade",
      features: [
        "5 AI applications per day (Up to 150/mo)",
        "Core AI Workspace",
        "ATS-Friendly CV Builder",
        "Email Status Tracking",
        "Standard Email Support",
      ],
    },
    {
      name: "Professional",
      price: "R199",
      period: "/month",
      cta: "Upgrade",
      highlight: true,
      features: [
        "15 AI applications per day (Up to 450/mo)",
        "Priority AI Engine",
        "Direct WhatsApp Notifications",
        "AI Interview Prep Suite",
        "LinkedIn Profile Optimizer",
      ],
    },
    {
      name: "Elite",
      price: "R349",
      period: "/month",
      cta: "Upgrade",
      features: [
        "Everything in Professional",
        "High-Volume Automation Queue (Up to 1,000/mo)",
        "Premium Document Templates",
        "1:1 Human Career Strategy Session",
        "Dedicated Proxy Pipeline",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Billing & Subscription</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your subscription and payment methods
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {tiers.map((tier) => (
          <Card key={tier.name} className={tier.highlight ? "glass-strong border-2 border-[color:var(--brand-pink)]/30" : "glass border-white/10"}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{tier.name}</CardTitle>
                {tier.current && <Badge className="gradient-brand text-white">Current</Badge>}
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className={tier.highlight ? "w-full rounded-full gradient-brand text-white" : "w-full rounded-full"}
                variant={tier.current ? "outline" : tier.highlight ? "default" : "secondary"}
                disabled={tier.current}
              >
                {tier.cta}
              </Button>
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand-emerald)]" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
