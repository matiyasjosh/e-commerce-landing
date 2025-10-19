import { auth } from "@/auth";
import ShopClient from "./shop-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ShopPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    // Optionally redirect to sign in if you'd like
    redirect('/auth?view=signin');
  }

  return <ShopClient session={session} />;
}
