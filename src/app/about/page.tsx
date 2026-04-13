"use client";

import { motion } from "framer-motion";
import BentoCard from "@/components/ui/BentoCard";
import { MagnifyingGlass, PaintBrush, Code, RocketLaunch } from "@phosphor-icons/react";

const processSteps = [
  {
    icon: <MagnifyingGlass size={32} weight="duotone" />,
    title: "1. Discovery",
    desc: "We dive deep into your business objectives, target audience, and market positioning. This ensures everything we design is rooted in intent, not just aesthetics."
  },
  {
    icon: <PaintBrush size={32} weight="duotone" />,
    title: "2. Design",
    desc: "We craft premium, high-converting interfaces. Rejecting generic templates, we focus on bespoke typography, sophisticated color palettes, and intuitive user flows."
  },
  {
    icon: <Code size={32} weight="duotone" />,
    title: "3. Build",
    desc: "Our engineers construct the design using modern frameworks (Next.js), focusing on achieving 90+ Lighthouse scores for speed, accessibility, and SEO."
  },
  {
    icon: <RocketLaunch size={32} weight="duotone" />,
    title: "4. Deliver & Polish",
    desc: "We launch the site, monitor early performance, and attend to any final touch-ups to ensure a flawless experience across all devices."
  }
];

export default function About() {
  return (
    <div className="w-full flex justify-center px-4 md:px-8 mt-12 md:mt-24 pb-24 overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col gap-24 md:gap-32">
        
        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-8 flex flex-col gap-6">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-semibold tracking-tighter"
            >
              We engineer <br/>
              <span className="text-zinc-400">digital value.</span>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4"
          >
            <p className="text-xl text-zinc-500 font-medium leading-relaxed">
              Based in South London, we are a boutique web intelligence agency. We don't just build websites; we architect conversion engines wrapped in premium design.
            </p>
          </motion.div>
        </div>

        {/* The Value Prop */}
        <section className="w-full bg-zinc-950 text-zinc-50 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900 to-transparent pointer-events-none" />
          
          <div className="max-w-3xl relative z-10 flex flex-col gap-8">
            <h2 className="text-3xl md:text-5xl font-heading font-semibold">
              Premium design isn't just about looking expensive. It's about building trust.
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-medium">
              In a crowded market, your website is your best salesperson. A generic site tells prospects you are a generic business. We craft digital experiences that signal authority and build a pipeline of high-value inquiries, regardless of industry.
            </p>
          </div>
        </section>

        {/* How We Work (Process) */}
        <section className="flex flex-col gap-16">
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="text-sm font-bold tracking-widest uppercase text-emerald-600">Our Methodology</span>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tighter">
              How we work.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {processSteps.map((step, idx) => (
              <BentoCard key={step.title} delay={idx * 0.1} className="min-h-[300px] flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-800 mb-8 border border-zinc-200 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-4">{step.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </BentoCard>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
