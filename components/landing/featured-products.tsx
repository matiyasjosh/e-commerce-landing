"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Oversized Trench",
    price: "$890",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
  },
  {
    id: 2,
    name: "Sculptural Blazer",
    price: "$650",
    category: "Tailoring",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
  },
  {
    id: 3,
    name: "Draped Shirt",
    price: "$320",
    category: "Tops",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
  },
  {
    id: 4,
    name: "Wide Leg Trousers",
    price: "$420",
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export default function FeaturedProducts() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          className="flex items-end justify-between mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-sm uppercase tracking-hero text-muted-foreground mb-2">
              New Arrivals
            </p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-brand">
              Featured
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-sm uppercase tracking-wider hover:text-muted-foreground transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {products.map((product) => (
            <motion.article
              key={product.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-4 bg-muted aspect-[3/4]">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                <motion.button
                  className="absolute bottom-4 left-4 right-4 bg-primary text-primary-foreground py-3 uppercase tracking-wider text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Quick View
                </motion.button>
              </div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                {product.category}
              </p>
              <h3 className="text-lg uppercase tracking-wider mb-1">
                {product.name}
              </h3>
              <p className="text-muted-foreground">{product.price}</p>
            </motion.article>
          ))}
        </motion.div>

        <Link
          href="/shop"
          className="md:hidden flex items-center justify-center gap-2 text-sm uppercase tracking-wider hover:text-muted-foreground transition-colors mt-12 group"
        >
          View All Products
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
