import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
    name,
    shortDescription,
    price,
    brandDesc1,
    brandDesc2,
    brandDesc3,
    tag,
    stock,
    categoryId,
    images, // array of MinIO URLs
    } = body;

    // Basic validation
    if (!name || !price || !categoryId || !images?.length) {
    return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
    );
    }

    const product = await prisma.product.create({
      data: {
          name,
          shortDescription,
          price,
          brandDesc1,
          brandDesc2,
          brandDesc3,
          tag,
          stock,
          categoryId,
          images: {
          create: images.map((url: string) => ({ url })),
          },
      },
      include: { images: true },
    });

    return NextResponse.json({ product }, { status: 201});
  } catch(err) {
    console.error("Error creating product:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  } 
}