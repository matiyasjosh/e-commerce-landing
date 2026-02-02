"use client";

import { addToCart } from "@/lib/actions/cart-actions";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ChevronRight } from "lucide-react";

interface QuantitySelectorProps {
  productId: number;
  quantity: number;
  setQuantity: (quantity: number) => void;
  price: string;
  currentProduct: number;
}

async function handleBuy(productId: number) {
  await addToCart(productId);
}

export default function QuantitySelector({
  productId,
  quantity,
  setQuantity,
  price,
  currentProduct,
}: QuantitySelectorProps) {
  return (
    <>
      <div className="bg-black text-white p-3 w-full">
        <div className="flex items-center justify-around">
          <span className="text-sm font-medium">SIZE</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-[#E2FF58] hover:text-lime-300 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 cursor-pointer" />
            </button>
            <span className="text-[#E2FF58] font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-[#E2FF58] hover:text-lime-300 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>

      {/* Buy Button */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`price-${currentProduct}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-[#E2FF58] transition-colors duration-200 cursor-pointer group opacity-50 h-24"
        >
          <div className="flex items-center justify-around p-4 pt-8 cursor-pointer">
            <button onClick={() => handleBuy(productId)}>
              <span className="text-black font-bold text-sm">
                BUY NOW |
              </span>
              <span className="text-black font-bold text-lg ml-2">
                {price}
              </span>
            </button>
            <ChevronRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
