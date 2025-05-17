"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
import { ArrowDownToLine, Clock, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface StakedAsset {
  id: string
  token: string
  amount: string
  stakedDate: string
  duration: number
  daysLeft: number
  apy: number
}

export function UnstakePanel() {
  // const { toast } = useToast()

  // Mock data for staked assets
  const [stakedAssets, setStakedAssets] = useState<StakedAsset[]>([
    {
      id: "stake-1",
      token: "ETH",
      amount: "0.5",
      stakedDate: "2023-04-15",
      duration: 90,
      daysLeft: 45,
      apy: 5.2,
    },
    {
      id: "stake-2",
      token: "USDC",
      amount: "1000",
      stakedDate: "2023-05-01",
      duration: 30,
      daysLeft: 5,
      apy: 3.1,
    },
    {
      id: "stake-3",
      token: "BNB",
      amount: "2.5",
      stakedDate: "2023-03-10",
      duration: 180,
      daysLeft: 0,
      apy: 6.5,
    },
  ])

  const handleUnstake = (asset: StakedAsset) => {
    // In a real app, this would call a smart contract
    // toast({
    //   title: "Unstaking initiated",
    //   description: `Unstaking ${asset.amount} ${asset.token}`,
    // })

    // Remove the asset from the list
    setStakedAssets(stakedAssets.filter((a) => a.id !== asset.id))
  }

  const calculateRewards = (asset: StakedAsset) => {
    const stakedDays = asset.duration - asset.daysLeft
    return Number.parseFloat(asset.amount) * (stakedDays / 365) * (asset.apy / 100)
  }

  if (stakedAssets.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 pb-6 text-center">
          <div className="mx-auto rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-4">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Staked Assets</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You don't have any staked assets at the moment. Go to the Stake tab to start earning rewards.
          </p>
          <Button variant="outline">Go to Staking</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Staked Assets</CardTitle>
        <CardDescription>Manage your staked assets and claim rewards when the staking period ends.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {stakedAssets.map((asset) => (
          <Card key={asset.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium">
                      {asset.amount} {asset.token}
                    </h3>
                    {asset.daysLeft === 0 && (
                      <Badge className="ml-2 bg-green-500" variant="secondary">
                        Ready to Claim
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Staked on {new Date(asset.stakedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">APY: {asset.apy}%</p>
                  <p className="text-xs text-muted-foreground">{asset.duration} days period</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{asset.daysLeft > 0 ? `${asset.daysLeft} days left` : "Completed"}</span>
                </div>
                <Progress value={((asset.duration - asset.daysLeft) / asset.duration) * 100} />
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">Estimated Rewards</p>
                  <p className="font-medium">
                    {calculateRewards(asset).toFixed(6)} {asset.token}
                  </p>
                </div>
                <Button
                  variant={asset.daysLeft === 0 ? "default" : "outline"}
                  className={asset.daysLeft === 0 ? "bg-purple-600 hover:bg-purple-700" : ""}
                  disabled={asset.daysLeft > 0}
                  onClick={() => handleUnstake(asset)}
                >
                  {asset.daysLeft > 0 ? (
                    <>
                      <Clock className="mr-2 h-4 w-4" />
                      Locked
                    </>
                  ) : (
                    <>
                      <ArrowDownToLine className="mr-2 h-4 w-4" />
                      Unstake
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
