import { Box, Button, IconButton } from "@mui/material";
import { LOGO } from "../../utils/constants";
import { Search } from "@mui/icons-material";
import SearchField from "../Search";
import { showSnackbar } from "../SnackbarUtils";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { truncateAddress } from "../../utils/userUtils";

interface AppToolbarProps {
  guest?: boolean;
}

export const ToolbarActions = (props: AppToolbarProps) => {
  const { guest } = props;
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const handleWalletConnect = () => {
    try {
      if (!isConnected) {
        openConnectModal?.();
        return;
      } else {
        openAccountModal?.();
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      showSnackbar({
        message: "Error connecting wallet. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent="space-between"
      gap={0.5}
      pr={guest ? 2 : 0}
    >
      <Button variant="outlined" color="inherit" onClick={handleWalletConnect}>
        {isConnected ? (
          <span>{truncateAddress(String(address))}</span>
        ) : (
          <span>Connect Wallet</span>
        )}
      </Button>

      {!guest && (
        <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
          <IconButton edge="end" color="inherit">
            <Search />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export const ToolbarAppTitle = (props: AppToolbarProps) => {
  const { guest } = props;
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent="space-between"
      pl={guest ? 2 : 0}
    >
      <Box>
        <img src={LOGO} alt="Logo" style={{ height: 40, marginLeft: -40 }} />
      </Box>
      {!guest && (
        <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
          <SearchField
            placeholder="Search by wallet address"
            styles={{ width: "55vw", left: "10%" }}
            onSearch={(value: string) => {
              console.log(value);
            }}
          />
        </Box>
      )}
    </Box>
  );
};
