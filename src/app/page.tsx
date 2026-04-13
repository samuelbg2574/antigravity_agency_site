"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BentoCard from "@/components/ui/BentoCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowLeft, ArrowUpRight, Gauge, LinkBreak, Star } from "@phosphor-icons/react";
import HeroShader from "@/components/ui/HeroShader";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 
        HERO SECTION 
        Asymmetric layout with extreme whitespace (Art Gallery Mode)
      */}
      <section className="relative w-full min-h-[90vh] flex items-center px-4 md:px-8 mt-12 md:mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-zinc-50 pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="md:col-span-8 flex flex-col justify-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-semibold tracking-tighter leading-[1.05] text-zinc-950 mb-8">
              Where Design <br/>
              <span className="text-zinc-400">Meets Intent.</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
              className="text-lg md:text-xl text-zinc-600 max-w-[50ch] leading-relaxed mb-12 font-medium"
            >
              A website agency specialising in building performant sites, that are designed to convert. We craft digital experiences that don't just look premium—they build a pipeline of high-value inquiries.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 20 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link href="/booking">
                <MagneticButton className="px-8 py-4 text-lg">
                  <span>Book a Consultation</span>
                </MagneticButton>
              </Link>
              <Link href="/work" className="group flex items-center gap-2 text-zinc-500 font-medium hover:text-zinc-900 transition-colors">
                View our work 
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 80, damping: 20 }}
            className="hidden md:flex md:col-span-4 items-center justify-center relative"
          >
            {/* Shader Visual element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-10 hidden md:block">
              <HeroShader />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 
        SERVICES SECTION (Parallax Bento Grid) 
      */}
      <section className="py-32 px-4 md:px-8 bg-zinc-100/50">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="text-sm font-bold tracking-widest uppercase text-emerald-600">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tighter">
              Premium quality. <br/> <span className="text-zinc-500"> measurable results.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BentoCard delay={0.1} className="flex flex-col justify-between min-h-[400px]">
              <div className="bg-white/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-zinc-100 shadow-sm">
                <Star size={32} weight="duotone" className="text-zinc-800" />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-semibold mb-4">Web Design that Converts</h3>
                <p className="text-zinc-500 leading-relaxed font-medium">
                  We don't just make things look pretty. Our premium designs are meticulously crafted to build trust instantly and channel your visitors into a pipeline of high-value inquiries, regardless of your industry.
                </p>
              </div>
            </BentoCard>

            <BentoCard delay={0.2} className="flex flex-col justify-between min-h-[400px]">
              <div className="bg-white/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-zinc-100 shadow-sm">
                <Gauge size={32} weight="duotone" className="text-zinc-800" />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-semibold mb-4">SEO & Performance</h3>
                <p className="text-zinc-500 leading-relaxed font-medium">
                  Our sites score 90+ on Google's Lighthouse tests for speed, quality, and security. We build lightweight, lightning-fast architecture that helps you rank higher in search results naturally.
                </p>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* 
        SHOWCASE SNIPPET 
      */}
      <section className="py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="flex flex-col gap-4 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tighter">
                Selected Work 
              </h2>
              <p className="text-zinc-500 font-medium">Browse a few of our recently completed premium builds.</p>
            </div>
            <Link href="/work">
              <MagneticButton variant="secondary">
                <span>View Full Portfolio</span>
              </MagneticButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              { title: "George Photo", role: "Portfolio Site", url: "https://george-photo-site.vercel.app/" },
              { title: "Touchpoint Judo", role: "Sports Club Mockup", url: "https://touchpointjudo-mockup.vercel.app/" },
              { title: "Agency Brown Two", role: "Creative Agency", url: "https://agency-site-brown-two.vercel.app/" }
            ].map((work, idx) => (
              <motion.div 
                key={work.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                className="group relative flex flex-col gap-4"
              >
                <div className="w-full aspect-[4/3] bg-zinc-100 rounded-[2rem] overflow-hidden relative border border-slate-200 shadow-sm flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors z-10" />
                  <iframe 
                    src={work.url} 
                    className="w-[150%] h-[150%] scale-[0.67] origin-top-left border-0 pointer-events-none" 
                    title={work.title}
                  />
                  <div className="absolute inset-0 z-20" /> {/* Overlay to prevent interactions */}
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg">{work.title}</h4>
                  <p className="text-sm font-medium text-zinc-500">{work.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
