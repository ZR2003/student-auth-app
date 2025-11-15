"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SigninForm() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSignIn = (provider: string) => {
    setIsLoading(provider);
    signIn(provider, { callbackUrl: "/" });
  };

  const providers = [
    {
      name: "Google",
      id: "google",
      bg: "bg-red-600 hover:bg-red-700",
    },
    {
      name: "GitHub",
      id: "github",
      bg: "bg-gray-800 hover:bg-gray-900",
    },
    // Facebook removed
  ];

  return (
    <div className="space-y-4">
      {providers.map((provider) => (
        <button
          key={provider.id}
          onClick={() => handleSignIn(provider.id)}
          disabled={isLoading === provider.id}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${provider.bg} ${
            isLoading === provider.id ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading === provider.id ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            `Sign in with ${provider.name}`
          )}
        </button>
      ))}
    </div>
  );
}