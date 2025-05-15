import {
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Box,
  TextField,
} from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";
import { showSnackbar } from "../../components/SnackbarUtils";
import { IUserAuth } from "../../interfaces/auth";
import { BINANCE_LOGO, LOGO } from "../../utils/constants";
import MatrixChart from "./yt";

const Login = () => {
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();

  const handleWalletConnect = () => {
    try {
      if (!isConnected) {
        openConnectModal?.();
        return;
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      showSnackbar({
        message: "Error connecting wallet. Please try again.",
        severity: "error",
      });
    }
  };

  const handleLogin = async () => {
    try {
      const payload: IUserAuth = { wallet_address: address as string };
      const response: any = null;
      if (response?.statusCode === 200) {
        showSnackbar({
          message: "Logged in successfully.",
          severity: "success",
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        localStorage.setItem("access_token", response.data.access_token);
        window.location.href = "/user/dashboard";
      } else {
        disconnect();
        showSnackbar({
          message: "Unknown wallet address, you are not a registered user.",
          severity: "error",
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (isConnected && address) {
      // handleLogin();
    }
  }, [isConnected, address]);

  return (
    <Grid container sx={{ py: { xs: 2, sm: 2, md: 20 } }}>
      <Grid size={{ xs: 12, sm: 12, md: 8 }} offset={{ xs: 0, sm: 0, md: 2 }}>
        <MatrixChart />
        <Card sx={cardStyle}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12, md: 8 }}>
                <Box display={"flex"} gap={2} alignItems={"center"}>
                  <img src={LOGO} alt="Logo" width="150" />
                  <Divider
                    variant="fullWidth"
                    orientation="vertical"
                    flexItem
                  />
                  <img src={BINANCE_LOGO} alt="Logo" width="50" />
                </Box>

                <Typography variant="h5" fontWeight={700} py={4}>
                  Create a new account
                </Typography>
                <Typography variant="body1" fontWeight={400} width={"80%"}>
                  You just need a crypto wallet and an upline ID to create a new
                  account and start referral and earn.
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <Box py={4} gap={4} display={"flex"} flexDirection="column">
                  <TextField fullWidth label="Upline ID" />

                  <Button fullWidth onClick={handleWalletConnect} size="large">
                    {isConnected && address ? "Register Now" : "Connect Wallet"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const cardStyle = {
  p: 2,
  borderRadius: "20px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export default Login;
