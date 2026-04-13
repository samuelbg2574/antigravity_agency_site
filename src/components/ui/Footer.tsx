import Link from "next/link";
import MagneticButton from "./MagneticButton";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200/50 pt-20 pb-10 px-4 md:px-8 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        <div className="flex flex-col gap-6 max-w-sm">
          <h2 className="text-3xl font-heading font-semibold tracking-tighter">
            Ready to upgrade your digital presence?
          </h2>
          <p className="text-zinc-500 font-medium leading-relaxed">
            We build high performance sites that are designed to convert, built for businesses that demand premium quality.
          </p>
          <Link href="/booking" className="w-fit">
            <MagneticButton className="mt-4">
              <span>Start a Project</span>
              <ArrowUpRight size={16} weight="bold" />
            </MagneticButton>
          </Link>
        </div>

        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-4 text-sm font-medium">
            <span className="text-zinc-400 uppercase tracking-widest text-xs font-bold mb-2">Agency</span>
            <Link href="/" className="text-zinc-600 hover:text-zinc-950 transition-colors">Home</Link>
            <Link href="/work" className="text-zinc-600 hover:text-zinc-950 transition-colors">Our Work</Link>
            <Link href="/about" className="text-zinc-600 hover:text-zinc-950 transition-colors">About Us</Link>
          </div>
          <div className="flex flex-col gap-4 text-sm font-medium">
            <span className="text-zinc-400 uppercase tracking-widest text-xs font-bold mb-2">Connect</span>
            <a href="#" className="text-zinc-600 hover:text-zinc-950 transition-colors">Twitter</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-950 transition-colors">LinkedIn</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-950 transition-colors">Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-400">
        <p>© {new Date().getFullYear()} Premium Agency. All Rights Reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-zinc-800 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-zinc-800 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
