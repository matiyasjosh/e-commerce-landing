import { getCartIdentity, CART_COOKIE_NAME } from "@/lib/cart-identity";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


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