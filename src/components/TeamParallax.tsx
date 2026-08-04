"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

const team: [string, string, string | null][] = [
  ["Advaith S. Pillai", "Coordinator & RC Plane Head", null],
  ["Aman Modi", "Co Coordinator", "Aman Modi B25065.jpg"],
  ["Aarav Arya", "Tech Lead & RC Car Head", "Aarav Arya.jpg"],
  ["Piyush Kumar", "Tech Lead, WebDev & RC Car Head", "Piyush kumar  B25162.jpg"],
  ["Rishi Rethish K", "RC Plane Head", "Rishi Rethish Kurup  B25394.jpg"],
  ["Dharmesh Sahu", "Battle Bot Head (Ex-Core)", null],
  ["Aryan Gupta", "PnM Head", null],
  ["Devansh Yadav", "Core Member", "Devansh Yadav.jpg"],
  ["Pankaj", "Core Member", "Pankaj.jpg"],
  ["Prashant Kumar", "PMC & Design Head", "Prashant Kumar (B25055).jpg"],
  ["Tanmay Laxkar", "Core Member", "Tanmay .jpg"],
  ["Suman Ghanti", "Core Member", "Suman Ghanti B25425.jpeg"],
  ["Mebil M V", "Core Member", "Mebil M V B25506.jpg"],
  ["Shlok Jain", "Core Member", "Shlok Jain  B25484.jpg"],
  ["Advaith Shailesh", "Core Member", null],
  ["Aryan", "Core Member", null],
  ["Atharva Sachin", "Core Member", "Atharva Sachin Bekanalkar(IM25077).jpg"],
  ["Aryan Soni", "Core Member", "Aryan Soni.jpeg"],
  ["Neeraj Kumar", "Core Member", "Neeraj Kumar(B25473).jpg"],
  ["Govind Durgan", "Core Member", "Govind Durgani.jpg"],
  ["Adarsh Kumar", "Core Member", null],
  ["Piyush", "Core Member", "Piyush  B25283.jpg"],
];

// Distribute members into 3 columns round-robin
function distributeColumns() {
  const cols: [string, string, string | null][][] = [[], [], []];
  team.forEach(([name, role, img], i) => {
    cols[i % 3].push([name, role, img]);
  });
  return cols;
}

export default function TeamParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const members = gsap.utils.toArray<HTMLElement>(
      ".team-member",
      containerRef.current
    );

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const triggers: ScrollTrigger[] = [];

    members.forEach((member) => {
      if (reduced) {
        gsap.set(member, { opacity: 1, scale: 1 });
        return;
      }

      // Scale up as card approaches center screen
      const t1 = gsap.fromTo(
        member,
        { scale: 0.7, opacity: 0.35 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: member,
            start: "top bottom",
            end: "center center",
            scrub: 0.4,
          },
        }
      );
      if (t1.scrollTrigger) triggers.push(t1.scrollTrigger);

      // Shrink back as card exits past top
      const t2 = gsap.to(member, {
        scale: 0.7,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: member,
          start: "center center",
          end: "top top",
          scrub: 0.4,
        },
      });
      if (t2.scrollTrigger) triggers.push(t2.scrollTrigger);
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const columns = distributeColumns();
  const columnOffsets = ["mt-[40px]", "mt-[260px]", "mt-[120px]"];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-visible"
    >
      {/* Sticky header — blend mode exclusion so it reads through the photos */}
      <div
        className="sticky top-0 h-screen flex flex-col items-center justify-center text-center pointer-events-none"
        style={{ zIndex: 5, mixBlendMode: "exclusion" }}
      >
        <p className="m-0 mb-[18px] text-[12px] tracking-[0.12em] leading-[1.5] text-white font-syncopate uppercase">
          Scroll Down
          <br />
          To See Effect
        </p>
        <div className="w-[1px] h-[60px] bg-white opacity-60 mx-auto mb-[18px]" />
        <h2
          className="m-0 font-extrabold tracking-[-0.02em] text-white uppercase font-syncopate"
          style={{ fontSize: "clamp(40px, 8vw, 110px)" }}
        >
          Core Team 2026
        </h2>
        <p className="mt-[14px] text-[15px] tracking-[0.08em] text-white font-inter">
          2026
        </p>
      </div>

      {/* Parallax columns — relative layout naturally determines parent height */}
      <div
        className="relative flex gap-6 px-6 pb-32 max-w-[1400px] mx-auto md:gap-6 max-md:gap-3 max-md:px-[14px] z-[1]"
      >
        {columns.map((col, colIdx) => (
          <div
            key={colIdx}
            className={`flex-1 flex flex-col gap-16 max-md:gap-10 ${columnOffsets[colIdx]}`}
            style={{ willChange: "transform" }}
          >
            {col.map(([name, role, img], memberIdx) => {
              const seed = name
                .replace(/[^a-zA-Z0-9]/g, "-")
                .toLowerCase();
              
              const imageSrc = img 
                ? `/team/${encodeURIComponent(img)}`
                : `https://picsum.photos/seed/${seed}/500/700`;

              return (
                <div
                  key={memberIdx}
                  className="team-member origin-center"
                  style={{ opacity: 0 }}
                >
                  {/* Photo */}
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={imageSrc}
                      alt={name}
                      loading="lazy"
                      className="block w-full aspect-[3/4] object-cover grayscale contrast-[1.05] transition-all duration-500 ease-out hover:grayscale-0 hover:scale-[1.04]"
                    />
                  </div>
                  {/* Label */}
                  <div className="flex justify-between items-start gap-2 mt-3 text-[13px] tracking-[0.04em]">
                    <span className="font-bold text-white font-inter">
                      {name}
                    </span>
                    <span className="text-neutral-500 uppercase tracking-[0.08em] text-[11px] text-right font-inter">
                      {role}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
