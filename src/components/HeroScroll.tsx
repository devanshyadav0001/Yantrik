"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const HeroScroll = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = 547;
    const currentFrame = (index: number) => 
      `/frames/frame_${index.toString().padStart(5, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
          initScrollAnimation();
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
          initScrollAnimation();
        }
      };
      images.push(img);
    }

    const render = (index: number) => {
      if (images[index]) {
        const img = images[index];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, drawX, drawY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          drawX = 0;
          drawY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          drawX = (canvas.width - drawWidth) / 2;
          drawY = 0;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      }
    };

    const initScrollAnimation = () => {
      render(0);

      // Use scroll event to map scroll position to frame index
      // The video plays across the entire document scroll
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        
        // Subtract an extra window.innerHeight to account for the 100vh spacer at the bottom of page.tsx.
        // This ensures the video frames map perfectly to the HomeContent sections at their original speeds.
        const docHeight = document.documentElement.scrollHeight - (window.innerHeight * 2);
        
        const scrollFraction = Math.max(0, Math.min(scrollTop / docHeight, 1));
        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(scrollFraction * frameCount)
        );
        render(frameIndex);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Store cleanup reference
      (canvas as any)._scrollCleanup = () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if ((canvas as any)._scrollCleanup) {
        (canvas as any)._scrollCleanup();
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* Loading State - only visible before images load */}
      {!imagesLoaded && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-[60] bg-black">
          <div className="text-red-600 font-syncopate text-2xl mb-4 animate-pulse">Initializing Systems</div>
          <div className="w-64 h-2 bg-neutral-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-600 transition-all duration-300" 
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Fixed Canvas - stays behind everything */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      />

      {/* Bottom-right watermark cover (Yantrik Logo over the Gemini sparkle) */}
      <div className="fixed bottom-[-4px] right-[68px] w-36 h-36 bg-[radial-gradient(circle_closest-side,rgba(0,0,0,1)_40%,rgba(0,0,0,0)_75%)] pointer-events-none z-[1] flex items-center justify-center">
        <img src="/assets/yantrik.png" alt="Yantrik Watermark" className="w-24 h-24 object-contain" />
      </div>
    </>
  );
};

export default HeroScroll;
