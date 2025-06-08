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
    <Box display={bannerOpen ? "block" : "none"}>
      <TrapFocus open disableAutoFocus disableEnforceFocus>
        <Fade appear={false} in={bannerOpen}>
          <Paper
            role="dialog"
            aria-modal="false"
            aria-label="Cookie banner"
            square
            variant="outlined"
            tabIndex={-1}
            sx={{ px: 4, py: 1 }}
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
                  You are not a registered user!
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
                  <Button size="small" variant="contained">
                    Get started
                  </Button>
                </Link>

                <Button
                  size="small"
                  variant="contained"
                  onClick={closeBanner}
                  color="inherit"
                >
                  Not now
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Fade>
      </TrapFocus>
    </Box>
  );
};

export default SignupDialog;
