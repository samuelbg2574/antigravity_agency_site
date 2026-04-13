"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BentoCard from "@/components/ui/BentoCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { CalendarBlank, Clock, CheckCircle } from "@phosphor-icons/react";

export default function Booking() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Mock dates for UI purposes
  const dates = [
    { day: "Mon", date: "15" },
    { day: "Tue", date: "16" },
    { day: "Wed", date: "17" },
    { day: "Thu", date: "18" },
    { day: "Fri", date: "19" },
  ];

  const times = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

  return (
    <div className="w-full flex justify-center px-4 md:px-8 mt-12 md:mt-24 pb-24 min-h-[80vh]">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left Column: Context & Value Prop */}
        <div className="md:col-span-5 flex flex-col gap-8 pt-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-sm font-bold tracking-widest uppercase text-emerald-600 mb-4 block">Consultation</span>
            <h1 className="text-4xl md:text-6xl font-heading font-semibold tracking-tighter mb-6">
              Let's discuss your project.
            </h1>
            <p className="text-lg text-zinc-500 font-medium leading-relaxed mb-8">
              Book a free 30-minute discovery call. We'll discuss your goals, review your current setup, and outline how a premium digital presence can increase your conversions.
            </p>
          </motion.div>

          {/* Social Proof / Trust Element */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex flex-col gap-4 p-6 bg-zinc-950 text-zinc-50 rounded-3xl"
          >
            <p className="text-zinc-400 italic text-sm">
              "Working with them completely changed how we generate leads. The new site paid for itself in the first month."
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm">MB</div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Marcus B.</span>
                <span className="text-xs text-zinc-500">Director, TechNova</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Scheduling Interface */}
        <div className="md:col-span-7">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <BentoCard className="w-full flex-col min-h-[500px]">
              <AnimatePresence mode="wait">
                
                {step === 1 && (
                  <motion.div 
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-8 w-full h-full"
                  >
                    <div>
                      <h3 className="text-2xl font-heading font-semibold mb-2 flex items-center gap-2">
                        <CalendarBlank /> Select a Date
                      </h3>
                      <p className="text-sm text-zinc-500">Times are in GMT (London).</p>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {dates.map((d, i) => (
                        <button 
                          key={i} 
                          className="flex flex-col items-center justify-center p-4 rounded-2xl border border-zinc-200 hover:border-emerald-500 hover:bg-emerald-50 transition-colors gap-2"
                        >
                          <span className="text-xs font-bold text-zinc-400 uppercase">{d.day}</span>
                          <span className="text-xl font-heading font-semibold">{d.date}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                        <Clock className="text-zinc-400" /> Available Times
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {times.map((t, i) => (
                          <button 
                            key={i} 
                            onClick={() => setStep(2)}
                            className="p-3 rounded-xl border border-zinc-200 text-sm font-medium hover:bg-zinc-950 hover:text-white transition-all text-center"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-8 w-full h-full"
                  >
                    <div>
                      <h3 className="text-2xl font-heading font-semibold mb-1">Your Details</h3>
                      <p className="text-sm text-zinc-500">Almost there. How should we contact you?</p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Full Name</label>
                        <input type="text" className="w-full p-4 rounded-xl border border-zinc-200 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium" placeholder="Jane Doe" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Work Email</label>
                        <input type="email" className="w-full p-4 rounded-xl border border-zinc-200 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium" placeholder="jane@company.com" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Project Details</label>
                        <textarea className="w-full p-4 rounded-xl border border-zinc-200 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium resize-none" rows={3} placeholder="Tell us a bit about what you need..."></textarea>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-auto">
                      <button 
                        onClick={() => setStep(1)}
                        className="text-sm font-bold text-zinc-500 hover:text-zinc-950 transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setStep(3)}
                        className="ml-auto bg-zinc-950 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-zinc-800 transition-all"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center gap-6 w-full h-full py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                      <CheckCircle size={48} weight="fill" />
                    </div>
                    <h3 className="text-3xl font-heading font-semibold">Booking Confirmed</h3>
                    <p className="text-zinc-500 font-medium max-w-[40ch]">
                      You're all set. We've sent a calendar invite with the Google Meet link to your email. We look forward to speaking with you!
                    </p>
                    <button 
                      onClick={() => setStep(1)}
                      className="mt-8 text-sm font-bold tracking-widest uppercase text-emerald-600 border-b border-emerald-600 pb-1"
                    >
                      Book Another
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </BentoCard>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
