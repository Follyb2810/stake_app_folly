import type { Metadata } from "next"
import Hero from "@/components/Hero"
import { DashboardTabs } from "@/components/DashboardTabs"

export const metadata: Metadata = {
  title: "Web3 Staking Platform",
  description: "A modern Web3 platform for staking, DeFi, and token swaps",
}

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <DashboardTabs />
      </div>
    </main>
  )
}
