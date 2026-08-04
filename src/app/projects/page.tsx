"use client";

import { motion } from "framer-motion";
import SectionBackground from "@/components/SectionBackground";
import MagicBento from "@/components/MagicBento";

const projectCards = [
  {
    color: "#0a0a0a",
    title: "Ashwatthama",
    description: "Heavyweight combat robot with a high-RPM spinning drum weapon. Built to dominate national arenas.",
    label: "Project Trishakti",
  },
  {
    color: "#0a0a0a",
    title: "Vajra",
    description: "Middleweight flipper bot designed for explosive launches and rapid self-righting.",
    label: "Project Trishakti",
  },
  {
    color: "#0a0a0a",
    title: "Garuda",
    description: "Aerial drone platform for reconnaissance and precision payload delivery with autonomous flight planning.",
    label: "Project Trishakti",
  },
  {
    color: "#0a0a0a",
    title: "Project Y",
    description: "Next-gen autonomous ground vehicle pushing the limits of mechanical and embedded systems design.",
    label: "Classified",
  },
  {
    color: "#0a0a0a",
    title: "RC Racer",
    description: "All-terrain RC car with custom suspension, ESC tuning, and lightweight carbon-fibre chassis.",
    label: "RC Division",
  },
  {
    color: "#0a0a0a",
    title: "Fixed-Wing",
    description: "Handbuilt fixed-wing RC aircraft with optimised airfoil design and long-range flight control.",
    label: "Aeromodelling",
  },
];

export default function ProjectsPage() {
  return (
    <SectionBackground>
      <section className="pt-28 pb-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-syncopate text-4xl md:text-6xl font-bold uppercase tracking-widest text-white">
            Our <span className="text-red-600">Projects</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto font-inter text-neutral-400 text-base md:text-lg leading-relaxed">
            From combat-hardened robots to autonomous platforms — every machine
            we build is a testament to relentless engineering.
          </p>

          <motion.div
            className="mt-8 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* ── MagicBento Grid ── */}
        <div className="flex justify-center">
          <MagicBento
            cardData={projectCards}
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="220, 38, 38"
          />
        </div>
      </section>
    </SectionBackground>
  );
}
