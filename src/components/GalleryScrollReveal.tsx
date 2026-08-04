"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface GalleryItem {
  title: string;
  date: string;
  tag: string;
  src: string;
  type: "image" | "video";
}

const galleryItems: GalleryItem[] = [
  // Robowar images (11) + 1 video
  { title: "Robowar Arena", date: "Jul 2026", tag: "ROBOWAR", src: "/gallery/robowar/IMG-20260723-WA0035.jpg", type: "image" },
  { title: "Battle Bot Close-Up", date: "Jul 2026", tag: "ROBOWAR", src: "/gallery/robowar/IMG-20260723-WA0055.jpg", type: "image" },
  { title: "Combat Zone", date: "Jul 2026", tag: "ROBOWAR", src: "/gallery/robowar/IMG-20260723-WA0038.jpg", type: "image" },
  { title: "Bot Assembly", date: "Jul 2026", tag: "ROBOWAR", src: "/gallery/robowar/IMG-20260723-WA0052.jpg", type: "image" },
  { title: "Pit Crew", date: "Jul 2026", tag: "ROBOWAR", src: "/gallery/robowar/IMG-20260723-WA0042.jpg", type: "image" },
  { title: "Damage Report", date: "Jul 2026", tag: "ROBOWAR", src: "/gallery/robowar/IMG-20260723-WA0053.jpg", type: "image" },
  { title: "Battle in Action", date: "Jul 2026", tag: "ROBOWAR", src: "/gallery/robowar/VID-20260723-WA0064.mp4", type: "video" },
  { title: "The Arena", date: "Jul 2026", tag: "ROBOWAR", src: "/gallery/robowar/IMG-20260723-WA0054.jpg", type: "image" },
  { title: "Pre-Match Prep", date: "Jul 2026", tag: "ROBOWAR", src: "/gallery/robowar/IMG-20260723-WA0034.jpg", type: "image" },
  { title: "Team Strategy", date: "Jul 2026", tag: "ROBOWAR", src: "/gallery/robowar/IMG-20260723-WA0047.jpg", type: "image" },
  // Aerospan images (8) + 2 videos
  { title: "Aerospan Build", date: "Jul 2026", tag: "AEROSPAN", src: "/gallery/aerospan/IMG-20260723-WA0045.jpg", type: "image" },
  { title: "Wing Assembly", date: "Jul 2026", tag: "AEROSPAN", src: "/gallery/aerospan/IMG-20260723-WA0037.jpg", type: "image" },
  { title: "Fuselage Work", date: "Jul 2026", tag: "AEROSPAN", src: "/gallery/aerospan/IMG-20260723-WA0041.jpg", type: "image" },
  { title: "Test Flight", date: "Jul 2026", tag: "AEROSPAN", src: "/gallery/aerospan/VID-20260723-WA0062.mp4", type: "video" },
  { title: "Aeromodelling Workshop", date: "Jul 2026", tag: "AEROSPAN", src: "/gallery/aerospan/IMG-20260723-WA0046.jpg", type: "image" },
  { title: "Maiden Flight", date: "Jul 2026", tag: "AEROSPAN", src: "/gallery/aerospan/IMG-20260723-WA0036.jpg", type: "image" },
  { title: "Flight Video", date: "Jul 2026", tag: "AEROSPAN", src: "/gallery/aerospan/VID-20260723-WA0065.mp4", type: "video" },
  // RC Car videos (3)
  { title: "RC Car Run", date: "Jul 2026", tag: "RC CAR", src: "/gallery/rccar/VID-20260723-WA0068.mp4", type: "video" },
  { title: "Speed Test", date: "Jul 2026", tag: "RC CAR", src: "/gallery/rccar/VID-20260723-WA0069.mp4", type: "video" },
  { title: "Track Testing", date: "Jul 2026", tag: "RC CAR", src: "/gallery/rccar/VID-20260723-WA0067.mp4", type: "video" },
];

const TILE_COUNT = galleryItems.length;

