"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SectionBackground from "@/components/SectionBackground";

export default function CalendarPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".month-card", containerRef.current);
    
    // Set initial states for cards (Card 0 is visible, rest are hidden at the bottom)
    gsap.set(cards, { 
      y: (i) => i === 0 ? 0 : window.innerHeight,
      rotateX: (i) => i === 0 ? 0 : 45,
      opacity: (i) => i === 0 ? 1 : 0,
      transformOrigin: "center top"
    });

    // Create a scrubbed master timeline for the pinning effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.calendar-section',
        start: 'center center',
        // By multiplying length by 500px, the scroll is very short and quick, minimizing effort
        end: () => "+=" + (cards.length * 500),
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // Animate each card stacking on top of the previous one
    cards.forEach((card, i) => {
      if (i === 0) return; // Skip the first card as it's already in place

      // 1. Push all previously stacked cards backwards and scale them down
      tl.to(cards.slice(0, i), {
        scale: (index) => 1 - ((i - index) * 0.05), // Shrink slightly
        y: (index) => -((i - index) * 35),          // Move up slightly
        opacity: (index) => 1 - ((i - index) * 0.25), // Dim slightly
        duration: 1,
        ease: "power2.inOut"
      }, i); // Use 'i' to sync animations

      // 2. Fly the new card up from the bottom
      tl.to(card, {
        y: 0,
        rotateX: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, i - 0.2); // Overlap slightly with the push-back animation
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <SectionBackground>
      <div ref={containerRef} className="relative w-full min-h-screen text-white pt-28">
        <style dangerouslySetInnerHTML={{__html: `
          .card-content::-webkit-scrollbar {
            width: 6px;
          }
          .card-content::-webkit-scrollbar-thumb {
            background: #222;
            border-radius: 10px;
          }
        `}} />
        
        {/* Header */}
        <header className="flex flex-col justify-center items-center text-center px-6 h-[25vh]">
          <h1 className="text-4xl md:text-6xl uppercase tracking-[2px] text-white font-syncopate mb-2 font-extrabold" style={{ textShadow: "0 0 20px rgba(230, 57, 70, 0.4)" }}>
            Yantrik <span className="text-red-600">Calendar</span>
          </h1>
          <p className="text-lg text-neutral-400 tracking-[0.1em] uppercase font-inter">
            2026 - 2027 Events Overview
          </p>
        </header>

        {/* Stacking Cards Container */}
        <section className="calendar-section h-screen w-full flex justify-center items-center overflow-hidden" style={{ perspective: "1500px" }}>
          <div className="cards-wrapper relative w-full max-w-[900px] h-[70vh] flex justify-center items-center" style={{ transformStyle: "preserve-3d" }}>
            
            {/* Card 1: August */}
            <div className="month-card absolute w-[90%] h-full max-h-[600px] bg-[#0d0d0d] border border-[#222] border-t-[3px] border-t-red-600 rounded-2xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col max-md:h-[80vh] max-md:max-h-none" style={{ willChange: "transform, opacity" }}>
              <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none rounded-t-2xl" />
              <div className="month-header flex justify-between items-end mb-8 border-b border-[#222] pb-4">
                <h2 className="m-0 text-2xl md:text-4xl text-red-600 tracking-tight uppercase font-syncopate font-bold">August 2026</h2>
              </div>
              <div className="card-content grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto pr-2" style={{ gridTemplateColumns: '1fr' }}>
                <div className="event-section">
                  <h3 className="text-xs text-white uppercase tracking-[2px] mt-0 mb-4 inline-block bg-red-600 px-3 py-1 rounded font-syncopate font-bold">Sessions</h3>
                  <ul className="list-none p-0 m-0">
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">TIP Session (Nirmaan)</strong>
                      Introduction to CAD, 2D CAD and AutoCAD with Yantrik members assisting.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">TIP Sequel (SolidWorks)</strong>
                      An introductory 3D modeling workshop to equip freshers with engineering design skills.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">TIP Sequel (SAE)</strong>
                      Introduction to simulations and hands-on experience with AnSYS.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2: September */}
            <div className="month-card absolute w-[90%] h-full max-h-[600px] bg-[#0d0d0d] border border-[#222] border-t-[3px] border-t-red-600 rounded-2xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col max-md:h-[80vh] max-md:max-h-none" style={{ willChange: "transform, opacity" }}>
              <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none rounded-t-2xl" />
              <div className="month-header flex justify-between items-end mb-8 border-b border-[#222] pb-4">
                <h2 className="m-0 text-2xl md:text-4xl text-red-600 tracking-tight uppercase font-syncopate font-bold">September 2026</h2>
              </div>
              <div className="card-content grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto pr-2">
                <div className="event-section">
                  <h3 className="text-xs text-white uppercase tracking-[2px] mt-0 mb-4 inline-block bg-red-600 px-3 py-1 rounded font-syncopate font-bold">Sessions</h3>
                  <ul className="list-none p-0 m-0">
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">The Sixth Sense</strong>
                      Exploring the fundamentals of sensors in electronics and robotics.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Water Rocket Intro</strong>
                      Outlining rules, criteria, and engineering principles for the Water Rocket Competition.
                    </li>
                  </ul>
                </div>
                <div className="event-section">
                  <h3 className="text-xs text-white uppercase tracking-[2px] mt-0 mb-4 inline-block bg-red-600 px-3 py-1 rounded font-syncopate font-bold">Competitions</h3>
                  <ul className="list-none p-0 m-0">
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Project Trishakti Recruitment</strong>
                      Recruiting freshers for the Battle Bot (Ashwatthama) team.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Project Varuna</strong>
                      Water Rocket competition at IIT Mandi applying aerodynamics principles.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 3: October */}
            <div className="month-card absolute w-[90%] h-full max-h-[600px] bg-[#0d0d0d] border border-[#222] border-t-[3px] border-t-red-600 rounded-2xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col max-md:h-[80vh] max-md:max-h-none" style={{ willChange: "transform, opacity" }}>
              <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none rounded-t-2xl" />
              <div className="month-header flex justify-between items-end mb-8 border-b border-[#222] pb-4">
                <h2 className="m-0 text-2xl md:text-4xl text-red-600 tracking-tight uppercase font-syncopate font-bold">October 2026</h2>
              </div>
              <div className="card-content grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto pr-2">
                <div className="event-section">
                  <h3 className="text-xs text-white uppercase tracking-[2px] mt-0 mb-4 inline-block bg-red-600 px-3 py-1 rounded font-syncopate font-bold">Sessions</h3>
                  <ul className="list-none p-0 m-0">
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">What's UP?</strong>
                      A mystery-themed interactive session featuring aviation trivia and aeromodelling.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Beyond the Wings</strong>
                      A beginner-friendly introduction to aircraft design, airfoils, and stability.
                    </li>
                  </ul>
                </div>
                <div className="event-section">
                  <h3 className="text-xs text-white uppercase tracking-[2px] mt-0 mb-4 inline-block bg-red-600 px-3 py-1 rounded font-syncopate font-bold">Competitions</h3>
                  <ul className="list-none p-0 m-0">
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Project Y Recruitment</strong>
                      Interdisciplinary engineering projects (Gripper Bot, RC Boat, SafeTronics) for Techfest.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Project Trishakti Recruitment</strong>
                      RC Car (Vajra) and RC Plane (Garuda) teams.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 4: Nov & Dec */}
            <div className="month-card absolute w-[90%] h-full max-h-[600px] bg-[#0d0d0d] border border-[#222] border-t-[3px] border-t-red-600 rounded-2xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col max-md:h-[80vh] max-md:max-h-none" style={{ willChange: "transform, opacity" }}>
              <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none rounded-t-2xl" />
              <div className="month-header flex justify-between items-end mb-8 border-b border-[#222] pb-4">
                <h2 className="m-0 text-2xl md:text-4xl text-red-600 tracking-tight uppercase font-syncopate font-bold">Nov - Dec 2026</h2>
              </div>
              <div className="card-content grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto pr-2">
                <div className="event-section">
                  <h3 className="text-xs text-white uppercase tracking-[2px] mt-0 mb-4 inline-block bg-red-600 px-3 py-1 rounded font-syncopate font-bold">November</h3>
                  <ul className="list-none p-0 m-0">
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Full Throttle Session</strong>
                      Intro to electric motors, ESCs, and gearboxes.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Robowars (BITS Hyderabad)</strong>
                      Battle Bot competition.
                    </li>
                  </ul>
                </div>
                <div className="event-section">
                  <h3 className="text-xs text-white uppercase tracking-[2px] mt-0 mb-4 inline-block bg-red-600 px-3 py-1 rounded font-syncopate font-bold">December (IIT Bombay)</h3>
                  <ul className="list-none p-0 m-0">
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">International Full Throttle</strong> RC Car competition.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">International Robowars</strong> Battle Bot competition.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Cozmoclench Wildcard</strong> Gripper Bot competition navigating specific zones.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Rowboatics & Safe Tronics</strong> RC Boat and real-world safety design events.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 5: Jan, Feb & March */}
            <div className="month-card absolute w-[90%] h-full max-h-[600px] bg-[#0d0d0d] border border-[#222] border-t-[3px] border-t-red-600 rounded-2xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col max-md:h-[80vh] max-md:max-h-none" style={{ willChange: "transform, opacity" }}>
              <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none rounded-t-2xl" />
              <div className="month-header flex justify-between items-end mb-8 border-b border-[#222] pb-4">
                <h2 className="m-0 text-2xl md:text-4xl text-red-600 tracking-tight uppercase font-syncopate font-bold">Jan - Mar 2027</h2>
              </div>
              <div className="card-content grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto pr-2">
                <div className="event-section">
                  <h3 className="text-xs text-white uppercase tracking-[2px] mt-0 mb-4 inline-block bg-red-600 px-3 py-1 rounded font-syncopate font-bold">January</h3>
                  <ul className="list-none p-0 m-0">
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Think Like Yantrik Session</strong>
                      A structured approach to solving engineering problem statements.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Utkarsh 2027</strong>
                      Hill Climb Racing (RC Car) at IIT Mandi.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Laws of Motion</strong>
                      RC Plane competition at IIT Kharagpur.
                    </li>
                  </ul>
                </div>
                <div className="event-section">
                  <h3 className="text-xs text-white uppercase tracking-[2px] mt-0 mb-4 inline-block bg-red-600 px-3 py-1 rounded font-syncopate font-bold">February & March</h3>
                  <ul className="list-none p-0 m-0">
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">3D-thon</strong>
                      Fast-paced SolidWorks part building competition.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">Xpecto 2027 (IIT Mandi)</strong>
                      Aerospan, RoboWars, and Fast & Curious.
                    </li>
                    <li className="text-sm text-neutral-400 leading-relaxed mb-4 pl-5 relative font-inter">
                      <span className="absolute left-0 top-[2px] text-[0.6rem] text-red-600">■</span>
                      <strong className="text-white block mb-1 font-bold">IIT Kanpur Competitions</strong>
                      Grand Prix (RC Car) & SkySparks (RC Plane).
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        <div className="h-[30vh] flex justify-center items-center text-neutral-500 text-sm uppercase tracking-[2px] font-syncopate z-10 relative">
          — Scroll past to continue —
        </div>

      </div>
    </SectionBackground>
  );
}
