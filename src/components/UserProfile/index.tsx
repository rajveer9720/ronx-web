import { Tag } from "@mui/icons-material";
import {
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { IUser } from "../../interfaces/user";
import { getUserLabelValueArray } from "../../utils/userUtils";
import { AVATAR } from "../../utils/constants";
interface UserProfileProps {
  data: IUser;
}

const UserProfile = (props: UserProfileProps) => {
  const { data } = props;
  const userDetails = getUserLabelValueArray(data);

  return (
    <Card sx={cardStyle}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h5" fontWeight={700} mx={1}>
          User Profile
        </Typography>

        <Chip color="primary" icon={<Tag />} label={data?.id} />
      </Box>
      <Divider sx={{ my: 1 }} />
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        spacing={2}
        p={2}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12 }} textAlign={"center"}>
          <img src={AVATAR} alt="User Avatar" width={100} height={100} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <List disablePadding>
            {userDetails.map((detail, index) => (
              <ListItem key={index} disablePadding disableGutters>
                <ListItemText
                  primary={detail.label}
                  secondary={detail.value}
                  slotProps={{
                    secondary: {
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    },
                  }}
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
