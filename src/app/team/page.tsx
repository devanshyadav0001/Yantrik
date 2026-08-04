"use client";

import TeamParallax from "@/components/TeamParallax";
import SectionBackground from "@/components/SectionBackground";

export default function TeamPage() {
  return (
    <SectionBackground>
      <div className="relative min-h-screen overflow-hidden">
        {/* Navbar spacer */}
        <div className="pt-28" />

        {/* GSAP Parallax Masonry Team Grid */}
        <TeamParallax />
      </div>
    </SectionBackground>
  );
}
