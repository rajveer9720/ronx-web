import { Portrait } from "@mui/icons-material";
import {
  Box,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { IUser } from "../../interfaces/user";
import { getUserLabelValueArray } from "../../utils/userUtils";
interface UserProfileProps {
  data: IUser;
}

const UserProfile = (props: UserProfileProps) => {
  const { data } = props;
  const userDetails = getUserLabelValueArray(data);

  return (
    <Card sx={cardStyle}>
      <Box display={"flex"} alignItems={"center"}>
        <Portrait />
        <Typography variant="h6" fontWeight={700} mx={1}>
          User Profile
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Grid
        container
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid
          size={{ xs: 12, sm: 12, md: 6 }}
          textAlign={{ xs: "center", sm: "center", md: "left" }}
        >
          <img src={data?.avatar} alt="User Avatar" width={150} height={150} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <List disablePadding>
            {userDetails.map((detail, index) => (
              <ListItem key={index} disablePadding disableGutters>
                <ListItemText
                  primary={detail.label}
                  secondary={detail.value}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Card>
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

export default UserProfile;
