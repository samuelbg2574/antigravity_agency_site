"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
interface Step {
  number: string;
  title: string;
  description: string;
  visual: { url: string; label: string };
}

const steps: Step[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into your business objectives, target audience, and market positioning. This ensures everything we design is rooted in intent — not just aesthetics.",

    visual: {
      url: "https://george-photo-site.vercel.app/",
      label: "George Photo — discovery phase",
    },
  },
  {
    number: "02",
    title: "Design",
    description:
      "We craft premium, high-converting interfaces. Rejecting generic templates, we focus on bespoke typography, sophisticated colour palettes, and intuitive user flows.",

    visual: {
      url: "https://agency-site-brown-two.vercel.app/",
      label: "Agency Brown — design phase",
    },
  },
  {
    number: "03",
    title: "Build",
    description:
      "Our engineers construct the design using modern frameworks — Next.js, optimised for 90+ Lighthouse scores across speed, accessibility, and SEO.",

    visual: {
      url: "https://touchpointjudo-mockup.vercel.app/",
      label: "Touchpoint Judo — build phase",
    },
  },
  {
    number: "04",
    title: "Deliver & Polish",
    description:
      "We launch the site, monitor early performance, and attend to final touch-ups — ensuring a flawless experience across every device and screen.",

    visual: {
      url: "https://agency-site-brown-two.vercel.app/",
      label: "Agency Brown — delivery phase",
    },
  },
];

// Dot size in px — single source of truth so rail offset always matches
const DOT_SIZE = 10;
// How far from the top/bottom of the steps column the first/last dot sits
const RAIL_INSET = DOT_SIZE / 2;

export default function MethodologySection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // ── Scroll progress through the whole section ────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // start: section top reaches 80% down the viewport (just entering view)
    // end:   section bottom reaches 20% down the viewport (almost scrolled past)
    offset: ["start 0.8", "end 0.2"],
  });

  // Continuous rail fill — scaleY from top so it grows downward
  const railScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Discrete active-step index derived from scroll progress
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const clamped = Math.max(0, Math.min(v, 0.9999));
      setActiveStep(Math.floor(clamped * steps.length));
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-4 md:px-8"
      aria-label="Our Methodology"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Header ────────────────────────────────────────────── */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="block text-xs font-bold tracking-widest uppercase text-zinc-400 mb-5"
        >
          Our Methodology
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-heading font-semibold tracking-tighter leading-[1.05] mb-20"
        >
          How we work.
        </motion.h2>

        {/* ── Two-column layout ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

          {/* ── LEFT: steps — matches image aspect ratio on desktop ─ */}
          {/*
            aspect-[3/4] gives this column the exact same height as
            the image panel on the right. justify-between distributes
            the 4 steps evenly so the rail runs full column height.
          */}
          <div className="relative flex flex-col justify-between md:aspect-[3/4]">

            {/* ── Rail: background track ───────────────────────── */}
            <div
              className="absolute w-px bg-zinc-200"
              style={{
                left: DOT_SIZE / 2 - 0.5,
                top: RAIL_INSET,
                bottom: RAIL_INSET,
              }}
              aria-hidden="true"
            />

            {/* ── Rail: scroll-driven fill ─────────────────────── */}
            <motion.div
              className="absolute w-px bg-zinc-900 origin-top"
              style={{
                left: DOT_SIZE / 2 - 0.5,
                top: RAIL_INSET,
                bottom: RAIL_INSET,
                scaleY: railScaleY,
              }}
              aria-hidden="true"
            />

            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPast = idx < activeStep;

              return (
                <div
                  key={step.number}
                  className="relative flex gap-7 pb-12 last:pb-0 md:pb-0"
                  aria-current={isActive ? "step" : undefined}
                >
                  {/* ── Rail dot ─────────────────────────────────── */}
                  <div
                    className="relative flex-shrink-0 mt-[3px]"
                    style={{ width: DOT_SIZE, height: DOT_SIZE }}
                    aria-hidden="true"
                  >
                    {/* Active ring */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          key="ring"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute rounded-full border border-zinc-400"
                          style={{ inset: -5 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Core dot */}
                    <motion.span
                      animate={{
                        backgroundColor:
                          isActive || isPast ? "#09090b" : "#d4d4d8",
                        scale: isActive ? 1.3 : 1,
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 rounded-full"
                    />
                  </div>

                  {/* ── Step content ─────────────────────────────── */}
                  <div className="flex flex-col gap-2.5 flex-1 min-w-0">

                    {/* Step number */}
                    <motion.span
                      animate={{
                        color: isActive
                          ? "#71717a"
                          : isPast
                          ? "#a1a1aa"
                          : "#d4d4d8",
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[11px] font-mono tracking-[0.18em] leading-none select-none"
                    >
                      {step.number}
                    </motion.span>

                    {/* Step title */}
                    <motion.h3
                      animate={{
                        color: isActive
                          ? "#09090b"
                          : isPast
                          ? "#71717a"
                          : "#a1a1aa",
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="text-3xl md:text-4xl font-heading font-semibold tracking-tight leading-tight"
                    >
                      {step.title}
                    </motion.h3>

                    {/* Description — always visible, emphasis via color only */}
                    <motion.p
                      animate={{
                        color: isActive ? "#52525b" : "#c4c4c8",
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="text-base md:text-lg font-medium leading-[1.7] max-w-[42ch]"
                    >
                      {step.description}
                    </motion.p>

                  </div>
                </div>
              );
            })}
          </div>

          {/* ── RIGHT: Shared visual (desktop only) ─────────────── */}
          <div className="hidden md:block">
            <div className="sticky top-28">

              {/* Visual container — aspect-[3/4] matches left column */}
              <div className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden bg-zinc-100 border border-zinc-200/70 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.10)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, filter: "blur(8px)", scale: 1.03 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(6px)", scale: 0.98 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <iframe
                      src={steps[activeStep].visual.url}
                      title={steps[activeStep].visual.label}
                      className="absolute top-0 left-0 border-0 pointer-events-none"
                      style={{
                        width: "200%",
                        height: "200%",
                        transform: "scale(0.5)",
                        transformOrigin: "top left",
                      }}
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                    {/* Click blocker */}
                    <div className="absolute inset-0 z-10" aria-hidden="true" />
                    {/* Vignette */}
                    <div
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.06) 100%)",
                      }}
                      aria-hidden="true"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Step label badge — bottom-left */}
                <div className="absolute bottom-5 left-5 z-30" aria-hidden="true">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
                      transition={{
                        duration: 0.4,
                        delay: 0.25,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/85 backdrop-blur-md border border-zinc-200/60 shadow-sm"
                    >
                      <span className="text-[10px] font-mono tracking-[0.18em] text-zinc-400 leading-none">
                        {steps[activeStep].number}
                      </span>
                      <span className="w-px h-2.5 bg-zinc-200" />
                      <span className="text-xs font-semibold text-zinc-900 leading-none">
                        {steps[activeStep].title}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress dots — bottom-right */}
                <div
                  className="absolute bottom-5 right-5 z-30 flex gap-1.5"
                  aria-hidden="true"
                >
                  {steps.map((_, idx) => (
                    <motion.span
                      key={idx}
                      animate={{
                        backgroundColor:
                          idx === activeStep ? "#09090b" : "#d4d4d8",
                        scale: idx === activeStep ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="block w-1.5 h-1.5 rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Caption */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="mt-4 text-xs text-zinc-400 font-medium tracking-wide text-center"
                  aria-hidden="true"
                >
                  {steps[activeStep].visual.label}
                </motion.p>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
