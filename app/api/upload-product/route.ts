import { NextResponse } from "next/server";
import prisma
 from "@/lib/prisma";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
    name,
    shortdescription,
    price,
    branddesc1,
    branddesc2,
    branddesc3,
    tag,
    stock,
    categoryid,
    images, // array of MinIO URLs
    } = body;

    // Basic validation
    if (!name || !price || !categoryid || !images?.length) {
    return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
    );
    }

    const product = await prisma.product.create({
      data: {
          name,
          shortdescription,
          price,
          branddesc1,
          branddesc2,
          branddesc3,
          tag,
          stock,
          categoryid,
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