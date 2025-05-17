"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
// import { useToast } from "@/hooks/use-toast"
import { Coins, Info } from "lucide-react"

export function StakingPanel() {
  const [amount, setAmount] = useState<string>("0")
  const [token, setToken] = useState<string>("eth")
  const [duration, setDuration] = useState<number>(30)
  // const { toast } = useToast()

  const estimatedRewards = Number.parseFloat(amount || "0") * (duration / 365) * getApy(token)

  function getApy(tokenType: string) {
    const apyRates: Record<string, number> = {
      eth: 0.05, // 5%
      usdc: 0.03, // 3%
      usdt: 0.03, // 3%
      dai: 0.025, // 2.5%
      bnb: 0.06, // 6%
    }
    return apyRates[tokenType] || 0.04
  }

  const handleStake = () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      // toast({
      //   title: "Invalid amount",
      //   description: "Please enter a valid amount to stake",
      //   variant: "destructive",
      // })
      return
    }

    // In a real app, this would call a smart contract
    // toast({
    //   title: "Staking initiated",
    //   description: `Staking ${amount} ${token.toUpperCase()} for ${duration} days`,
    // })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stake Your Assets</CardTitle>
        <CardDescription>
          Stake your crypto assets to earn rewards. The longer you stake, the higher your potential returns.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="token">Select Token</Label>
            <span className="text-sm text-muted-foreground">APY: {(getApy(token) * 100).toFixed(2)}%</span>
          </div>
          <Select value={token} onValueChange={setToken}>
            <SelectTrigger id="token">
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="usdc">USDC</SelectItem>
              <SelectItem value="usdt">USDT</SelectItem>
              <SelectItem value="dai">DAI</SelectItem>
              <SelectItem value="bnb">BNB</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="amount">Amount</Label>
            <span className="text-sm text-muted-foreground">Balance: 0.00 {token.toUpperCase()}</span>
          </div>
          <div className="flex space-x-2">
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button variant="outline" onClick={() => setAmount("0.00")}>
              Max
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Staking Period</Label>
            <span className="text-sm text-muted-foreground">{duration} days</span>
          </div>
          <Slider value={[duration]} min={7} max={365} step={1} onValueChange={(value) => setDuration(value[0])} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>7 days</span>
            <span>30 days</span>
            <span>90 days</span>
            <span>180 days</span>
            <span>365 days</span>
          </div>
        </div>

        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Estimated Rewards</span>
              <span className="font-medium">
                {estimatedRewards.toFixed(6)} {token.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Info className="h-3 w-3 mr-1" />
              Rewards are calculated based on current APY rates and may vary
            </div>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleStake}>
          <Coins className="mr-2 h-4 w-4" />
          Stake Now
        </Button>
      </CardFooter>
    </Card>
  )
}
