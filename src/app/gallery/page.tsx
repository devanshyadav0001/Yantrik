"use client";

import GalleryScrollReveal from "@/components/GalleryScrollReveal";
import SectionBackground from "@/components/SectionBackground";

export default function GalleryPage() {
  return (
    <SectionBackground>
      <div className="relative min-h-screen overflow-hidden">
        {/* 3D Tilt Grid Gallery — full-screen pinned scene, no top padding needed */}
        <GalleryScrollReveal />
      </div>
    </SectionBackground>
  );
}
