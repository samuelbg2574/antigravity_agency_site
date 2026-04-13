"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { List } from "@phosphor-icons/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Our Work" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl font-heading font-semibold tracking-tighter hover:opacity-70 transition-opacity"
        >
          Agency<span className="text-emerald-600">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 backdrop-blur-md bg-white/40 border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] rounded-full px-6 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3 py-1 text-sm font-medium transition-colors"
            >
              {pathname === link.href ? (
                <>
                  <span className="relative z-10 text-zinc-900">{link.label}</span>
                  <motion.div
                    layoutId="nav_indicator"
                    className="absolute inset-0 bg-white rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                </>
              ) : (
                <span className="text-zinc-500 hover:text-zinc-900 transition-colors">
                  {link.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="/booking">
            <MagneticButton>
              <span>Book a Consultation</span>
            </MagneticButton>
          </Link>
        </div>

        {/* Mobile menu icon */}
        <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/20 shadow-sm">
          <List size={20} weight="bold" />
        </button>
      </div>
    </header>
  );
}
