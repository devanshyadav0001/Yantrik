"use client";

import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

const events = [
  {
    id: 1,
    title: "CAD & Design Workshop",
    date: "August 15, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Mechanical Lab, North Campus",
    type: "Session",
    description: "Introduction to Fusion 360 and mechanical design principles for beginners.",
  },
  {
    id: 2,
    title: "Junkyard Wars: Phase 1",
    date: "September 5, 2026",
    time: "9:00 AM - 6:00 PM",
    location: "OAK Hub",
    type: "Competition",
    description: "Build a functional mechanical contraption using only scrap materials provided on-site.",
  },
  {
    id: 3,
    title: "RC Nitro Car Racing",
    date: "October 12, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Main Ground",
    type: "Competition",
    description: "The annual RC racing event featuring custom-built IC engine cars.",
  },
  {
    id: 4,
    title: "Advanced Mechatronics",
    date: "November 2, 2026",
    time: "3:00 PM - 6:00 PM",
    location: "Robotics Lab",
    type: "Session",
    description: "Integrating microcontrollers with mechanical actuators for complex automation.",
  }
];

export default function Calendar() {
  return (
    <section id="calendar" className="py-24 bg-black relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-50" />
      <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-red-900/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-syncopate font-bold text-white uppercase tracking-tight mb-4">
            Annual <span className="text-red-600">Calendar</span>
          </h2>
          <p className="text-neutral-400 font-inter max-w-2xl text-lg">
            Track our upcoming sessions, workshops, and flagship competitions for the 2026-27 session.
          </p>
        </motion.div>

        <div className="relative border-l-2 border-red-900/50 pl-8 ml-4 md:ml-0 space-y-12">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-black border-2 border-red-600 group-hover:bg-red-600 transition-colors duration-300 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
              
              <div className="bg-neutral-950 border border-neutral-800 hover:border-red-900/50 p-6 rounded-lg transition-all duration-300 group-hover:shadow-[0_10px_30px_rgba(220,38,38,0.05)]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <div className="inline-block px-3 py-1 bg-red-950/30 text-red-500 text-xs font-syncopate uppercase tracking-wider rounded-full mb-3 border border-red-900/30">
                      {event.type}
                    </div>
                    <h3 className="text-2xl font-bold text-white font-inter">{event.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-red-500 font-mono bg-black/50 px-4 py-2 rounded border border-neutral-800">
                    <CalendarIcon size={16} />
                    <span>{event.date}</span>
                  </div>
                </div>
                
                <p className="text-neutral-400 font-inter mb-6">
                  {event.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-neutral-500 font-inter">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-red-700" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-red-700" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
