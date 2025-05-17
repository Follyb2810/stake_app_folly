"use client";

import type React from "react";

import { ThemeProvider } from "@/components/ThemeProvider";
import { WagmiProvider } from "wagmi";
import { config } from "@/utils/web3-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster"

// Create a client for React Query
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark">
          {children}
          {/* <Toaster /> */}
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
