'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Product {
  images: Array<{ url: string }>;
}

interface ProductImagesProps {
  product: Product;
  currentProduct: number;
}

export default function ProductImages({ product, currentProduct }: ProductImagesProps) {
  return (
    <>
      {/* Left Product Image */}
      <div className="absolute left-0 top-0 h-full w-1/4 flex items-center justify-center transform -translate-x-1/2 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`left-${currentProduct}`}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src={product.images[0]?.url || "/placeholder.svg"}
              alt="Product Left View"
              width={700}
              height={600}
              className="h-[600px] w-auto object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Product Image */}
      <div className="absolute right-0 top-0 h-full w-1/4 flex items-center justify-center transform translate-x-1/2 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`right-${currentProduct}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src={product.images[2]?.url || "/placeholder.svg"}
              alt="Product Right View"
              width={900}
              height={500}
              className="h-[600px] w-auto object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Center Product Image */}
      <div className="absolute right-0.5 left-0.5 top-0 bottom-6 col-span-4 flex justify-center z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`center-${currentProduct}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
          >
            <Image
              src={product.images[1]?.url || "/placeholder.svg"}
              alt="Product Center View"
              width={900}
              height={900}
              className="h-[850px] max-w-full object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
