import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4FF00] flex items-center justify-center">
              <span className="text-foreground font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-bold tracking-[0.2em] uppercase">DEMOBAZA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-sm uppercase tracking-wider hover:text-muted-foreground transition-colors">
              Woman
            </Link>
            <Link href="#" className="text-sm uppercase tracking-wider hover:text-muted-foreground transition-colors">
              Man
            </Link>
            <Link href="#" className="text-sm uppercase tracking-wider hover:text-muted-foreground transition-colors">
              Collections
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth?view=signin">
              <Button variant="ghost" className="uppercase tracking-wider">
                Sign In
              </Button>
            </Link>
            <Link href="/auth?view=signup">
              <Button className="bg-[#D4FF00] hover:bg-[#D4FF00]/90 text-foreground uppercase tracking-wider">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

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
