"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const collections = [
  {
    id: 1,
    title: "Woman",
    description: "Explore the new season",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop",
  },
  {
    id: 2,
    title: "Man",
    description: "Contemporary essentials",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=1000&fit=crop",
  },
];

export default function Collections() {
  return (
    <section className="py-24 px-4 bg-[#ebede2]">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-hero text-muted-foreground mb-2">
            Discover
          </p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-brand">
            Collections
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link href={`/collections/${collection.title.toLowerCase()}`} className="group block">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      className="flex items-end justify-between"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.2 }}
                    >
                      <div>
                        <p className="text-sm uppercase tracking-hero text-white mb-2">
                          {collection.description}
                        </p>
                        <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-brand text-white">
                          {collection.title}
                        </h3>
                      </div>
                      <div className="w-12 h-12 border-2 border-background text-background flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-colors duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
