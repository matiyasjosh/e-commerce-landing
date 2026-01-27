'use client';

import { motion, AnimatePresence } from "framer-motion";

interface ProductDescriptionProps {
  shortDescription: string;
  currentProduct: number;
}

export default function ProductDescription({ shortDescription, currentProduct }: ProductDescriptionProps) {
  return (
    <div className="absolute left-10/16 top-10/23 w-32 transform -translate-y-1/12 z-30">
      <AnimatePresence mode="wait">
        <motion.p
          key={`desc-${currentProduct}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-sm text-gray-600"
        >
          {shortDescription}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
