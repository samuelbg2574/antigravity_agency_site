"use client";

import { motion } from "framer-motion";
import MethodologySection from "@/components/ui/MethodologySection";

export default function About() {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      {/* Intro + Value Prop — constrained */}
      <div className="w-full flex justify-center px-4 md:px-8 mt-12 md:mt-24 pb-0">
        <div className="max-w-7xl w-full flex flex-col gap-24 md:gap-32">

          {/* Intro */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8 flex flex-col gap-6">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl lg:text-8xl font-heading font-semibold tracking-tighter"
              >
                We engineer <br />
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
                Based in South London, we are a boutique web intelligence
                agency. We don't just build websites; we architect conversion
                engines wrapped in premium design.
              </p>
            </motion.div>
          </div>

          {/* The Value Prop */}
          <section className="w-full bg-zinc-950 text-zinc-50 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900 to-transparent pointer-events-none" />
            <div className="max-w-3xl relative z-10 flex flex-col gap-8">
              <h2 className="text-3xl md:text-5xl font-heading font-semibold">
                Premium design isn't just about looking expensive. It's about
                building trust.
              </h2>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-medium">
                In a crowded market, your website is your best salesperson. A
                generic site tells prospects you are a generic business. We
                craft digital experiences that signal authority and build a
                pipeline of high-value inquiries, regardless of industry.
              </p>
            </div>
          </section>

        </div>
      </div>

      {/* How We Work (Process) — full-width, self-contained */}
      <MethodologySection />
    </div>
  );
}
