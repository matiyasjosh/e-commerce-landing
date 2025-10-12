"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="uppercase text-xs tracking-wider font-medium">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              type="text"
              autoCapitalize="none"
              autoComplete="given-name"
              autoCorrect="off"
              disabled={isLoading}
              required
              className="border-2 focus-visible:ring-[#D4FF00] focus-visible:border-[#D4FF00]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="uppercase text-xs tracking-wider font-medium">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              type="text"
              autoCapitalize="none"
              autoComplete="family-name"
              autoCorrect="off"
              disabled={isLoading}
              required
              className="border-2 focus-visible:ring-[#D4FF00] focus-visible:border-[#D4FF00]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="uppercase text-xs tracking-wider font-medium">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            required
            className="border-2 focus-visible:ring-[#D4FF00] focus-visible:border-[#D4FF00]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="uppercase text-xs tracking-wider font-medium">
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            autoCapitalize="none"
            autoComplete="new-password"
            disabled={isLoading}
            required
            className="border-2 focus-visible:ring-[#D4FF00] focus-visible:border-[#D4FF00]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="uppercase text-xs tracking-wider font-medium">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
            autoCapitalize="none"
            autoComplete="new-password"
            disabled={isLoading}
            required
            className="border-2 focus-visible:ring-[#D4FF00] focus-visible:border-[#D4FF00]"
          />
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          required
          className="mt-1 data-[state=checked]:bg-[#D4FF00] data-[state=checked]:border-[#D4FF00] data-[state=checked]:text-foreground"
        />
        <label htmlFor="terms" className="text-sm leading-relaxed text-muted-foreground">
          I agree to the{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground">
            Privacy Policy
          </a>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#D4FF00] hover:bg-[#D4FF00]/90 text-foreground font-bold uppercase tracking-wider h-12"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground tracking-wider">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          className="border-2 hover:border-[#D4FF00] hover:bg-[#D4FF00]/10 bg-transparent"
        >
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          className="border-2 hover:border-[#D4FF00] hover:bg-[#D4FF00]/10 bg-transparent"
        >
          Apple
        </Button>
      </div>
    </form>
  )
}
