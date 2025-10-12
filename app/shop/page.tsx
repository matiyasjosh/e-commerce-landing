"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ShoppingBag,
  Plus,
  Minus,
} from "lucide-react";
import Image from "next/image";
import { Oswald } from "next/font/google";
import { Black_Ops_One } from "next/font/google";
import { Michroma } from "next/font/google";
import { Smooch_Sans } from "next/font/google";
import { Overpass } from "next/font/google";

const overpass = Overpass({
  subsets: ["latin"],
})
const smoosh = Smooch_Sans({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({ subsets: ["latin"] });
const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: "400"
});
const michroma = Michroma({ subsets: ["latin"], weight: "400" });

const products = [
  {
    id: 1,
    name: "DEMOBAZA",
    subtitle: "SHELL HOOD WORLD",
    description: "choosing an antiaging eye cream",
    price: "113,53 €",
    leftImage: "/images/DEMOBAZA_1.png",
    rightImage: "/images/demobaza_2.png",
    centerImage: "/images/center_demobazit_2.png",
  },
  {
    id: 2,
    name: "VALENTINO",
    subtitle: "CYBER JACKET PRO",
    description: "advanced protection technology",
    price: "189,99 €",
    leftImage: "/images/demobaza_4.png",
    rightImage: "/images/demobaza_3.png",
    centerImage: "/images/center_demobazit.png",
  },
  {
    id: 3,
    name: "BALENCIAGA",
    subtitle: "FUTURE COAT ELITE",
    description: "sustainable fashion innovation",
    price: "245,00 €",
    leftImage: "/images/OVER-COAT.png",
    rightImage: "/images/demobazit_1.png",
    centerImage: "/images/demobazit_center.png",
  },
];

export default function Component() {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
  };

  const product = products[currentProduct];

  return (
    <div className="min-h-screen relative bg-white overflow-hidden overflow-x-hidden">
      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold transform -skew-x-12 text-black px-3 py-1">
            ⚡
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center text-gray-400 text-sm space-x-1 cursor-pointer hover:text-gray-600">
              <span className="font-medium">WOMAN</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="flex items-center text-gray-400 text-sm space-x-1 cursor-pointer hover:text-gray-600">
              <span className="font-medium">MAN</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm cursor-pointer hover:text-gray-600">
              <span className="font-medium">COLLECTIONS</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </nav>
        </div>
        <div className="flex items-center space-x-6">
          <span className="cursor-pointer text-gray-400 text-sm hover:text-gray-600">
            Blog
          </span>
          <span className="cursor-pointer text-gray-400 text-sm hover:text-gray-600">
            About Us
          </span>
          <span className="cursor-pointer text-gray-400 text-sm hover:text-gray-600">
            Contact
          </span>
          <Search className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-600" />
          <ShoppingBag className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-600" />
        </div>
      </header>

      {/* Main Content */}
      <div className="relative h-screen flex items-center">
        {/* Center Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
          <div className="bg-gray-300 relative h-[480px]">
            <div className="grid grid-cols-12 gap-8 items-center p-8">
              {/* Product Info */}
              <div className="col-span-2 absolute left-1/6 top-1/2 transform -translate-y-10/13">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`title-${currentProduct}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                  <div className="px-1 py-2">
                      <h1 className={`w-full px-2 text-[25px] font-bold text-white bg-black ${blackOpsOne.className}`}>
                        {product.name}
                      </h1>
                        <div className="relative w-full h-80 text-black bg-[#E2FF58] z-30">
                          <p className="absolute top-1/9 left-10/14 transform rotate-90 origin-left text-md font-extrabold whitespace-nowrap mx-auto my-auto">
                            SHELL HOOD WORLD
                          </p>
                          <p className={`absolute top-1/9 left-10/20 transform rotate-90 origin-left text-sm whitespace-nowrap ${overpass.className}`}>
                            COMPLETE LOOK COLLECTION
                          </p>
                          <p className={`absolute top-1/9 left-10/30 transform rotate-90 origin-left text-sm whitespace-nowrap ${overpass.className}`}>
                            ORGANIC COTTON BLEND
                          </p>
                        </div>
                  </div> 
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Empty space for center image */}
              <div className="col-span-4"></div>

              {/* Product Description */}
              <div className="col-span-5">
                <div className="space-y-4">
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
                        {product.description}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Size Selector */}
                  <div className="absolute left-10/16 top-10/11 transform -translate-y-1/12 z-30 w-80">
                    <div className="bg-black text-white p-3 w-full">
                      <div className="flex items-center justify-around">
                        <span className="text-sm font-medium">SIZE</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                            className="text-[#E2FF58] hover:text-lime-300 transition-colors"
                          >
                            <Minus className="w-4 h-4 cursor-pointer" />
                          </button>
                          <span className="text-[#E2FF58] font-medium">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="text-[#E2FF58] hover:text-lime-300 transition-colors"
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
                        <div className="flex items-center justify-around p-4 pt-8">
                          <div>
                            <span className="text-black font-bold text-sm">
                              BUY NOW |
                            </span>
                            <span className="text-black font-bold text-lg ml-2">
                              {product.price}
                            </span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Arrow - positioned at the left edge of gray container */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30">
              <motion.button
                onClick={prevProduct}
                className="bg-[#E2FF58] p-7 transition-colors duration-200 shadow-lg opacity-70 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </motion.button>
            </div>

            {/* Right Arrow - positioned at the right edge of gray container */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30">
              <motion.button
                onClick={nextProduct}
                className="bg-[#E2FF58] p-7 transition-colors duration-200 shadow-lg opacity-70 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </motion.button>
            </div>
          </div>

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
                  src={product.leftImage || "/sansa.png"}
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
                  src={product.rightImage || "/sansa.png"}
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
                  src={product.centerImage || "/sansa.png"}
                  alt="Product Center View"
                  width={900}
                  height={900}
                  className="h-[850px] max-w-full object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Social Icons */}
        <div className="absolute bottom-8 right-8 space-y-4">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
            <span className="text-xs font-bold">f</span>
          </div>
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
            <span className="text-xs font-bold">@</span>
          </div>
        </div>
      </div>
    </div>
  );
}
