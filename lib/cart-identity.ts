import { headers, cookies } from "next/headers";
import { auth } from "./auth";

export const CART_COOKIE_NAME = "cart_id";

export async function getCartIdentity() {
    const session = await auth.api.getSession({ headers: await headers(),});

    if (session?.user) {
        return { userId: session.user.id, guestId: null};
    }

    const cookieStore = await cookies();
    const guestId = cookieStore.get(CART_COOKIE_NAME)?.value;

    if (guestId) {
        return { userId: null, guestId};
    }

    return {userId: null, guestId: null};
}