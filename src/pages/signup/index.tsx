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
import { useState, useEffect } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { showSnackbar } from "../../components/SnackbarUtils/index.tsx";
import { IUserAuth } from "../../interfaces/auth.ts";
import { BINANCE_LOGO, LOGO } from "../../utils/constants.ts";
import ContractABI from "../../abi/abi.json";
import { useLazyGetUserQuery } from "../../store/apis/userApi.ts";
import { RoutePaths } from "../../utils/routes.ts";

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useDisconnect,
} from "wagmi";
import { useLocation, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const upline_id = useLocation().state?.upline_id;
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const [triggerGetUser] = useLazyGetUserQuery();
  const { data: hash, writeContract } = useWriteContract();
  const [uplineId, setUplineId] = useState<number>(upline_id || 1);
  const { isSuccess: isTransactionSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const handleWalletConnect = () => {
    if (!isConnected) {
      openConnectModal?.();
    } else {
      handleRegister();
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

  const handleRegister = async () => {
    try {
      if (!uplineId) {
        showSnackbar({
          message: "Please enter your upline ID.",
          severity: "warning",
        });
        return;
      }
      const user = await triggerGetUser({
        id: Number(uplineId),
      }).unwrap();
      writeContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi: ContractABI,
        functionName: "registrationFor",
        args: [address, user.wallet_address],
      });
    } catch (err: any) {
      console.error(err);
      showSnackbar({
        message: err?.reason || "Registration failed.",
        severity: "error",
      });
      disconnect();
    }
  };

  useEffect(() => {
    if (isTransactionSuccess && hash) {
      showSnackbar({
        message: "Registration successful.",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/${RoutePaths.DASHBOARD}`);
      }, 2000);
    }
  }, [isTransactionSuccess, hash]);

  return (
    <Grid container sx={{ py: { xs: 2, sm: 2, md: 20 } }}>
      <Grid size={{ xs: 12, sm: 12, md: 8 }} offset={{ xs: 0, sm: 0, md: 2 }}>
        <Card sx={cardStyle}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12, md: 8 }}>
                <Box display={"flex"} gap={2} alignItems={"center"}>
                  <img src={LOGO} alt="Logo" width="100" />
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
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Upline ID"
                    value={uplineId}
                    onChange={(e) => setUplineId(+e.target.value)}
                  />

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

export default SignUp;
