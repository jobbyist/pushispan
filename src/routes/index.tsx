import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles,
  FileText,
  Send,
  MessageSquare,
  GraduationCap,
  Linkedin,
  Trophy,
  Video,
  Phone,
  Mail,
  Play,
  Check,
  ArrowRight,
  Star,
  Rocket,
  Shield,
  Zap,
  Headphones,
  Facebook,
  BookOpen,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      {
        name: "keywords",
        content:
          "South Africa jobs, AI job application, CV builder, cover letter generator, job hunting, career coach, learnerships, internships",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "push i-span",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "99", priceCurrency: "ZAR" },
          description:
            "South Africa's AI job hunting assistant. Build CVs, generate cover letters and auto-apply to jobs.",
        }),
      },
    ],
  }),
});

function Home() {
  return (
    <div className="min-h-screen bg-aurora text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <Pricing />
      <Testimonials />
      <Faq />
      <Podcast />
      <Community />
      <Footer />
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#podcast", label: "Podcast" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-3 py-2 transition-all",
            scrolled ? "glass-strong" : "glass",
          )}
        >
          <a href="#" className="flex items-center gap-2 pl-2">
            <img src={logoAsset.url} alt="push i-span" className="h-9 w-auto" />
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden rounded-full sm:inline-flex">
              Sign in
            <img src="https://cdn.shopify.com/s/files/1/0779/5369/5849/files/IMG-0872.png" alt="push i-span" className="h-9 w-auto" />
            <Button className="rounded-full gradient-brand text-white shadow-lg hover:opacity-95">
              Start Free
            </Button>
            <button
              className="ml-1 rounded-full p-2 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        {open && (
          <div className="glass mt-2 flex flex-col gap-1 rounded-2xl p-2 md:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <Badge
          variant="outline"
          className="glass mb-6 rounded-full border-white/10 px-4 py-1.5 text-xs"
        >
          <Sparkles className="mr-1.5 h-3.5 w-3.5 text-[color:var(--brand-pink)]" />
          Human-Reviewed, AI-Assisted Job Applications
        </Badge>
        <h1 className="font-display mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Push i-span.
          <br />
          Let AI apply while you{" "}
          <span className="gradient-text">focus on getting hired.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          AI handles the heavy lifting—drafting, tailoring, formatting—while you 
          retain full control. Beat modern recruiter ATS filters with intelligent 
          automation that never compromises your professional reputation.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="rounded-full gradient-brand px-6 text-base text-white shadow-xl hover:opacity-95"
          >
            Start Free Trial
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
          <VideoModal />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          3 days free · No credit card required
        </p>

        <FloatingCards />
      </div>
    </section>
  );
}

function VideoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="glass rounded-full border-white/10 px-6 text-base hover:bg-secondary"
        >
          <Play className="mr-1.5 h-4 w-4" />
          Watch Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl border-white/10 bg-card p-0 sm:rounded-2xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>See push i-span in action</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full overflow-hidden bg-black sm:rounded-b-2xl">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="push i-span demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FloatingCards() {
  const items = [
    { icon: FileText, label: "CV Builder", tint: "from-[color:var(--brand-blue)] to-[color:var(--brand-cyan)]", delay: "0s" },
    { icon: Send, label: "Auto Apply", tint: "from-[color:var(--brand-orange)] to-[color:var(--brand-pink)]", delay: ".6s" },
    { icon: MessageSquare, label: "AI Cover Letter", tint: "from-[color:var(--brand-pink)] to-[color:var(--brand-blue)]", delay: "1.2s" },
    { icon: Video, label: "Interview Prep", tint: "from-[color:var(--brand-emerald)] to-[color:var(--brand-blue)]", delay: "1.8s" },
    { icon: GraduationCap, label: "Career Coach", tint: "from-[color:var(--brand-blue)] to-[color:var(--brand-pink)]", delay: "2.4s" },
  ];
  return (
    <div className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:grid-cols-3 md:grid-cols-5">
      {items.map((it) => (
        <div
          key={it.label}
          className="glass ring-glow group flex flex-col items-start gap-3 rounded-2xl p-4 text-left transition-transform hover:-translate-y-1"
          style={{ animation: `float-slow 8s ease-in-out ${it.delay} infinite` }}
        >
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white",
              it.tint,
            )}
          >
            <it.icon className="h-5 w-5" />
          </div>
          <div className="text-sm font-medium">{it.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Stats ---------- */
function Stats() {
  const stats = [
    { value: "280,000+", label: "Jobs monitored" },
    { value: "15,000+", label: "Applications generated" },
    { value: "94%", label: "Faster interview invitations" },
    { value: "95%", label: "Customer satisfaction" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24">
      <div className="glass-strong rounded-3xl p-6 sm:p-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="font-display text-4xl font-bold gradient-text md:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Upload your CV",
      body: "Or create one from scratch using our AI CV builder in minutes.",
      icon: FileText,
    },
    {
      n: "02",
      title: "Complete your profile",
      body: "Skills, experience, salary expectations, preferred provinces and industries.",
      icon: Sparkles,
    },
    {
      n: "03",
      title: "AI starts applying",
      body: "Tailored CVs, custom cover letters, application answers and live tracking.",
      icon: Rocket,
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeader
        eyebrow="How it works"
        title={<>Three steps to <span className="gradient-text">smart, human-verified applications</span></>}
        subtitle="From blank page to inbox full of interview invites."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="glass rounded-3xl p-6 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="font-display text-3xl font-bold text-muted-foreground/50">
                {s.n}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand text-white">
                <s.icon className="h-5 w-5" />
              </div>
            </div>
            <h3 className="font-display mt-6 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function Features() {
  const features = [
    { icon: Send, title: "AI Job Applications", body: "AI drafts personalized applications—you review and approve before submission." },
    { icon: FileText, title: "ATS-Friendly Resume Builder", body: "Professional CVs optimized for recruiter tracking systems." },
    { icon: MessageSquare, title: "AI Cover Letters", body: "AI writes unique cover letters—you verify accuracy before sending." },
    { icon: Linkedin, title: "LinkedIn Optimiser", body: "AI-powered profile optimization with human oversight." },
    { icon: GraduationCap, title: "Career Learning", body: "Pathways to accredited South African courses." },
    { icon: Trophy, title: "Sprint 90", body: "Jobbyist 90-Day Job Search Sprint toolkit worth R349." },
    { icon: Video, title: "Monthly Webinars", body: "Live coaching from experienced career strategists." },
    { icon: Sparkles, title: "Human Career Strategy Session", body: "1:1 expert guidance to plan your search strategy." },
    { icon: Phone, title: "WhatsApp Notifications", body: "Real-time application status alerts sent to your phone." },
    { icon: Mail, title: "Email Support", body: "Priority email replies from our team." },
    { icon: Headphones, title: "AI Interview Prep Suite", body: "AI-powered mock interviews with human-verified feedback." },
    { icon: Shield, title: "Application Tracker", body: "See every application, status and next step in one view." },
  ];
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeader
        eyebrow="Features"
        title={<>Everything you need to <span className="gradient-text">get hired faster, safely</span></>}
        subtitle="An AI-native workspace for the modern South African job seeker."
      />
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="glass group rounded-2xl p-5 transition-all hover:-translate-y-1 hover:ring-glow"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary group-hover:gradient-brand group-hover:text-white transition-all">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display mt-4 text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  const tiers = [
    {
      name: "Free Trial",
      price: "Free",
      period: "3 days",
      cta: "Start trial",
      features: [
        "10 AI applications per day",
        "Gemini Free AI",
        "Resume Builder",
        "Cover Letters",
        "Application Tracker",
      ],
    },
    {
      name: "Starter",
      price: "R99",
      period: "/month",
      cta: "Choose Starter",
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
      highlight: true,
      cta: "Go Professional",
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
      cta: "Go Elite",
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
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeader
        eyebrow="Pricing"
        title={<>Plans that <span className="gradient-text">pay for themselves</span></>}
        subtitle="Cancel anytime. Every plan includes core AI application tools."
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-4">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={cn(
              "relative rounded-3xl p-6 transition-transform hover:-translate-y-1",
              t.highlight
                ? "glass-strong ring-glow border-2 border-transparent [background:linear-gradient(var(--card),var(--card))_padding-box,linear-gradient(135deg,var(--brand-orange),var(--brand-pink),var(--brand-blue))_border-box]"
                : "glass",
            )}
          >
            {t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="rounded-full gradient-brand text-white">Most popular</Badge>
              </div>
            )}
            <div className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t.name}
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold">{t.price}</span>
              <span className="text-sm text-muted-foreground">{t.period}</span>
            </div>
            <Button
              className={cn(
                "mt-5 w-full rounded-full",
                t.highlight
                  ? "gradient-brand text-white"
                  : "bg-secondary text-foreground hover:bg-secondary/80",
              )}
            >
              {t.cta}
            </Button>
            <ul className="mt-6 space-y-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand-emerald)]" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const reviews = [
    {
      name: "Thandiwe M.",
      role: "Marketing Graduate, Johannesburg",
      body: "I applied to 40 jobs in my first week and landed three interviews. Push i-span basically job hunts while I sleep.",
      avatar: "https://i.pravatar.cc/100?img=47",
    },
    {
      name: "Sipho N.",
      role: "Software Developer, Cape Town",
      body: "The AI cover letters are shockingly good. Recruiters keep asking who wrote them.",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      name: "Lerato K.",
      role: "Finance Analyst, Pretoria",
      body: "The interview prep tool caught weaknesses I didn't know I had. Got the offer the same week.",
      avatar: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "Ahmed P.",
      role: "Data Analyst, Durban",
      body: "Worth every rand. My CV finally looks like the ones that get shortlisted.",
      avatar: "https://i.pravatar.cc/100?img=8",
    },
    {
      name: "Nomvula B.",
      role: "HR Officer, Bloemfontein",
      body: "The dashboard is so clean. I can finally see every application in one place.",
      avatar: "https://i.pravatar.cc/100?img=45",
    },
    {
      name: "Kagiso T.",
      role: "Mechanical Engineer, PE",
      body: "Sprint 90 gave me a real structure. The webinars are pure gold.",
      avatar: "https://i.pravatar.cc/100?img=15",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeader
        eyebrow="Testimonials"
        title={<>South Africans getting <span className="gradient-text">hired faster</span></>}
        subtitle="Real users. Real interview invites."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.name} className="glass rounded-2xl p-5">
            <div className="flex gap-0.5 text-[color:var(--brand-orange)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed">"{r.body}"</p>
            <div className="mt-4 flex items-center gap-3">
              <img
                src={r.avatar}
                alt={r.name}
                className="h-10 w-10 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const items = [
    {
      q: "Why is there a daily application limit?",
      a: "To protect your career reputation. Flooding job boards with hundreds of unchecked generic applications gets your profile flagged by recruiter ATS filters. By capping tiers to high-quality, targeted daily batches, we ensure every application remains highly optimized and conversion rates stay high.",
    },
    {
      q: "What does 'Human-Reviewed, AI-Assisted' mean?",
      a: "It means you get the speed of AI combined with the safety of human oversight. The system handles 95% of the heavy lifting—reading descriptions, structuring data, and writing cover letters—but gives you clear verification touchpoints before submission to ensure complete accuracy.",
    },
    {
      q: "How does the WhatsApp notification system work?",
      a: "Subscribers on our Professional and Elite tiers get direct, real-time alerts sent straight to their WhatsApp numbers whenever an application status changes or an interview follow-up date approaches, saving you from constantly checking your email inbox.",
    },
    {
      q: "How does the free trial work?",
      a: "You get 3 days free with 10 AI applications per day. No credit card required. Upgrade any time to unlock higher daily application limits.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Subscriptions are month-to-month and can be cancelled from your dashboard at any time.",
    },
    {
      q: "Is my information secure?",
      a: "Your data lives in encrypted, POPIA-aligned infrastructure. We never sell your data and you control what's shared with employers.",
    },
  ];
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-24">
      <SectionHeader
        eyebrow="FAQ"
        title={<>Frequently asked <span className="gradient-text">questions</span></>}
      />
      <Accordion type="single" collapsible className="mt-10 space-y-2">
        {items.map((it, i) => (
          <AccordionItem
            key={i}
            value={`i-${i}`}
            className="glass rounded-2xl border-white/5 px-5"
          >
            <AccordionTrigger className="text-left text-base font-medium">
              {it.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {it.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

/* ---------- Podcast ---------- */
function Podcast() {
  const eps = [
    {
      n: "Ep 01",
      title: "Breaking Into Tech Without a Degree",
      duration: "42 min",
      tint: "from-[color:var(--brand-blue)] to-[color:var(--brand-cyan)]",
    },
    {
      n: "Ep 02",
      title: "How Recruiters Actually Read Your CV",
      duration: "36 min",
      tint: "from-[color:var(--brand-pink)] to-[color:var(--brand-orange)]",
    },
    {
      n: "Ep 03",
      title: "The Salary Conversation South Africans Avoid",
      duration: "48 min",
      tint: "from-[color:var(--brand-emerald)] to-[color:var(--brand-blue)]",
    },
  ];
  return (
    <section id="podcast" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeader
        eyebrow="Podcast"
        title={<>The Hustle <span className="gradient-text">Diaries SA</span></>}
        subtitle="Stories from South Africans navigating careers, entrepreneurship and opportunity."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {eps.map((e) => (
          <div key={e.n} className="glass group overflow-hidden rounded-3xl transition-transform hover:-translate-y-1">
            <div className={cn("relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br", e.tint)}>
              <button className="glass-strong flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform group-hover:scale-110">
                <Play className="h-5 w-5 fill-current" />
              </button>
              <div className="absolute bottom-3 left-3 rounded-full bg-black/40 px-2.5 py-1 text-xs text-white backdrop-blur">
                {e.duration}
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {e.n}
              </div>
              <h3 className="font-display mt-1 text-lg font-semibold">{e.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Community ---------- */
function Community() {
  const socials = [
    { name: "WhatsApp Channel", href: "https://whatsapp.com/channel/0029Vb8e2mV11ulHZj474B1X", icon: Phone, tint: "from-emerald-400 to-emerald-600" },
    { name: "Facebook", href: "https://facebook.com/pushispan.co.za", icon: Facebook, tint: "from-blue-500 to-blue-700" },
    { name: "Substack", href: "https://pushispan.substack.com", icon: BookOpen, tint: "from-orange-400 to-pink-500" },
    { name: "LinkedIn", href: "https://linkedin.com/company/pushispan", icon: Linkedin, tint: "from-sky-500 to-blue-700" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="glass-strong rounded-3xl p-8 text-center md:p-14">
        <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Community
        </div>
        <h2 className="font-display mx-auto mt-3 max-w-2xl text-3xl font-bold md:text-5xl">
          Join thousands of South Africans <span className="gradient-text">pushing forward</span>.
        </h2>
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="glass group flex flex-col items-center gap-3 rounded-2xl p-5 transition-transform hover:-translate-y-1"
            >
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white", s.tint)}>
                <s.icon className="h-6 w-6" />
              </div>
              <div className="text-sm font-medium">{s.name}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logoAsset.url} alt="push i-span" className="h-10 w-auto" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            More applications. Better opportunities. Less effort. South Africa's
            Human-Reviewed, AI-Assisted job hunting platform.
          </p>
        </div>
        <FooterCol
          title="Product"
          links={[
            ["Pricing", "#pricing"],
            ["Features", "#features"],
            ["Podcast", "#podcast"],
            ["Blog", "#"],
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            ["Contact", "#"],
            ["Support", "#"],
            ["Privacy", "#"],
            ["Terms", "#"],
          ]}
        />
      </div>
      <div className="border-t border-border">
          <img src="https://cdn.shopify.com/s/files/1/0779/5369/5849/files/IMG-0872.png" alt="push i-span" className="h-10 w-auto" />
          <div>© {new Date().getFullYear()} push i-span. All rights reserved.</div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-[color:var(--brand-pink)]" />
            Made in South Africa
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-3 space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-sm text-muted-foreground hover:text-foreground">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Shared ---------- */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {eyebrow}
      </div>
      <h2 className="font-display mt-3 text-3xl font-bold leading-tight md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-muted-foreground md:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
