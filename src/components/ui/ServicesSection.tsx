"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";

interface Service {
  id: string;
  title: string;
  description: string;
  iframeUrl: string;
  cta: { label: string; href: string };
}

const services: Service[] = [
  {
    id: "web-design",
    title: "Web Design",
    description:
      "We don't just make things look pretty. Our premium designs are meticulously crafted to build trust instantly and channel your visitors into a pipeline of high-value inquiries, regardless of your industry.",
    iframeUrl: "https://george-photo-site.vercel.app/",
    cta: { label: "View related work", href: "/work" },
  },
  {
    id: "seo",
    title: "SEO Optimisation",
    description:
      "Our sites score 90+ on Google's Lighthouse tests for speed, quality, and security. We build lightweight, lightning-fast architecture that helps you rank higher in search results naturally.",
    iframeUrl: "https://agency-site-brown-two.vercel.app/",
    cta: { label: "Learn more", href: "/work" },
  },
];

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string>(services[0].id);
  const activeService = services.find((s) => s.id === activeId)!;

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  // Defer iframe loading until the section is near the viewport.
  const [iframeReady, setIframeReady] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIframeReady(true);
          obs.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-4 md:px-8 bg-zinc-100/50 overflow-hidden"
      aria-label="Our Services"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="block text-xs font-bold tracking-widest uppercase text-zinc-400 mb-16"
        >
          Our Services
        </motion.span>

        {/* Two-column split layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* LEFT — Portfolio preview */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-200 border border-slate-200/60 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.12)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, filter: "blur(6px)", scale: 1.02 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(4px)", scale: 0.99 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <motion.div
                  style={{ y: imageY }}
                  className="absolute inset-[-8%] w-[116%] h-[116%]"
                >
                  {/* iframe preview scaled to fill */}
                  <div className="w-full h-full relative">
                    <iframe
                      src={iframeReady ? activeService.iframeUrl : undefined}
                      title={`${activeService.title} portfolio preview`}
                      className="absolute top-0 left-0 w-[200%] h-[200%] border-0 pointer-events-none"
                      style={{ transform: "scale(0.5)", transformOrigin: "top left" }}
                      tabIndex={-1}
                      loading="lazy"
                    />
                    {/* Overlay to prevent iframe interaction */}
                    <div className="absolute inset-0 z-10" aria-hidden="true" />
                  </div>
                </motion.div>

                {/* Subtle inner vignette */}
                <div
                  className="absolute inset-0 z-20 pointer-events-none rounded-[2rem]"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.06) 100%)",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* RIGHT — Service headers + description */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="flex flex-col" aria-label="Services">
              {services.map((service, idx) => {
                const isActive = service.id === activeId;
                return (
                  <div key={service.id}>
                    {/* Thin top divider */}
                    <div className="h-px w-full bg-zinc-200" aria-hidden="true" />

                    {/* Service header button — accordion pattern */}
                    <button
                      aria-expanded={isActive}
                      aria-controls={`panel-${service.id}`}
                      id={`tab-${service.id}`}
                      onClick={() => setActiveId(service.id)}
                      className="group w-full text-left py-8 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded-sm"
                    >
                      <motion.h2
                        animate={{
                          color: isActive ? "#09090b" : "#a1a1aa",
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold tracking-tighter leading-none select-none"
                      >
                        {service.title}
                      </motion.h2>

                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                          x: isActive ? 0 : -8,
                        }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="ml-4 flex-shrink-0"
                        aria-hidden="true"
                      >
                        <div className="w-2 h-2 rounded-full bg-zinc-900" />
                      </motion.div>
                    </button>

                    {/* Expandable description panel */}
                    <div
                      id={`panel-${service.id}`}
                      role="region"
                      aria-labelledby={`tab-${service.id}`}
                    >
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key={service.id}
                            initial={{ height: 0, opacity: 0, y: -8 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -4 }}
                            transition={{
                              height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.35, ease: "easeOut" },
                              y: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pb-10 flex flex-col gap-6">
                              <p className="text-base md:text-lg text-zinc-500 font-medium leading-relaxed max-w-[48ch]">
                                {service.description}
                              </p>
                              <Link
                                href={service.cta.href}
                                className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-zinc-500 transition-colors duration-300"
                              >
                                {service.cta.label}
                                <ArrowUpRight
                                  size={14}
                                  className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-300"
                                />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}

              {/* Bottom divider */}
              <div className="h-px w-full bg-zinc-200" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
