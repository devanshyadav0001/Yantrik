"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const foregroundY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  
  // Maps 0 to 1 progress of THIS section being on screen to horizontal shifts
  const scrollX = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const invertScrollX = useTransform(scrollYProgress, [0, 1], [0, 800]);

  const lines = [
    { text: "Yantrik", reverse: false, color: "text-red-600/40" },
    { text: "Yantrik", reverse: true, color: "text-neutral-500/30" },
    { text: "Yantrik", reverse: false, color: "text-red-600/40" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-neutral-950 overflow-hidden flex items-center justify-center border-b border-red-900/30"
    >
      {/* Background Text Marquee */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center overflow-hidden pointer-events-none gap-2">
        {lines.map(({ text, reverse, color }, i) => (
          <motion.div
            key={i}
            style={{ x: reverse ? invertScrollX : scrollX, fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
            className={`flex whitespace-nowrap will-change-transform font-syncopate font-bold uppercase leading-[1.1] ${color}`}
          >
            {/* Repeat text to ensure it covers the screen during scroll */}
            {Array.from({ length: 12 }).map((_, j) => (
              <span key={j} className="mr-12">
                {text} •
              </span>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Foreground Layer */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-4"
        style={{ y: foregroundY }}
      >
        {/* Intentionally left blank for future foreground content if needed */}
      </motion.div>

      {/* Decorative mechanical lines */}
      <div className="absolute left-10 top-0 bottom-0 w-px bg-red-900/20" />
      <div className="absolute right-10 top-0 bottom-0 w-px bg-red-900/20" />
    </div>
  );
}
