import { createConfig, http } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { injected, walletConnect } from "wagmi/connectors"

// Configure wagmi with popular wallet connectors
export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId: "YOUR_WALLET_CONNECT_PROJECT_ID", // Replace with your WalletConnect Project ID
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
