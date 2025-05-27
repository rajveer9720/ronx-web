import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Fade,
  Paper,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import TrapFocus from "@mui/material/Unstable_TrapFocus";
import { Link as RouterLink } from "react-router-dom";
import { RoutePaths } from "../../utils/routes";
import { useAccount } from "wagmi";
import { useAppSelector } from "../../store/hooks/hook";
import { selectCurrentUser } from "../../store/slices/authSlice";

const SignupDialog = () => {
  const { isConnected } = useAccount();
  const currentUser = useAppSelector(selectCurrentUser);
  const [bannerOpen, setBannerOpen] = useState<boolean>(false);

  const closeBanner = () => {
    localStorage.setItem("signupBannerClosed", "true");
    setBannerOpen(false);
  };

  useEffect(() => {
    const bannerDismissed =
      localStorage.getItem("signupBannerClosed") === "true";
    if (isConnected && !currentUser && !bannerDismissed) {
      setBannerOpen(true);
    } else {
      setBannerOpen(false);
    }
  }, [isConnected, currentUser]);

  return (
    <>
      <TrapFocus open disableAutoFocus disableEnforceFocus>
        <Fade appear={false} in={bannerOpen}>
          <Paper
            role="dialog"
            aria-modal="false"
            aria-label="Cookie banner"
            square
            variant="outlined"
            tabIndex={-1}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              m: 0,
              p: 2,
              borderWidth: 0,
              borderTopWidth: 1,
              zIndex: 1200,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{ justifyContent: "space-between", gap: 2 }}
            >
              <Box
                sx={{
                  flexShrink: 1,
                  alignSelf: { xs: "flex-start", sm: "center" },
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Don't have an account?
                </Typography>
                <Typography variant="body2">
                  Sign up now to get started with our platform and unlock
                  exclusive features.
                </Typography>
              </Box>
              <Stack
                direction={{
                  xs: "row-reverse",
                  sm: "row",
                }}
                sx={{
                  gap: 2,
                  flexShrink: 0,
                  alignSelf: { xs: "flex-end", sm: "center" },
                }}
              >
                <Link
                  component={RouterLink}
                  underline="none"
                  to={RoutePaths.LOGIN}
                >
                  <Button>Get started</Button>
                </Link>

                <Button onClick={closeBanner} color="inherit">
                  Not now
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Fade>
      </TrapFocus>
    </>
  );
};

export default SignupDialog;
