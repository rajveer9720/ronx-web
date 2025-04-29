import { ContentCopy, InfoOutline, PeopleRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const UserProfile = () => {
  const userDetails = [
    { label: "ID Number", value: 119 },
    { label: "Username", value: "Ronxald" },
    { label: "Wallet Address", value: "x0x0x0x0x0x0x0x0x0" },
    { label: "Upline ID", value: 1 },
    { label: "Onboarding at", value: "2023-10-01" },
  ];

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 4 }}>
        <Card sx={cardStyle}>
          <Box display={"flex"} alignItems={"center"}>
            <PeopleRounded color="primary" />
            <Typography variant="h6" mx={1}>
              User Profile
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
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
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 4 }} offset={{ md: 4 }}>
        <Card sx={cardStyle}>
          <Box display={"flex"} alignItems="center">
            <Typography variant="h6">Referral Link</Typography>
            <IconButton color="info" sx={{ mx: 1 }}>
              <InfoOutline />
            </IconButton>
          </Box>

          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography variant="body2">ronx.io/b/s41c6l</Typography>
            <Button
              size="small"
              startIcon={<ContentCopy />}
              variant="outlined"
              sx={{ ml: 2 }}
            >
              Copy
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
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
