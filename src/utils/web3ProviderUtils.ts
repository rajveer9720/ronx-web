import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { Network, networkMap } from "./networkUtils";

export const walletConfig = getDefaultConfig({
  appName: import.meta.env.VITE_APP_TITLE || "RONX",
  projectId: import.meta.env.VITE_APP_PROJECT_ID || "",
  chains: [networkMap[import.meta.env.VITE_APP_APPKIT_CHAIN_ID as Network]],
  wallets: [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, trustWallet],
    },
    {
      groupName: "Other",
      wallets: [walletConnectWallet, coinbaseWallet],
    },
  ],
});
