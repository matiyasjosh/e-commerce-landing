"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag } from "lucide-react";
import { signOut } from "@/lib/actions/auth-actions";

type Session = any;

const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <header className="bg-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#D4FF00] flex items-center justify-center">
            <span className="text-foreground font-bold text-xl">D</span>
          </div>
          <span className="text-2xl font-bold tracking-[0.2em] uppercase">
            DEMOBAZA
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          {!session ? (
            <>
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
            </>
          ) : (
            <>
              <Search className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-600" />
              <ShoppingBag className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-600" />
              <Button
                onClick={() => signOut()}
                className="bg-[#D4FF00] hover:bg-[#D4FF00]/90 text-foreground uppercase tracking-wider"
              >
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
