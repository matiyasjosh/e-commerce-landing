"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop"
                alt="DEMOBAZA atelier"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#D4FF00]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </motion.div>

          <motion.div
            className="lg:pl-8"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-sm uppercase tracking-hero text-gray-500 mb-4">
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-brand mb-8">
              Redefining Contemporary Fashion
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                DEMOBAZA was born from a vision to challenge conventional fashion norms. 
                We create garments that blur the line between art and wearable design, 
                drawing inspiration from architecture, nature, and human movement.
              </p>
              <p className="text-lg leading-relaxed">
                Each piece is crafted with meticulous attention to detail, using sustainable 
                materials and ethical production methods. Our collections are designed for 
                those who dare to express their individuality.
              </p>
            </div>
            <div className="mt-10">
              <Link href="/about">
                <Button>
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
