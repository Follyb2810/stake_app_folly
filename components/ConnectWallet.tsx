"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useConnect, useAccount, useDisconnect } from "wagmi"
import { Wallet, LogOut, Copy, CheckCircle2, Loader2 } from "lucide-react"

interface ConnectWalletProps {
  onClose: () => void
}

export function ConnectWallet({ onClose }: ConnectWalletProps) {
  const [open, setOpen] = useState(true)
  const [copied, setCopied] = useState(false)
  const { connectors, connect, isPending, pendingConnector } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  useEffect(() => {
    if (isConnected) {
      setTimeout(() => {
        handleClose()
      }, 1000)
    }
  }, [isConnected])

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isConnected ? "Wallet Connected" : "Connect Your Wallet"}</DialogTitle>
        </DialogHeader>
        {isConnected ? (
          <div className="flex flex-col space-y-4 py-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-purple-100 p-2">
                  <Wallet className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{formatAddress(address || "")}</p>
                  <p className="text-xs text-gray-500">Connected Wallet</p>
                </div>
              </div>
              <Button variant="outline" size="icon" onClick={copyAddress}>
                {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start text-red-500 hover:text-red-600"
              onClick={() => disconnect()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="popular" className="py-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="more">More Options</TabsTrigger>
            </TabsList>
            <TabsContent value="popular" className="mt-4 space-y-3">
              {connectors.slice(0, 4).map((connector) => (
                <Button
                  key={connector.id}
                  variant="outline"
                  className="w-full justify-start"
                  disabled={!connector.ready || isPending}
                  onClick={() => connect({ connector })}
                >
                  {isPending && pendingConnector?.id === connector.id ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wallet className="mr-2 h-4 w-4" />
                  )}
                  {connector.name}
                  {!connector.ready && " (unsupported)"}
                </Button>
              ))}
            </TabsContent>
            <TabsContent value="more" className="mt-4 space-y-3">
              {connectors.slice(4).map((connector) => (
                <Button
                  key={connector.id}
                  variant="outline"
                  className="w-full justify-start"
                  disabled={!connector.ready || isPending}
                  onClick={() => connect({ connector })}
                >
                  {isPending && pendingConnector?.id === connector.id ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wallet className="mr-2 h-4 w-4" />
                  )}
                  {connector.name}
                  {!connector.ready && " (unsupported)"}
                </Button>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
