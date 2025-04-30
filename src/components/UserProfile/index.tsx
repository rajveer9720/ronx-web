import { Person } from "@mui/icons-material";
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
import { AVATAR } from "../../utils/constants";

const UserProfile = () => {
  const userDetails = [
    { label: "ID Number", value: 119 },
    { label: "Username", value: "Ronxald" },
    { label: "Wallet Address", value: "x0x0x0x0x0x0x0x0x0" },
    { label: "Upline ID", value: 1 },
    { label: "Onboarding at", value: "2023-10-01" },
  ];

  return (
    <Card sx={cardStyle}>
      <Box display={"flex"} alignItems={"center"}>
        <Person color="primary" />
        <Typography variant="h6" mx={1}>
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
          <img src={AVATAR} alt="User Avatar" width={150} height={150} />
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
  border: "1px solid #e0e0e0",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export default UserProfile;
