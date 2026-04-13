import Link from "next/link";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroShaderLoader from "@/components/ui/HeroShaderLoader";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

// Split below-fold sections into separate bundles — keeps the initial JS
// payload focused on the hero so the main thread unblocks sooner on mobile.
const ServicesSection = dynamic(() => import("@/components/ui/ServicesSection"));
const SelectedWorkSection = dynamic(() => import("@/components/ui/SelectedWorkSection"));

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/*
        HERO SECTION
        Asymmetric layout with extreme whitespace (Art Gallery Mode)
        CSS animations replace Framer Motion here — runs before JS hydration,
        so LCP text paints immediately from SSR HTML.
      */}
      <section className="relative w-full min-h-[90vh] flex items-center px-4 md:px-8 mt-12 md:mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-zinc-50 pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12">

          <div className="animate-hero-slide-right md:col-span-8 flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-semibold tracking-tighter leading-[1.05] text-zinc-950 mb-8">
              Where Design <br/>
              <span className="text-zinc-500">Meets Intent.</span>
            </h1>

            <p className="animate-hero-fade-up-1 text-lg md:text-xl text-zinc-600 max-w-[50ch] leading-relaxed mb-12 font-medium">
              A website agency specialising in building performant sites, that are designed to convert. We craft digital experiences that don&apos;t just look premium—they build a pipeline of high-value inquiries.
            </p>

            <div className="animate-hero-fade-up-2 flex flex-col sm:flex-row items-center gap-6">
              <Link href="/booking">
                <MagneticButton className="px-8 py-4 text-lg">
                  <span>Book a Consultation</span>
                </MagneticButton>
              </Link>
              <Link href="/work" className="group flex items-center gap-2 text-zinc-500 font-medium hover:text-zinc-900 transition-colors">
                View our work
                <ArrowUpRightIcon className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="animate-hero-scale-in hidden md:flex md:col-span-4 items-center justify-center relative">
            {/* Shader Visual element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-10 hidden md:block">
              <HeroShaderLoader />
            </div>
          </div>

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