export default function GalleryTiltGrid() {
  const sceneRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Kill any stale ScrollTriggers from previous client-side navigation
    ScrollTrigger.getAll().forEach((st) => st.kill());

    const scene = sceneRef.current;
    const grid = gridRef.current;
    const intro = introRef.current;
    if (!scene || !grid || !intro) return;

    // Wait for DOM to fully settle after client-side navigation
    const rafId = requestAnimationFrame(() => {
      const timer = setTimeout(() => {
        const tiles = gsap.utils.toArray<HTMLElement>(".gallery-3d-wrapper", scene);

        // Initial state: grid deeply tilted and scaled down
        gsap.set(grid, {
          rotateX: 75,
          y: "45vh",
          scale: 0.35,
          transformOrigin: "50% 50%",
        });

        const master = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "+=3000",
            scrub: 1.2,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        // Fade out intro text
        master.to(intro, { opacity: 0, y: -20, duration: 0.1 }, 0);

        // Flatten grid to 0deg and scale up to full screen
        master.to(
          grid,
          {
            rotateX: 0,
            y: "0vh",
            scale: 1,
            ease: "power2.inOut",
            duration: 1,
          },
          0
        );

        // Scatter & rotate tiles
        master.from(
          tiles,
          {
            x: () => gsap.utils.random(-400, 400),
            y: () => gsap.utils.random(-400, 400),
            z: () => gsap.utils.random(-800, 400),
            rotateX: () => gsap.utils.random(-180, 180),
            rotateY: () => gsap.utils.random(-180, 180),
            rotateZ: () => gsap.utils.random(-90, 90),
            opacity: 0,
            ease: "power3.out",
            duration: 1,
            stagger: {
              amount: 0.25,
              from: "random",
            },
          },
          0
        );

        // Force recalculation after setup
        ScrollTrigger.refresh();

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", handleResize);

        // Store cleanup references
        (sceneRef as any)._cleanup = () => {
          window.removeEventListener("resize", handleResize);
          master.scrollTrigger?.kill();
          master.kill();
        };
      }, 100);

      (sceneRef as any)._timer = timer;
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout((sceneRef as any)._timer);
      (sceneRef as any)._cleanup?.();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative w-full">
      <section
        ref={sceneRef}
        className="relative w-screen h-screen flex justify-center items-center overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        {/* Intro text */}
        <div
          ref={introRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none w-full px-4"
        >
          <h1 
            className="m-0 font-extrabold tracking-[-0.02em] text-white uppercase font-syncopate mb-12"
            style={{ fontSize: "clamp(50px, 10vw, 130px)" }}
          >
            Gallery
          </h1>
          <p className="m-0 text-[11px] font-semibold tracking-[0.22em] leading-[1.5] text-neutral-500 uppercase font-syncopate">
            Scroll
            <br />
            to
            <br />
            Explore
          </p>
          <span className="block w-[1px] h-[50px] bg-neutral-700 mx-auto mt-[18px] origin-top" />
        </div>

        {/* Grid wrapper */}
        <div
          className="w-screen h-screen flex items-center justify-center"
          style={{
            perspective: "1500px",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            ref={gridRef}
            className="grid grid-cols-5 grid-rows-4 gap-1 w-screen h-screen"
            style={{ transformStyle: "preserve-3d" }}
          >
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className="gallery-3d-wrapper relative w-full h-full"
                style={{
                  willChange: "transform, opacity",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* The card itself that pops out on hover */}
                <div 
                  className="gallery-3d-tile relative w-full h-full overflow-hidden rounded-md group cursor-pointer transition-all duration-300 ease-out hover:scale-[1.15] hover:z-50 hover:shadow-[0_0_40px_rgba(220,38,38,0.3)]"
                >
                  {/* Photo/Video area */}
                  <div className="absolute inset-0 w-full h-full bg-neutral-900">
                    {item.type === "video" ? (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>

                  {/* Tag badge */}
                  <div className="absolute top-2 left-2 bg-red-600/90 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] text-white font-syncopate tracking-widest font-bold z-10 shadow-lg">
                    {item.tag}
                  </div>

                  {/* Bottom info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 z-10 pointer-events-none">
                    <p className="text-[11px] font-bold text-white font-inter leading-tight truncate">
                      {item.title}
                    </p>
                    <p className="text-[9px] text-white/50 font-mono mt-0.5">
                      {item.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
