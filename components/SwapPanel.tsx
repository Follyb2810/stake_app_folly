"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/hooks/use-toast"
import { ArrowDownUp, RefreshCw, Settings } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function SwapPanel() {
  const [fromToken, setFromToken] = useState("eth")
  const [toToken, setToToken] = useState("usdc")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippage, setSlippage] = useState("0.5")
  const [showSettings, setShowSettings] = useState(false)
  // const { toast } = useToast()

  // Mock exchange rates
  const exchangeRates: Record<string, Record<string, number>> = {
    eth: { usdc: 3000, usdt: 3000, dai: 3000, bnb: 15 },
    usdc: { eth: 0.00033, usdt: 1, dai: 1, bnb: 0.005 },
    usdt: { eth: 0.00033, usdc: 1, dai: 1, bnb: 0.005 },
    dai: { eth: 0.00033, usdc: 1, usdt: 1, bnb: 0.005 },
    bnb: { eth: 0.067, usdc: 200, usdt: 200, dai: 200 },
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    if (value && !isNaN(Number.parseFloat(value))) {
      const rate = exchangeRates[fromToken][toToken] || 0
      setToAmount((Number.parseFloat(value) * rate).toFixed(6))
    } else {
      setToAmount("")
    }
  }

  const handleToAmountChange = (value: string) => {
    setToAmount(value)
    if (value && !isNaN(Number.parseFloat(value))) {
      const rate = exchangeRates[toToken][fromToken] || 0
      setFromAmount((Number.parseFloat(value) * rate).toFixed(6))
    } else {
      setFromAmount("")
    }
  }

  const switchTokens = () => {
    const tempFromToken = fromToken
    const tempFromAmount = fromAmount

    setFromToken(toToken)
    setFromAmount(toAmount)
    setToToken(tempFromToken)
    setToAmount(tempFromAmount)
  }

  const handleSwap = () => {
    if (!fromAmount || Number.parseFloat(fromAmount) <= 0) {
      // toast({
      //   title: "Invalid amount",
      //   description: "Please enter a valid amount to swap",
      //   variant: "destructive",
      // })
      return
    }

    // toast({
    //   title: "Swap initiated",
    //   description: `Swapping ${fromAmount} ${fromToken.toUpperCase()} to ${toAmount} ${toToken.toUpperCase()}`,
    // })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Swap Tokens</CardTitle>
            <CardDescription>Swap between different tokens at competitive rates.</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showSettings && (
          <Card className="bg-muted/50">
            <CardContent className="pt-6 pb-4">
              <h3 className="text-sm font-medium mb-3">Transaction Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slippage" className="text-xs">
                    Slippage Tolerance
                  </Label>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={slippage === "0.1" ? "bg-muted" : ""}
                      onClick={() => setSlippage("0.1")}
                    >
                      0.1%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={slippage === "0.5" ? "bg-muted" : ""}
                      onClick={() => setSlippage("0.5")}
                    >
                      0.5%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={slippage === "1.0" ? "bg-muted" : ""}
                      onClick={() => setSlippage("1.0")}
                    >
                      1.0%
                    </Button>
                    <Input
                      id="custom-slippage"
                      value={slippage}
                      onChange={(e) => setSlippage(e.target.value)}
                      className="w-20 h-9"
                    />
                    <span className="flex items-center">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="deadline" className="text-xs">
                    Transaction Deadline
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input id="deadline" defaultValue="30" className="w-16 h-8" />
                    <span className="text-xs">minutes</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="expert-mode" className="text-xs">
                      Expert Mode
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Bypasses confirmation modals and allows high slippage trades
                    </p>
                  </div>
                  <Switch id="expert-mode" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="from-token">From</Label>
            <span className="text-xs text-muted-foreground">Balance: 0.00 {fromToken.toUpperCase()}</span>
          </div>
          <div className="flex space-x-2">
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger id="from-token" className="w-[120px]">
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
            <Input
              type="number"
              placeholder="0.00"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="icon" className="rounded-full" onClick={switchTokens}>
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="to-token">To</Label>
            <span className="text-xs text-muted-foreground">Balance: 0.00 {toToken.toUpperCase()}</span>
          </div>
          <div className="flex space-x-2">
            <Select value={toToken} onValueChange={setToToken}>
              <SelectTrigger id="to-token" className="w-[120px]">
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
            <Input
              type="number"
              placeholder="0.00"
              value={toAmount}
              onChange={(e) => handleToAmountChange(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md bg-muted p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Rate</span>
            <span>
              1 {fromToken.toUpperCase()} = {exchangeRates[fromToken][toToken]} {toToken.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Slippage Tolerance</span>
            <span>{slippage}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Network Fee</span>
            <span className="flex items-center">
              ~0.0005 ETH
              <RefreshCw className="ml-1 h-3 w-3" />
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleSwap}>
          Swap Tokens
        </Button>
      </CardFooter>
    </Card>
  )
}
