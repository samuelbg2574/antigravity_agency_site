"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import MagneticButton from "@/components/ui/MagneticButton";

interface Project {
  title: string;
  category: string;
  tagline?: string;
  url: string;
  href: string;
}

const PROJECTS: Project[] = [
  {
    title: "George Photo",
    category: "Photography Portfolio",
    tagline: "A luxury portfolio built to attract high-value clients",
    url: "https://george-photo-site.vercel.app/",
    href: "/work",
  },
  {
    title: "Touchpoint Judo",
    category: "Sports & Fitness",
    tagline: "Digital-first membership growth",
    url: "https://touchpointjudo-mockup.vercel.app/",
    href: "/work",
  },
  {
    title: "Agency Brown Two",
    category: "Creative Agency",
    url: "https://agency-site-brown-two.vercel.app/",
    href: "/work",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function FeaturedCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease }}
    >
      <Link href={project.href} className="group block">
        {/* Image container — portrait, dominant */}
        <div
          className="relative w-full overflow-hidden rounded-[1.75rem] bg-zinc-100 border border-zinc-200/60 aspect-[3/4]"
          style={{ boxShadow: "0 12px 40px -10px rgba(0,0,0,0.10)" }}
        >
          {/* Scaleable inner wrapper */}
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] origin-center">
            <iframe
              src={project.url}
              title={project.title}
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
          </div>

          {/* Click blocker */}
          <div className="absolute inset-0 z-10" aria-hidden="true" />

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.06) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Category badge — top left */}
          <div className="absolute top-5 left-5 z-30" aria-hidden="true">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-sm border border-zinc-200/60 text-[10px] font-bold tracking-[0.14em] uppercase text-zinc-500 shadow-sm">
              {project.category}
            </span>
          </div>

          {/* Hover arrow — top right */}
          <div className="absolute top-5 right-5 z-30">
            <span
              className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-900 text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-400 ease-out shadow-lg"
              aria-hidden="true"
            >
              <ArrowUpRightIcon size={16} weight="bold" />
            </span>
          </div>
        </div>

        {/* Text — below image */}
        <div className="mt-5 px-1 flex flex-col gap-1.5 transition-transform duration-400 ease-out group-hover:-translate-y-0.5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="relative font-heading font-semibold tracking-tight text-2xl md:text-3xl text-zinc-900 w-fit">
              {project.title}
              <span
                className="absolute -bottom-px left-0 h-px bg-zinc-900 w-0 group-hover:w-full transition-[width] duration-500 ease-out"
                aria-hidden="true"
              />
            </h3>
          </div>
          {project.tagline && (
            <p className="text-sm font-medium text-zinc-400 leading-snug max-w-[38ch]">
              {project.tagline}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

function SupportingCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      <Link href={project.href} className="group block">
        <div className="flex flex-col gap-0">
          {/* Image */}
          <div
            className="relative w-full overflow-hidden rounded-[1.5rem] bg-zinc-100 border border-zinc-200/60 aspect-[3/2]"
            style={{ boxShadow: "0 8px 28px -8px rgba(0,0,0,0.08)" }}
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] origin-center">
              <iframe
                src={project.url}
                title={project.title}
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
            </div>

            {/* Click blocker */}
            <div className="absolute inset-0 z-10" aria-hidden="true" />

            {/* Vignette */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.05) 100%)",
              }}
              aria-hidden="true"
            />

            {/* Hover arrow */}
            <div className="absolute top-4 right-4 z-30">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-400 ease-out shadow-md"
                aria-hidden="true"
              >
                <ArrowUpRightIcon size={13} weight="bold" />
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="mt-4 px-1 flex items-end justify-between gap-3 transition-transform duration-400 ease-out group-hover:-translate-y-0.5">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-zinc-400">
                {project.category}
              </span>
              <h3 className="relative font-heading font-semibold tracking-tight text-xl md:text-2xl text-zinc-900 w-fit leading-tight">
                {project.title}
                <span
                  className="absolute -bottom-px left-0 h-px bg-zinc-900 w-0 group-hover:w-full transition-[width] duration-500 ease-out"
                  aria-hidden="true"
                />
              </h3>
              {project.tagline && (
                <p className="text-xs font-medium text-zinc-400">
                  {project.tagline}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function SelectedWorkSection() {
  const [featured, ...supporting] = PROJECTS;

  return (
    <section className="py-32 px-4 md:px-8" aria-label="Selected Work">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-3">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease }}
              className="text-xs font-bold tracking-[0.14em] uppercase text-zinc-400"
            >
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.07, ease }}
              className="text-4xl md:text-5xl font-heading font-semibold tracking-tighter leading-[1.05]"
            >
              Work that earns attention.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.13, ease }}
              className="text-zinc-500 font-medium text-base max-w-[48ch]"
            >
              A curated preview of recent builds — each one crafted to convert.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="shrink-0"
          >
            <Link href="/work">
              <MagneticButton variant="secondary">
                <span>View Full Portfolio</span>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* ── Art-directed composition ─────────────────────────────── */}
        {/* Desktop: large featured left (7 cols) + 2 stacked right (5 cols) */}
        {/* Mobile: full-width stack */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {/* Featured — dominant left column */}
          <div className="md:col-span-7">
            <FeaturedCard project={featured} />
          </div>

          {/* Supporting — right column, equal-height stack */}
          <div className="md:col-span-5 flex flex-col gap-5 md:gap-6">
            {supporting.map((project, i) => (
              <SupportingCard key={project.title} project={project} delay={0.1 + i * 0.08} />
            ))}
          </div>
        </div>

        {/* ── Mobile portfolio CTA ─────────────────────────────────── */}
        {/* Shown only on mobile since the header CTA may be off-screen */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease }}
          className="flex md:hidden"
        >
          <Link
            href="/work"
            className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-zinc-900 border-b border-zinc-300 pb-1 hover:border-zinc-900 transition-colors"
          >
            View Full Portfolio
            <ArrowUpRightIcon
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              weight="bold"
              size={14}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
