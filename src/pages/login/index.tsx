import {
  Button,
  Typography,
  useTheme,
  styled,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";
import { showSnackbar } from "../../components/SnackbarUtils";
import { IUserAuth } from "../../interfaces/auth";
import { userLogin } from "../../api/auth";
import { LOGO } from "../../utils/constants";

const Login = () => {
  const theme = useTheme();
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
      const response: any = await userLogin(payload);
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
      handleLogin();
    }
  }, [isConnected, address]);

  return (
    <LoginContainer direction="column" justifyContent="space-between">
      <LoginCard variant="outlined">
        <CardContent>
          <img src={LOGO} alt="Logo" width="150" />
          <Typography
            variant="h5"
            fontWeight={500}
            textAlign="center"
            py={4}
            my={4}
          >
            Login using your wallet
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={handleWalletConnect}
            disabled={isConnected && address ? true : false}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              py: 1.2,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: theme.shadows[4],
              },
            }}
          >
            Connect Wallet
          </Button>
        </CardContent>
      </LoginCard>
    </LoginContainer>
  );
};

const LoginCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const LoginContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default Login;
