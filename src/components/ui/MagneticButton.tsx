"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function MagneticButton({ children, className = "", variant = "primary" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const styleVariants = {
    primary: "bg-zinc-950 text-white shadow-lg hover:shadow-xl shadow-zinc-950/20",
    secondary: "bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]",
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <motion.button
        whileTap={{ scale: 0.98, y: 1 }}
        className={`px-6 py-3 rounded-full font-medium tracking-tight transition-all duration-300 ease-out flex items-center justify-center gap-2 ${styleVariants[variant]} ${className}`}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}
