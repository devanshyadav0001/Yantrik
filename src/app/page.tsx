import HeroScroll from "@/components/HeroScroll";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  return (
    <>
      {/* Fixed video canvas background — plays through entire page scroll */}
      <HeroScroll />

      {/* All content scrolls OVER the fixed video */}
      <div className="relative z-10">
        {/* Spacer — gives room to scroll through the video before content appears */}
        <div className="h-[200vh]" />

        {/* Main content sections */}
        <HomeContent />
      </div>
    </>
  );
}
