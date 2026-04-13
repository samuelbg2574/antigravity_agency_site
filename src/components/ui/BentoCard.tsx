"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function BentoCard({ children, className = "", delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: delay
      }}
      className={`bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group ${className}`}
    >
      {/* Liquid glass refraction subtle inner border */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/80 pointer-events-none" />
      
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10 h-full w-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
