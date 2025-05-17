"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { ArrowRight, TrendingUp, Wallet, DollarSign, BarChart3 } from "lucide-react"

export function DefiPanel() {
  // const { toast } = useToast()
  const [lendAmount, setLendAmount] = useState("")
  const [lendToken, setLendToken] = useState("eth")
  const [borrowAmount, setBorrowAmount] = useState("")
  const [borrowToken, setBorrowToken] = useState("usdc")
  const [farmToken, setFarmToken] = useState("eth-usdc")
  const [farmAmount, setFarmAmount] = useState("")

  const handleLend = () => {
    if (!lendAmount || Number.parseFloat(lendAmount) <= 0) {
      // toast({
      //   title: "Invalid amount",
      //   description: "Please enter a valid amount to lend",
      //   variant: "destructive",
      // })
      return
    }

    // toast({
    //   title: "Lending initiated",
    //   description: `Lending ${lendAmount} ${lendToken.toUpperCase()}`,
    // })
  }

  const handleBorrow = () => {
    if (!borrowAmount || Number.parseFloat(borrowAmount) <= 0) {
      // toast({
      //   title: "Invalid amount",
      //   description: "Please enter a valid amount to borrow",
      //   variant: "destructive",
      // })
      return
    }

    // toast({
    //   title: "Borrowing initiated",
    //   description: `Borrowing ${borrowAmount} ${borrowToken.toUpperCase()}`,
    // })
  }

  const handleFarm = () => {
    if (!farmAmount || Number.parseFloat(farmAmount) <= 0) {
      // toast({
      //   title: "Invalid amount",
      //   description: "Please enter a valid amount to farm",
      //   variant: "destructive",
      // })
      return
    }

    // toast({
    //   title: "Yield farming initiated",
    //   description: `Adding ${farmAmount} to ${farmToken.toUpperCase()} farm`,
    // })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>DeFi Dashboard</CardTitle>
        <CardDescription>
          Access various DeFi opportunities including lending, borrowing, and yield farming.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lend">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lend">Lending</TabsTrigger>
            <TabsTrigger value="borrow">Borrowing</TabsTrigger>
            <TabsTrigger value="farm">Yield Farming</TabsTrigger>
          </TabsList>

          <TabsContent value="lend" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 rounded-full bg-purple-100 p-2">
                          <DollarSign className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">ETH</p>
                          <p className="text-xs text-muted-foreground">APY: 3.2%</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Lend
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 rounded-full bg-blue-100 p-2">
                          <DollarSign className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">USDC</p>
                          <p className="text-xs text-muted-foreground">APY: 5.8%</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Lend
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lend-token">Select Token</Label>
                <Select value={lendToken} onValueChange={setLendToken}>
                  <SelectTrigger id="lend-token">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                    <SelectItem value="dai">DAI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lend-amount">Amount</Label>
                <Input
                  id="lend-amount"
                  type="number"
                  placeholder="0.00"
                  value={lendAmount}
                  onChange={(e) => setLendAmount(e.target.value)}
                />
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleLend}>
                <Wallet className="mr-2 h-4 w-4" />
                Lend Now
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="borrow" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 rounded-full bg-green-100 p-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">USDC</p>
                          <p className="text-xs text-muted-foreground">APR: 4.5%</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Borrow
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 rounded-full bg-yellow-100 p-2">
                          <DollarSign className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">DAI</p>
                          <p className="text-xs text-muted-foreground">APR: 3.9%</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Borrow
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <Label htmlFor="borrow-token">Select Token</Label>
                <Select value={borrowToken} onValueChange={setBorrowToken}>
                  <SelectTrigger id="borrow-token">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                    <SelectItem value="dai">DAI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="borrow-amount">Amount</Label>
                <Input
                  id="borrow-amount"
                  type="number"
                  placeholder="0.00"
                  value={borrowAmount}
                  onChange={(e) => setBorrowAmount(e.target.value)}
                />
              </div>

              <div className="rounded-md bg-muted p-3 text-sm">
                <p className="font-medium">Collateral Required</p>
                <p className="text-muted-foreground">
                  You need to provide at least 150% collateral to borrow this amount.
                </p>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleBorrow}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Borrow Now
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="farm" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 rounded-full bg-indigo-100 p-2">
                          <BarChart3 className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">ETH-USDC</p>
                          <p className="text-xs text-muted-foreground">APY: 12.5%</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Farm
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 rounded-full bg-pink-100 p-2">
                          <BarChart3 className="h-4 w-4 text-pink-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">ETH-BNB</p>
                          <p className="text-xs text-muted-foreground">APY: 18.2%</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Farm
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farm-pair">Select Liquidity Pair</Label>
                <Select value={farmToken} onValueChange={setFarmToken}>
                  <SelectTrigger id="farm-pair">
                    <SelectValue placeholder="Select pair" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth-usdc">ETH-USDC</SelectItem>
                    <SelectItem value="eth-bnb">ETH-BNB</SelectItem>
                    <SelectItem value="bnb-usdt">BNB-USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farm-amount">Amount</Label>
                <Input
                  id="farm-amount"
                  type="number"
                  placeholder="0.00"
                  value={farmAmount}
                  onChange={(e) => setFarmAmount(e.target.value)}
                />
              </div>

              <div className="rounded-md bg-muted p-3 text-sm">
                <p className="font-medium">Impermanent Loss Risk</p>
                <p className="text-muted-foreground">
                  Providing liquidity may result in impermanent loss if token prices change significantly.
                </p>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleFarm}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Start Farming
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
