// app/(protected)/layout.tsx
import { requireAuth } from "@/lib/server-auth";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await requireAuth(); // full server-side validation (auth())
  return <>{children}</>;
}
