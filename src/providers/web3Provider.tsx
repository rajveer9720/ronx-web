import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { walletConfig } from "../utils/ProviderUtils";
import {
  AvatarComponent,
  DisclaimerComponent,
  RainbowKitProvider,
  Theme,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import merge from "lodash.merge";
import { useTheme } from "@mui/material";
import { AVATAR } from "../utils/constants";

interface Web3ModalProviderProps {
  children: React.ReactNode;
}

export const Web3ModalProvider: React.FC<Web3ModalProviderProps> = ({
  children,
}) => {
  const theme = useTheme();
  const myTheme = merge(darkTheme(), {
    colors: {
      accentColor: theme.palette.primary.main,
    },
    fonts: {
      body: "DM Sans, sans-serif",
    },
  } as Theme);

  const queryClient = new QueryClient();
  const Disclaimer: DisclaimerComponent = ({ Text }) => <Text>RONX</Text>;
  const CustomAvatar: AvatarComponent = ({ size }) => {
    return (
      <img
        src={AVATAR}
        width={size}
        height={size}
        style={{ borderRadius: size }}
      />
    );
  };

  return (
    <WagmiProvider config={walletConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={myTheme}
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
