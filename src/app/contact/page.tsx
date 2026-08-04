"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import SectionBackground from "@/components/SectionBackground";
import MagicBento from "@/components/MagicBento";

const contactCards = [
  {
    color: "#0a0a0a",
    title: "yantrik@iitmandi.ac.in",
    description: "Drop us a mail for queries, sponsorships, or collaborations.",
    label: "Email",
  },
  {
    color: "#0a0a0a",
    title: "IIT Mandi, Kamand Campus",
    description: "Himachal Pradesh 175075, India",
    label: "Location",
  },
  {
    color: "#0a0a0a",
    title: "Instagram / LinkedIn / GitHub",
    description: "Follow us on social media for updates and behind-the-scenes content.",
    label: "Social",
  },
  {
    color: "#0a0a0a",
    title: "Mon – Sat, 10 AM – 8 PM",
    description: "We're usually in the workshop. Come say hello!",
    label: "Hours",
  },
  {
    color: "#0a0a0a",
    title: "Open to Sponsorships",
    description: "We're always looking for industry partners to fuel our next build.",
    label: "Sponsors",
  },
  {
    color: "#0a0a0a",
    title: "Join Yantrik",
    description: "Recruitment opens at the start of every semester. Stay tuned!",
    label: "Recruitment",
  },
];

export default function ContactPage() {
  return (
    <SectionBackground>
      <section className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 className="font-syncopate text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest text-white">
              Contact <span className="text-red-600">Us</span>
            </h1>
            <p className="mt-4 font-inter text-neutral-400 max-w-2xl mx-auto">
              Have a question, project idea, or want to collaborate? Reach out to
              Yantrik — we&apos;d love to hear from you.
            </p>
            <motion.div
              className="mt-8 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* MagicBento Info Cards */}
          <div className="flex justify-center mb-20">
            <MagicBento
              cardData={contactCards}
              textAutoHide={false}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="220, 38, 38"
            />
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-syncopate font-bold text-2xl text-white uppercase tracking-widest text-center mb-8">
              Send a <span className="text-red-600">Message</span>
            </h2>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-neutral-950/80 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 flex flex-col gap-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="font-syncopate text-xs uppercase tracking-widest text-neutral-400 mb-2 block"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-neutral-900/50 border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg px-4 py-3 font-inter outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-syncopate text-xs uppercase tracking-widest text-neutral-400 mb-2 block"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-neutral-900/50 border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg px-4 py-3 font-inter outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="font-syncopate text-xs uppercase tracking-widest text-neutral-400 mb-2 block"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="What's this about?"
                  className="w-full bg-neutral-900/50 border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg px-4 py-3 font-inter outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-syncopate text-xs uppercase tracking-widest text-neutral-400 mb-2 block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us more..."
                  className="w-full bg-neutral-900/50 border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg px-4 py-3 font-inter outline-none transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-target mt-2 bg-red-600 hover:bg-red-700 text-white font-syncopate uppercase tracking-widest py-3 px-8 rounded-lg flex items-center justify-center gap-3 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </SectionBackground>
  );
}
