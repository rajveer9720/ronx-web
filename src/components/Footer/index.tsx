import { Logout } from "@mui/icons-material";
import {
  Box,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { logout } from "../../api/auth";
import { useDisconnect } from "wagmi";
import { useState } from "react";
import BackdropSpin from "../BackdropSpin";

interface FooterProps {
  role?: string;
  mini?: boolean;
}

const Footer = (props: FooterProps) => {
  const { role, mini } = props;
  const { disconnect } = useDisconnect();
  const currentYear = new Date().getFullYear();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);
    role === "user" && disconnect();
    await logout();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    window.location.href = role === "admin" ? "/admin/" : "/user";
  };

  return (
    <Box>
      <Divider />
      <ListItemButton
        sx={{ color: "#ff3333" }}
        onClick={() => {
          handleLogout();
        }}
      >
        <ListItemIcon sx={{ color: "#ff3333" }}>
          <Logout />
        </ListItemIcon>
        {!mini && <ListItemText primary={"Logout"} />}
      </ListItemButton>

      <Typography variant="caption" textAlign={"center"}>
        {!mini && `© ${currentYear} All rights reserved.`}
      </Typography>

      <BackdropSpin
        loading={loading}
        text={"Logging you out, please wait..."}
      />
    </Box>
  );
};

export default Footer;
