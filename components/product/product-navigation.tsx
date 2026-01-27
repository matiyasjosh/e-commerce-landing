"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function ProductNavigation({ onPrev, onNext }: ProductNavigationProps) {
  return (
    <>
      {/* Left Arrow */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30">
        <motion.button
          onClick={onPrev}
          className="bg-[#E2FF58] p-7 transition-colors duration-200 shadow-lg opacity-70 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous product"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </motion.button>
      </div>

      {/* Right Arrow */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30">
        <motion.button
          onClick={onNext}
          className="bg-[#E2FF58] p-7 transition-colors duration-200 shadow-lg opacity-70 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next product"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </motion.button>
      </div>
    </>
  );
}
