"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const PixelTrail = dynamic(() => import("./PixelTrail"), { ssr: false });
const CursorGrid = dynamic(() => import("./CursorGrid"), { ssr: false });

interface SectionBackgroundProps {
  children: React.ReactNode;
}

export default function SectionBackground({ children }: SectionBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-neutral-950 z-10 shadow-[0_20px_60px_rgba(0,0,0,1)] mb-[400px]">
      {/* Yantrik Logo Background - absolute, not fixed, so it stays within this page only */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0 overflow-hidden">
        <div className="relative w-[60vw] h-[60vw] max-w-[600px] max-h-[600px]">
          <Image
            src="/assets/yantrik.png"
            alt="Background Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* CursorGrid Layer */}
      <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden">
        <div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
          <CursorGrid
            cellSize={60}
            color="#dc2626"
            radius={180}
            falloff="smooth"
            holdTime={600}
            fadeDuration={1200}
            lineWidth={1}
            maxOpacity={0.8}
            fillOpacity={0.05}
            gridOpacity={0.08}
            cellRadius={0}
            clickPulse={true}
            pulseSpeed={800}
          />
        </div>
      </div>

      {/* PixelTrail Layer - absolute so it stays within this component */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
          <PixelTrail
            gridSize={50}
            trailSize={0.1}
            maxAge={250}
            interpolate={5}
            color="#dc2626"
            gooeyFilter={{ id: "section-goo", strength: 2 }}
          />
        </div>
      </div>

      {/* Page Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
