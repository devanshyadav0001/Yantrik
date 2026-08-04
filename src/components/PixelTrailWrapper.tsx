"use client";

import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Three.js
const PixelTrail = dynamic(() => import("./PixelTrail"), { ssr: false });

export default function PixelTrailWrapper() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
        <PixelTrail
          gridSize={50}
          trailSize={0.1}
          maxAge={250}
          interpolate={5}
          color="#dc2626"
          gooeyFilter={{ id: "yantrik-goo", strength: 2 }}
        />
      </div>
    </div>
  );
}
