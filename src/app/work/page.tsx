"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const portfolio = [
  { 
    title: "George Photo", 
    description: "A premium portfolio experience for a professional photography studio. Features dense image grids and high-end typography.", 
    url: "https://george-photo-site.vercel.app/" 
  },
  { 
    title: "Touchpoint Judo", 
    description: "A dynamic local business website for a sports club built to handle memberships and class scheduling inquiries.", 
    url: "https://touchpointjudo-mockup.vercel.app/" 
  },
  { 
    title: "Agency Brown Two", 
    description: "A creative agency template demonstrating brutalist geometry combined with sleek, modern UI interactions.", 
    url: "https://agency-site-brown-two.vercel.app/" 
  }
];

export default function Work() {
  return (
    <div className="w-full flex justify-center px-4 md:px-8 mt-12 md:mt-24 pb-24">
      <div className="max-w-7xl w-full flex flex-col gap-16 md:gap-24">
        
        {/* Intro */}
        <div className="max-w-2xl flex flex-col gap-4">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-semibold tracking-tighter"
          >
            Our Work.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-500 font-medium leading-relaxed"
          >
            We don't do templates. We build measurable digital experiences. Explore a selection of our recent premium web applications and sites.
          </motion.p>
        </div>

        {/* Work Grid */}
        <div className="flex flex-col gap-32">
          {portfolio.map((project, idx) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className={`flex flex-col gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
            >
              
              {/* Fake Browser Chrome / Iframe */}
              <div className="w-full md:w-2/3 aspect-[4/3] bg-zinc-100 rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden relative group">
                {/* Browser Header */}
                <div className="h-10 border-b border-slate-200 bg-white/50 backdrop-blur-sm px-4 flex items-center gap-2 relative z-20">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                
                {/* Iframe */}
                <div className="relative w-full h-[calc(100%-2.5rem)]">
                  {/* We scale the iframe down slightly to show more of the page */}
                  <iframe 
                    src={project.url} 
                    className="w-full h-full border-0 absolute inset-0 group-hover:scale-[1.01] transition-transform duration-700 ease-out" 
                    title={project.title}
                  />
                  {/* Subtle glass overlay that goes away on hover so they can interact */}
                  <div className="absolute inset-0 bg-zinc-950/5 group-hover:bg-transparent transition-colors pointer-events-none" />
                </div>
              </div>

              {/* Text Info */}
              <div className="w-full md:w-1/3 flex flex-col gap-6 md:p-8">
                <h2 className="text-3xl md:text-4xl font-heading font-semibold">{project.title}</h2>
                <p className="text-zinc-500 font-medium leading-relaxed">
                  {project.description}
                </p>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-zinc-900 border-b border-zinc-900 pb-1 w-fit mt-4 hover:text-emerald-700 hover:border-emerald-700 transition-colors"
                >
                  Visit Live Site <ArrowUpRight weight="bold" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
