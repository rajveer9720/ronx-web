import { Card, Box, Typography, Avatar, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
}

const DashboardCard = (props: DashboardCardProps) => {
  const theme = useTheme();
  const { title, icon, children } = props;

  return (
    <Card sx={cardStyle}>
      <Box
        display={"flex"}
        alignItems={"center"}
        sx={{ gap: { xs: 1, sm: 2, md: 2 } }}
      >
        <Avatar
          sx={{
            bgcolor: theme.palette.action.focus,
            width: 56,
            height: 56,
          }}
          variant="rounded"
        >
          {icon}
        </Avatar>
        <Box>
          <Typography variant="button" textTransform={"capitalize"}>
            {title}
          </Typography>
          {children}
        </Box>
      </Box>
    </Card>
  );
};

const cardStyle = {
  p: { xs: 1, sm: 1, md: 2 },
  borderRadius: "20px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)",
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export default DashboardCard;
