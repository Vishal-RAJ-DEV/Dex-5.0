import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const timelineItems = [
  {
    title: "Planted the Seed",
    description: "Started exploring coding.",
    year: "2021",
    details: "Began with HTML, CSS and basic JavaScript in my green-hued dev garden.",
  },
  {
    title: "Built First App",
    description: "Made a to-do list app.",
    year: "2022",
    details: "Learned React and made my first productive tool.",
  },
  {
    title: "Green Stack Mastery",
    description: "Conquered the MERN stack.",
    year: "2023",
    details: "Mongo, Express, React, Node — my coding jungle.",
  },
  {
    title: "DevSync Release",
    description: "Launched networking platform.",
    year: "2024",
    details: "Built with love, collaboration, and lots of coffee.",
  },
];

export default function GreenRopeTimeline() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  return (
    <div className="relative min-h-screen px-8 py-16 text-white bg-gradient-to-br from-[#0a0f0a] via-[#0f2914] to-[#11361b] overflow-hidden">
      {/* Background Texture */}
      <div
        className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/green-fibers.png')] opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />

      {/* Glowing Timeline Rope */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1.5 h-full z-10">
        <div className="absolute w-full h-full bg-green-400 animate-pulse shadow-[0_0_20px_5px_#22c55e]" />
        <div className="absolute w-4 h-4 rounded-full bg-lime-400 shadow-lg animate-star-fall" />
      </div>

      {/* Timeline Events as Hanging Pages */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {timelineItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className={`relative w-64 bg-[#163d23]/90 border border-green-700 shadow-[0_4px_15px_#166534] p-6 rounded-xl mb-32 ${
              index % 2 === 0 ? "ml-auto -mr-40 text-right" : "mr-auto -ml-40 text-left"
            }`}
            onClick={() => openModal(item)}
          >
            {/* "String" connecting to rope */}
            <div
              className={`absolute top-0 w-0.5 h-10 bg-lime-500 ${
                index % 2 === 0 ? "-right-3" : "-left-3"
              }`}
            />
            <div
              className={`absolute top-10 w-4 h-4 bg-lime-300 rounded-full shadow-md ${
                index % 2 === 0 ? "-right-5" : "-left-5"
              }`}
            />
            <h3 className="text-xl font-bold text-lime-300">{item.title}</h3>
            <p className="text-sm text-green-100">{item.description}</p>
            <span className="text-xs text-green-400">{item.year}</span>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-gray-900 max-w-md w-full p-6 rounded-2xl shadow-2xl relative"
              initial={{ scale: 0.8, y: -30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-gray-900"
                onClick={closeModal}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-green-700 mb-2">{selectedItem.title}</h2>
              <p className="text-green-600 mb-4">{selectedItem.year}</p>
              <p className="text-gray-800">{selectedItem.details}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes starFall {
          0% { top: 0; opacity: 0; transform: scale(0.7); }
          10% { opacity: 1; }
          90% { opacity: 1; transform: scale(1.1); }
          100% { top: 100%; opacity: 0; transform: scale(0.6); }
        }

        .animate-star-fall {
          animation: starFall 5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
