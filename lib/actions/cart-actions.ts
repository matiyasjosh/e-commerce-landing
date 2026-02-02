"use server";

import { getCartIdentity, CART_COOKIE_NAME } from "@/lib/cart-identity";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// get the total number of product in the cart
export async function getCartCount() {
  const { userId, guestId } = await getCartIdentity();

  if (!userId && !guestId) return 0;

  const cart = await prisma.cart.findFirst({
    where: {
      OR: [
        { userId: userId ?? undefined },
        { guestId: guestId ?? undefined },
      ],
    },
    include: {
      _count: {
        select: { items: true } // This counts types of products
      },
      items: {
        select: { quantity: true } // We need this to sum up actual quantities
      }
    }
  });

  if (!cart) return 0;

  // Sum up all quantities
  return cart.items.reduce((acc, item) => acc + item.quantity, 0);
}

// add to cart
export async function addToCart(productId: number) {
    let { userId, guestId } = await getCartIdentity();
    const cookieStore = await cookies();

    // if no identity, then it's brand new guest
    if (!userId && !guestId) {
        guestId = crypto.randomUUID();

        cookieStore.set(CART_COOKIE_NAME, guestId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
        });
    }

    // now find the cart itself
    let cart = await prisma.cart.findFirst({
        where: {
            OR: [
                { userId: userId ?? undefined },
                { guestId: guestId ?? undefined },
            ],
        },
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                userId,
                guestId,
            },
        });
    }

    // adding item to the cart
    await prisma.cartItem.upsert({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId: productId,
            },
        },
        update: {
            quantity: { increment: 1 },
        },
        create: {
            cartId: cart.id,
            productId: productId,
            quantity: 1,
        },
    });

    revalidatePath("/"); // update the UI
}

// get the selected items
export async function getCartItems() {
    const { userId, guestId } = await getCartIdentity();

    if (!userId && !guestId) return [];

    const cart = await prisma.cart.findFirst({
        where: {
            OR: [
                { userId: userId ?? undefined},
                { guestId: guestId ?? undefined},
            ],
        },
        include: {
            items: {
                include: {
                    product: true,
                },
                orderBy: { createdAt: 'desc' }
            }
        }
    })

    return cart?.items ?? [];
}

// removing item from the cart
export async function removeFromCartAction(productId: number, shouldDeleteEntirely = false) {
  const { userId, guestId } = await getCartIdentity();

  if (!userId && !guestId) return;

  const cart = await prisma.cart.findFirst({
    where: {
      OR: [{ userId: userId ?? undefined }, { guestId: guestId ?? undefined }],
    },
  });

  if (!cart) return;

  const existingItem = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } }
  });

  if (!existingItem) return;

  // Logic: Delete if quantity is 1 OR if user clicked "Remove all"
  if (shouldDeleteEntirely || existingItem.quantity <= 1) {
    await prisma.cartItem.delete({
      where: { cartId_productId: { cartId: cart.id, productId } }
    });
  } else {
    // Just decrease quantity by 1
    await prisma.cartItem.update({
      where: { cartId_productId: { cartId: cart.id, productId } },
      data: { quantity: { decrement: 1 } }
    });
  }

  revalidatePath("/"); // Refreshes all components showing cart data
}