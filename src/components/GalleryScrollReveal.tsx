"use client";

import { useEffect, useRef, useState } from "react";
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
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

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

  // Hover handlers for videos
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) video.play().catch(() => {});
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

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
                {/* The card — click to open lightbox */}
                <div 
                  className="gallery-3d-tile relative w-full h-full overflow-hidden rounded-md group cursor-pointer transition-all duration-300 ease-out hover:scale-[1.15] hover:z-50 hover:shadow-[0_0_40px_rgba(220,38,38,0.3)]"
                  onClick={() => setLightbox(item)}
                  onMouseEnter={item.type === "video" ? handleMouseEnter : undefined}
                  onMouseLeave={item.type === "video" ? handleMouseLeave : undefined}
                >
                  {/* Photo/Video area */}
                  <div className="absolute inset-0 w-full h-full bg-neutral-900">
                    {item.type === "video" ? (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
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

                  {/* Video play icon badge (top-right corner) */}
                  {item.type === "video" && (
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full w-6 h-6 flex items-center justify-center z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}

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

      {/* ─── Lightbox Modal ─── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light z-10 transition-colors"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>

          {/* Title */}
          <div className="absolute top-6 left-6 z-10">
            <span className="bg-red-600/90 px-3 py-1 rounded text-[10px] text-white font-syncopate tracking-widest font-bold">
              {lightbox.tag}
            </span>
            <h3 className="text-white font-inter font-bold text-lg mt-2">{lightbox.title}</h3>
            <p className="text-white/50 font-mono text-xs">{lightbox.date}</p>
          </div>

          {/* Media */}
          <div
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.type === "video" ? (
              <video
                src={lightbox.src}
                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
