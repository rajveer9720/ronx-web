import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { walletConfig } from "../utils/ProviderUtils";
import {
  DisclaimerComponent,
  RainbowKitProvider,
  Theme,
  lightTheme,
} from "@rainbow-me/rainbowkit";

import merge from "lodash.merge";
import { useTheme } from "@mui/material";

interface Web3ModalProviderProps {
  children: React.ReactNode;
}

export const Web3ModalProvider: React.FC<Web3ModalProviderProps> = ({
  children,
}) => {
  const theme = useTheme();
  const myTheme = merge(lightTheme(), {
    colors: {
      accentColor: theme.palette.primary.main,
    },
    fonts: {
      body: "Poppins, sans-serif",
    },
  } as Theme);

  const queryClient = new QueryClient();
  const Disclaimer: DisclaimerComponent = ({ Text }) => <Text>Zembo</Text>;

  return (
    <WagmiProvider config={walletConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={myTheme}
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
