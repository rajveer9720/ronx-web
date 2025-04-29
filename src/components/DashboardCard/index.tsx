import { Card, Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
}

const DashboardCard = (props: DashboardCardProps) => {
  const { title, icon, children } = props;
  return (
    <Card sx={cardStyle}>
      {icon && <Box mb={1}>{icon}</Box>}
      <Typography variant="h6" mb={1}>
        {title}
      </Typography>
      {children}
    </Card>
  );
};

const cardStyle = {
  p: 2,
  borderRadius: "20px",
  border: "1px solid #e0e0e0",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export default DashboardCard;
