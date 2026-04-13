"use client";

import dynamic from "next/dynamic";

// Dynamic import with ssr:false must live in a Client Component.
// This thin wrapper lets page.tsx remain a Server Component.
const HeroShader = dynamic(() => import("@/components/ui/HeroShader"), { ssr: false });

export default function HeroShaderLoader() {
  return <HeroShader />;
}
