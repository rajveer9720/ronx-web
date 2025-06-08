import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { useGetUserQuery } from "../../store/apis/userApi";
import { UserProfile } from "../../components";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks/hook";
import { hideLoader, showLoader } from "../../store/slices/loaderSlice";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { RoutePaths } from "../../utils/routes";

const Invite = () => {
  const { refer_code } = useParams();
  const dispatch = useAppDispatch();
  const { data: user, isLoading: isUserLoading } = useGetUserQuery({
    refer_code,
  });

  useEffect(() => {
    if (isUserLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [, isUserLoading]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Typography variant="h4" fontWeight={700} mb={2}>
          Invitation
        </Typography>
        <Typography variant="body1" fontWeight={400} mb={2}>
          You have been invited to join the team and earn rewards for each
          successful referral.
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, sm: 12, md: 4 }} offset={{ xs: 0, sm: 0, md: 4 }}>
        <Box display={"flex"} gap={2} flexDirection={"column"}>
          <Typography variant="h6" fontWeight={700} textAlign={"center"}>
            Invitation from
          </Typography>
          {user && <UserProfile data={user} />}
          <Link
            component={RouterLink}
            underline="none"
            to={`/${RoutePaths.SIGNUP}`}
            state={{ upline_id: user?.id }}
          >
            <Button fullWidth size="large">
              Join team
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Invite;
