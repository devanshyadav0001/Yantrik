"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer 
      className={`w-full bg-black border-t border-red-900/30 pt-16 pb-8 px-6 md:px-12 overflow-hidden ${
        isHome ? "relative z-20" : "fixed bottom-0 left-0 z-[5]"
      }`}
    >
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-start">
            <Link href="/" className="cursor-target relative w-32 h-10 mb-6">
              <Image
                src="/assets/yantrik.png"
                alt="Yantrik Logo"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-neutral-400 text-sm font-inter leading-relaxed mb-6">
              The official mechanical and multidisciplinary engineering student club of the Science and Technology Council at IIT Mandi.
            </p>
            <div className="flex items-center gap-4 text-xs font-syncopate uppercase tracking-wider">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="cursor-target text-neutral-400 hover:text-red-500 transition-colors">
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="cursor-target text-neutral-400 hover:text-red-500 transition-colors">
                Facebook
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="cursor-target text-neutral-400 hover:text-red-500 transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="cursor-target text-neutral-400 hover:text-red-500 transition-colors">
                GitHub
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-syncopate font-bold text-white uppercase tracking-widest mb-6">Explore</h3>
            <ul className="flex flex-col gap-3 font-inter text-sm">
              <li>
                <Link href="/projects" className="cursor-target text-neutral-400 hover:text-red-500 transition-colors">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="cursor-target text-neutral-400 hover:text-red-500 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/team" className="cursor-target text-neutral-400 hover:text-red-500 transition-colors">
                  The Team
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="cursor-target text-neutral-400 hover:text-red-500 transition-colors">
                  Event Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-syncopate font-bold text-white uppercase tracking-widest mb-6">Get in Touch</h3>
            <ul className="flex flex-col gap-4 font-inter text-sm">
              <li className="flex items-start gap-3 text-neutral-400">
                <Mail className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <a href="mailto:yantrik@iitmandi.ac.in" className="cursor-target hover:text-red-500 transition-colors">
                  yantrik@iitmandi.ac.in
                </a>
              </li>
              <li className="flex items-start gap-3 text-neutral-400">
                <MapPin className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span>
                  Indian Institute of Technology Mandi<br />
                  Kamand Campus, VPO Kamand<br />
                  Distt. Mandi, Himachal Pradesh - 175075
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-900/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-xs font-inter text-center md:text-left">
            &copy; {currentYear} Yantrik Club, IIT Mandi. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-neutral-500 font-inter">
            <Link href="#" className="cursor-target hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="cursor-target hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Decorative mechanical gear element in background */}
      <div className="absolute -bottom-24 -right-24 text-[200px] text-red-900/[0.03] pointer-events-none select-none z-0 rotate-45">
        ⚙
      </div>
    </footer>
  );
}
