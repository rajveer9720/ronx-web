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
import { useState, useEffect, useCallback } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { showSnackbar } from "../../components/SnackbarUtils";
import { BINANCE_LOGO, LOGO, ALL_LEVELS_TOTAL } from "../../utils/constants";
import ContractABI from "../../abi/abi.json";
import BUSD_ABI from "../../abi/busdAbi.json";
import { useLazyGetUserQuery,  } from "../../store/apis/userApi";
import { RoutePaths } from "../../utils/routes";
import { useAccount, useDisconnect } from "wagmi";
import { useLocation, useNavigate } from "react-router-dom";
import { parseUnits } from "viem";

import { useWeb3Transaction } from "../../hooks/useWeb3Transaction";
import { useTokenBalances } from "../../hooks/useTokenBalances";
import { checkNativeTokenForGas, checkBusdBalance, checkBusdAllowance } from "../../utils/web3Checks";

const SignUp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const uplineIdFromState = (state as { upline_id?: number })?.upline_id;
  const { isConnected, address, chain } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const [getUser, { isFetching: isUserFetching }] = useLazyGetUserQuery();
  const totalBusdRequiredForRegistration = (import.meta.env.VITE_REQUIRED_BUSD);

  const {
    busdBalance,
    busdAllowance,
    nativeTokenBalance,
    refetchBalances: refetchWalletBalances,
    isFetchingBalances,
  } = useTokenBalances();

  const {
    executeTransaction: executeApproval,
    isProcessing: isApprovalTxProcessing,
    isConfirmed: isApprovalConfirmed,
  } = useWeb3Transaction({
    successMessage: "BUSD approved successfully. Proceeding with registration...",
    errorMessage: "BUSD approval failed.",
    onSettled: refetchWalletBalances,
  });

  const {
    executeTransaction: executeRegistration,
    isProcessing: isRegistrationTxProcessing,
    isConfirmed: isRegistrationConfirmed,
  } = useWeb3Transaction({
    successMessage: "Registration successful!",
    errorMessage: "Registration failed.",
    onSettled: () => {
      refetchWalletBalances();
      if (isRegistrationConfirmed) {
        setTimeout(() => navigate(`/${RoutePaths.DASHBOARD}`), 2000);
      }
    },
  });
  

  const [uplineId, setUplineId] = useState<number | undefined>(uplineIdFromState || 1);
  const [pendingRegistrationArgs, setPendingRegistrationArgs] = useState<[string] | null>(null);
  const totalBusdAllowanceAmount = parseUnits(import.meta.env.VITE_ALL_LEVEL_TOTAL_BUSD, 18);

  const isOverallProcessing =
    isUserFetching ||
    isFetchingBalances ||
    isApprovalTxProcessing ||
    isRegistrationTxProcessing;

  useEffect(() => {
    if (isApprovalConfirmed && pendingRegistrationArgs) {
      executeRegistration({
        address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
        abi: ContractABI,
        functionName: "registrationExt",
        args: pendingRegistrationArgs,
      });
      setPendingRegistrationArgs(null);
    }
  }, [isApprovalConfirmed, pendingRegistrationArgs, executeRegistration]);

  // Handle button hover - fetch balances when user hovers over the button
  const handleButtonHover = useCallback(() => {
    if (isConnected && address) {
      refetchWalletBalances();
    }
  }, [isConnected, address, refetchWalletBalances]);

  const handleRegister = useCallback(async () => {
    
    await refetchWalletBalances();

    if (!uplineId) {
      showSnackbar({ message: "Please enter your upline ID.", severity: "warning" });
      return;
    }
   

    if (isOverallProcessing) return;

    try {
      const existingUser = await getUser({ wallet_address: address }).unwrap();
      if (existingUser?.id) {
        showSnackbar({ message: "You are already registered! Redirecting...", severity: "info" });
        setTimeout(() => navigate(`/${RoutePaths.DASHBOARD}`), 1500);
        return;
      }

      const uplineUser = await getUser({ id: Number(uplineId) }).unwrap();
      if (!uplineUser?.wallet_address) {
        showSnackbar({ message: "Upline ID does not exist.", severity: "error" });
        return;
      }

      if (!checkNativeTokenForGas(nativeTokenBalance, chain?.nativeCurrency?.symbol)) {
        return;
      }

      if (!checkBusdBalance(busdBalance, totalBusdRequiredForRegistration)) {
        return;
      }

      if (!checkBusdAllowance(busdAllowance, ALL_LEVELS_TOTAL)) {
        showSnackbar({ message: "Approving BUSD...", severity: "info" });
        executeApproval({
          address: import.meta.env.VITE_BUSD_CONTRACT_ADDRESS as `0x${string}`,
          abi: BUSD_ABI,
          functionName: "approve",
          args: [import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`, totalBusdAllowanceAmount],
        });
        setPendingRegistrationArgs([uplineUser.wallet_address]);
        return;
      } else {
        showSnackbar({ message: "BUSD allowance is sufficient. Proceeding with registration...", severity: "info" });
        refetchWalletBalances();
      }

      executeRegistration({
        address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
        abi: ContractABI,
        functionName: "registrationExt",
        args: [uplineUser.wallet_address],
      });
    } catch (err: any) {
      console.error("Registration initiation failed:", err);
      if (!isApprovalTxProcessing && !isRegistrationTxProcessing) {
         showSnackbar({ message: `Operation failed. ${err.message || ''}`, severity: "error" });
      }
      disconnect();
    }
  }, [
    uplineId,
    isConnected,
    address,
    isOverallProcessing,
    getUser,
    navigate,
    openConnectModal,
    nativeTokenBalance,
    chain?.nativeCurrency?.symbol,
    busdBalance,
    totalBusdRequiredForRegistration,
    busdAllowance,
    ALL_LEVELS_TOTAL,
    totalBusdAllowanceAmount,
    executeApproval,
    executeRegistration,
    pendingRegistrationArgs,
    disconnect,
  ]);

  const buttonText = useCallback(() => {
    if (isOverallProcessing) {
      if (isApprovalTxProcessing) return "Approving BUSD...";
      if (isRegistrationTxProcessing) return "Registering...";
      return "Processing...";
    }
    if (!isConnected) return "Connect Wallet";
    if (typeof busdAllowance === "bigint" && !checkBusdAllowance(busdAllowance, ALL_LEVELS_TOTAL)) {
      return "Approve BUSD";
    }
    return "Register Now";
  }, [isOverallProcessing, isConnected, busdAllowance, ALL_LEVELS_TOTAL, isApprovalTxProcessing, isRegistrationTxProcessing]);


  const cardStyle = {
    p: 2,
    borderRadius: "20px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <Grid container sx={{ py: { xs: 2, sm: 2, md: 20 } }}>
      <Grid size={{ xs: 12, sm: 12, md: 8 }} offset={{ xs: 0, sm: 0, md: 2 }}>
        <Card sx={cardStyle}>
          <CardContent>
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, sm: 12, md: 8 }}>
                <Box display="flex" gap={2} alignItems="center" mb={2}>
                  <img src={LOGO} alt="Platform Logo" width="100" />
                  <Divider orientation="vertical" flexItem />
                  <img src={BINANCE_LOGO} alt="Binance Logo" width="50" />
                </Box>
                <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: 'primary.main' }}>
                  Unlock Your Earning Potential
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: "90%", color: 'text.secondary' }}>
                  Join our decentralized platform with just a crypto wallet and an upline ID. Start your journey towards financial growth today!
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <Box py={3} display="flex" flexDirection="column" gap={3}>
                  <TextField
                    fullWidth
                    size="medium"
                    type="number"
                    label="Upline ID"
                    inputProps={{ min: 1 }}
                    value={uplineId ?? ""}
                    onChange={(e) => {
                      const val = Number(e.target.value.trim());
                      if (Number.isInteger(val) && val > 0) {
                        setUplineId(val);
                      } else if (e.target.value.trim() === "") {
                        setUplineId(undefined);
                      }
                    }}
                    helperText="Enter the ID of your referrer"
                  />
                  <Button
                    fullWidth
                    onClick={isConnected ? handleRegister : openConnectModal}
                    onMouseEnter={handleButtonHover} 
                    size="large"
                    variant="contained"
                    disabled={isOverallProcessing}
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                  >
                    {buttonText()}
                  </Button>
                  {!isConnected && (
                    <Typography variant="caption" color="text.secondary" textAlign="center">
                      Connect your wallet to begin registration.
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SignUp;