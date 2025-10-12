import { SignInForm } from "@/components/signin-form"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image/Brand */}
      <div className="hidden lg:flex flex-1 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#D4FF00] opacity-20" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#D4FF00] opacity-20" />
            <div className="relative z-10 text-center space-y-6 p-12">
              <h2 className="text-6xl font-bold tracking-[0.3em] uppercase">Welcome Back</h2>
              <p className="text-xl tracking-wider uppercase text-muted-foreground">Continue Your Journey</p>
              <div className="pt-8">
                <div className="inline-block bg-[#D4FF00] px-8 py-4">
                  <span className="text-foreground font-bold tracking-wider uppercase">New Collection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-[#D4FF00] flex items-center justify-center">
                  <span className="text-foreground font-bold text-xl">D</span>
                </div>
                <span className="text-2xl font-bold tracking-[0.2em] uppercase">DEMOBAZA</span>
              </div>
            </Link>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <SignInForm />

          <div className="mt-8 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/signup" className="font-medium hover:underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
