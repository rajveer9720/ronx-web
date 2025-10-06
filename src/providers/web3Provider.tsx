import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { APP_NAME } from "../utils/constants";
import { walletConfig } from "../utils/web3ProviderUtils";
import {
  AvatarComponent,
  DisclaimerComponent,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { AVATAR } from "../utils/constants";
import { rainbowkitTheme } from "../utils/theme";
import { ReactNode } from "react";

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider = (props: Web3ProviderProps) => {
  const { children } = props;
  const queryClient = new QueryClient();
  const Disclaimer: DisclaimerComponent = ({ Text }) => <Text>{APP_NAME}</Text>;
  const CustomAvatar: AvatarComponent = ({ size }) => {
    return <img src={AVATAR} width={size} height={size} />;
  };

  return (
    <WagmiProvider config={walletConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={rainbowkitTheme}
          avatar={CustomAvatar}
          appInfo={{
            learnMoreUrl: undefined,
            disclaimer: Disclaimer,
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
