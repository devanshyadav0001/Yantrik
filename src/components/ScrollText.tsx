"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const lines = [
  { text: "Yantrik", reverse: false, color: "text-red-600/40" },
  { text: "Yantrik", reverse: true, color: "text-neutral-500/30" },
  { text: "Yantrik", reverse: false, color: "text-red-600/40" },
];

export default function ScrollText() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position relative to THIS component, not the absolute page top
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scrollX = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const invertScrollX = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden py-16 bg-black/80 backdrop-blur-sm border-t border-b border-red-900/20">
      {lines.map(({ text, reverse, color }, i) => (
        <motion.div
          key={i}
          style={{
            x: reverse ? invertScrollX : scrollX,
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
          }}
          className={`whitespace-nowrap will-change-transform font-syncopate font-bold uppercase leading-[1.1] ${color}`}
        >
          {Array.from({ length: 15 }).map((_, j) => (
            <span key={j} className="mr-8">
              {text} •
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
