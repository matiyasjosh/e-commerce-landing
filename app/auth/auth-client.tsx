"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInSocial } from "@/lib/actions/auth-actions";
import { SignInView } from "@/components/auth-sign-in-view";
import { SignUpView } from "@/components/auth-sign-up-view";
import { AuthErrorDisplay } from "@/components/auth-error-display";
import { authClient } from "@/lib/auth-client";

interface AuthClientPageProps {
  isSignIn: boolean;
}

export default function AuthClientPage({
  isSignIn: initialIsSignIn,
}: AuthClientPageProps) {
  const [isSignIn, setIsSignIn] = useState(initialIsSignIn);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSocialAuth = async (provider: "google" | "apple") => {
    setIsLoading(true);
    setError("");

    try {
      await signInSocial(provider);
    } catch (err) {
      setError(
        `Error authenticating with ${provider}: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formEmail = formData.get("email") as string;
    const formPassword = formData.get("password") as string;
    console.log("heei fp", formPassword);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const formName = firstName && lastName ? `${firstName} ${lastName}` : "";

    try {
      if (isSignIn) {
        await authClient.signIn.email({
          email: formEmail, password: formPassword
        },{
          onSuccess: () => {
            router.push("/shop");
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message);
          }
        }
        )
      }
      else {
        await authClient.signUp.email({ 
          email: formEmail,
          name: formName,
          password: formPassword
        }, {
          onSuccess: () => {
            router.push("/auth?view=signin")
            router.refresh()
          }, 
          onError: (ctx) => {
            setError(ctx.error.message)
          }
        }
      )
      }
    } catch (err) {
      setError(
        `Authentication error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Keep local isSignIn in sync with prop when the URL/search params change
  useEffect(() => {
    setIsSignIn(initialIsSignIn);
  }, [initialIsSignIn]);

  useEffect(() => {
    // start timer
    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    // cleanup when component unmounts
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <>
      <AuthErrorDisplay error={error} />
      {isSignIn ? (
        <SignInView onSubmit={handleEmailAuth} isLoading={isLoading} handleSocial={handleSocialAuth} />
      ) : (
        <SignUpView onSubmit={handleEmailAuth} isLoading={isLoading} handleSocial={handleSocialAuth}/>
      )}

    </>
  );
}
