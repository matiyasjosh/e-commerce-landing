"use client";

import { motion } from "framer-motion";

const items = [
  "Free Shipping Worldwide",
  "•",
  "New Collection Available",
  "•",
  "Sustainable Fashion",
  "•",
  "Made in Europe",
  "•",
];

export default function Marquee() {
  return (
    <div className="bg-[#D4FF00] text-black/80 py-3 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span key={index} className="mx-8 text-sm uppercase tracking-wider font-medium">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
