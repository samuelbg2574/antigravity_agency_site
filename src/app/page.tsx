"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import ServicesSection from "@/components/ui/ServicesSection";
import SelectedWorkSection from "@/components/ui/SelectedWorkSection";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
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
                <ArrowUpRightIcon className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
      <ServicesSection />

      {/*
        SELECTED WORK
      */}
      <SelectedWorkSection />

    </div>
  );
}
