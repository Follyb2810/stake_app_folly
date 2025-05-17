"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { StakingPanel } from "@/components/StakingPanel"
import { UnstakePanel } from "@/components/UnstakePanel"
import { DefiPanel } from "@/components/DefiPanel"
import { SwapPanel } from "@/components/SwapPanel"
import { useAccount } from "wagmi"
import { ConnectWallet } from "@/components/ConnectWallet"
import { Button } from "@/components/ui/button"

export function DashboardTabs() {
  const { isConnected } = useAccount()
  const [showConnect, setShowConnect] = useState(false)

  if (!isConnected) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-gray-500 mb-6">Please connect your wallet to access the staking platform features.</p>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowConnect(true)}>
          Connect Wallet
        </Button>
        {showConnect && <ConnectWallet onClose={() => setShowConnect(false)} />}
      </Card>
    )
  }

  return (
    <Tabs defaultValue="stake" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="stake">Stake</TabsTrigger>
        <TabsTrigger value="unstake">Unstake</TabsTrigger>
        <TabsTrigger value="defi">DeFi</TabsTrigger>
        <TabsTrigger value="swap">Swap</TabsTrigger>
      </TabsList>
      <TabsContent value="stake">
        <StakingPanel />
      </TabsContent>
      <TabsContent value="unstake">
        <UnstakePanel />
      </TabsContent>
      <TabsContent value="defi">
        <DefiPanel />
      </TabsContent>
      <TabsContent value="swap">
        <SwapPanel />
      </TabsContent>
    </Tabs>
  )
}
