import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import prisma from "@/lib/prisma";


const CACHE_KEY = "products_cache";
const CACHE_TTL_SECONDS = 60; // adjust as needed

export async function GET() {
  try {
    // Try to return cached response first
    let cached = null;
    try {
      const raw = await redis.get(CACHE_KEY);
      if (raw) {
        cached = JSON.parse(raw);
        return NextResponse.json(cached, { status: 200 });
      }
    } catch (cacheGetErr) {
      // If Redis is down or misconfigured, log and continue to fetch from DB.
      // Avoid letting Redis getter error cause a 500 for all API consumers.
      console.error('Redis GET failed, skipping cache and fetching DB:', cacheGetErr);
    }

    const products = await prisma.product.findMany({
      include: { images: true },
    });

    const payload = { products };

    // Cache the result with TTL
    try {
      await redis.set(
        CACHE_KEY,
        JSON.stringify(payload),
        "EX",
        CACHE_TTL_SECONDS
      );
    } catch (cacheErr) {
      console.error("Failed to set products cache:", cacheErr);
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
