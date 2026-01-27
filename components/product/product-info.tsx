'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Black_Ops_One, Overpass } from "next/font/google";

const overpass = Overpass({ subsets: ["latin"] });
const blackOpsOne = Black_Ops_One({ subsets: ["latin"], weight: "400" });

interface Product {
  name: string;
  brandDesc1: string;
}

interface ProductInfoProps {
  product: Product;
  currentProduct: number;
}

export default function ProductInfo({ product, currentProduct }: ProductInfoProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`title-${currentProduct}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <div className="px-1 py-2">
          <h1
            className={`w-full px-2 text-[25px] font-bold text-white bg-black ${blackOpsOne.className}`}
          >
            {product.name}
          </h1>
          <div className="relative w-full h-80 text-black bg-[#E2FF58] z-30">
            <p className="absolute top-1/9 left-10/14 transform rotate-90 origin-left text-md font-extrabold whitespace-nowrap mx-auto my-auto">
              {product.brandDesc1}
            </p>
            <p
              className={`absolute top-1/9 left-10/20 transform rotate-90 origin-left text-sm whitespace-nowrap ${overpass.className}`}
            >
              COMPLETE LOOK COLLECTION
            </p>
            <p
              className={`absolute top-1/9 left-10/30 transform rotate-90 origin-left text-sm whitespace-nowrap ${overpass.className}`}
            >
              ORGANIC COTTON BLEND
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
