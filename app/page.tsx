import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Navbar session={null}/>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center bg-muted relative overflow-hidden">
        <div className="absolute top-20 left-20 w-48 h-48 bg-[#D4FF00] opacity-20" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#D4FF00] opacity-20" />
        <div className="relative z-10 text-center space-y-8 p-8">
          <h1 className="text-7xl md:text-8xl font-bold tracking-[0.3em] uppercase">DEMOBAZA</h1>
          <p className="text-xl md:text-2xl tracking-wider uppercase text-muted-foreground">
            Contemporary Fashion Collection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-[#D4FF00] hover:bg-[#D4FF00]/90 text-foreground uppercase tracking-wider px-8"
              >
                Explore Collection
              </Button>
            </Link>
            <Link href="/auth?view=signin">
              <Button size="lg" variant="outline" className="border-2 uppercase tracking-wider px-8 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
