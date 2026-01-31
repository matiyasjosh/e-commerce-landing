"use client";

import React from "react"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-24 px-4 bg-black/10 text-black/80">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-hero text-background/60 mb-4">
            Stay Updated
          </p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-brand mb-6">
            Join the Movement
          </h2>
          <p className="text-lg text-background/80 mb-10 max-w-xl mx-auto">
            Subscribe to receive exclusive access to new collections, 
            special offers, and behind-the-scenes content.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-transparent border-2 border-background/30 text-background placeholder:text-background/50 focus:border-primary focus:outline-none uppercase tracking-wider text-sm transition-colors"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="px-8"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-xs text-background/50 mt-6 uppercase tracking-wider">
            By subscribing, you agree to our Privacy Policy
          </p>
        </motion.div>
      </div>
    </section>
  );
}
