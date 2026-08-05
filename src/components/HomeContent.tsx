"use client";

import { motion, Variants } from "framer-motion";
import { Wrench, Cpu, Zap, Trophy, Users, Calendar } from "lucide-react";
import Link from "next/link";
import MagicBento from "@/components/MagicBento";

const stats = [
  { label: "Active Members", value: "50+", icon: Users },
  { label: "Projects Built", value: "15+", icon: Wrench },
  { label: "Competitions Won", value: "10+", icon: Trophy },
  { label: "Events / Year", value: "20+", icon: Calendar },
];

const bentoBuildCards = [
  {
    color: "rgba(10,10,10,0.6)",
    title: "Battle Bots",
    description: "Heavyweight combat robots with devastating spinning drum weapons, flipper mechanisms, and reinforced armor.",
    label: "Combat Robotics",
  },
  {
    color: "rgba(10,10,10,0.6)",
    title: "RC Vehicles",
    description: "All-terrain RC cars with custom chassis, suspension systems, and ESC tuning pushed to the limit.",
    label: "RC Division",
  },
  {
    color: "rgba(10,10,10,0.6)",
    title: "Fixed-Wing Aircraft",
    description: "Handbuilt RC planes with custom airfoils, optimised thrust-to-weight ratios, and stable flight controls.",
    label: "Aeromodelling",
  },
  {
    color: "rgba(10,10,10,0.6)",
    title: "Drones",
    description: "Autonomous drone platforms for reconnaissance, payload delivery, and real-time telemetry.",
    label: "Aerial Systems",
  },
  {
    color: "rgba(10,10,10,0.6)",
    title: "CNC & Fabrication",
    description: "Precision CNC machining, 3D printing, and metal fabrication — the backbone of every build.",
    label: "Workshop",
  },
  {
    color: "rgba(10,10,10,0.6)",
    title: "Autonomous Vehicles",
    description: "Next-gen ground vehicles pushing the boundaries of embedded systems and mechanical design.",
    label: "Classified",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function HomeContent() {
  return (
    <div>
      {/* About Section */}
      <section className="relative py-32 px-6 md:px-12 overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="font-syncopate font-bold text-4xl md:text-5xl text-white uppercase tracking-widest mb-6">
              Who We <span className="text-red-600">Are</span>
            </h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mb-8" />
            <p className="text-neutral-300 text-lg md:text-xl font-inter leading-relaxed max-w-3xl mx-auto">
              Yantrik is the official mechanical and multidisciplinary engineering
              club under the Science & Technology Council at{" "}
              <span className="text-white font-medium">IIT Mandi</span>. We
              build combat robots, RC vehicles, drones, and fixed-wing aircraft
              — transforming raw ideas into battle-tested machines.
            </p>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-black/40 backdrop-blur-md border border-neutral-800/50 rounded-xl p-6 text-center hover:border-red-900/50 transition-colors group"
              >
                <stat.icon className="w-6 h-6 text-red-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl md:text-4xl font-syncopate font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-neutral-500 text-xs font-inter uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build Section — MagicBento */}
      <section className="relative py-32 px-6 md:px-12 border-t border-red-900/20">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-syncopate font-bold text-4xl md:text-5xl text-white uppercase tracking-widest text-center mb-6"
          >
            What We <span className="text-red-600">Build</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-red-600 mx-auto mb-20 origin-center"
          />

          <div className="flex justify-center">
            <MagicBento
              cardData={bentoBuildCards}
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 md:px-12 border-t border-red-900/20">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-syncopate font-bold text-3xl md:text-5xl text-white uppercase tracking-widest mb-6">
              Ready to <span className="text-red-600">Build</span>?
            </h2>
            <p className="text-neutral-300 text-lg font-inter mb-10 leading-relaxed">
              Whether you&apos;re a seasoned engineer or just getting started,
              Yantrik has a place for you. Join us and turn your ideas into
              real machines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="cursor-target inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-syncopate uppercase text-sm tracking-widest rounded-lg transition-colors"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="cursor-target inline-flex items-center justify-center px-8 py-4 border border-red-700/50 hover:bg-red-900/20 text-red-500 font-syncopate uppercase text-sm tracking-widest rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
