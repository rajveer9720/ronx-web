import { Box, Button, IconButton } from "@mui/material";
import { LOGO } from "../../utils/constants";
import { Search } from "@mui/icons-material";
import { ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import SearchField from "../Search";

export const ToolbarActions = () => (
  <Box
    display={"flex"}
    alignItems="center"
    justifyContent="space-between"
    gap={0.5}
  >
    <Button variant="outlined" color="inherit" size="small">
      Connect Wallet
    </Button>
    <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
      <IconButton edge="end" color="inherit">
        <Search />
      </IconButton>
    </Box>
    {/* <ThemeSwitcher /> */}
  </Box>
);

export const ToolbarAppTitle = () => {
  return (
    <Box display={"flex"} alignItems="center" justifyContent="space-between">
      <Box>
        <img src={LOGO} alt="Logo" style={{ height: 40, marginLeft: -40 }} />
      </Box>
      <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
        <SearchField
          placeholder="Search by wallet address"
          styles={{ width: "55vw", left: "10%" }}
          onSearch={(val) => {
            console.log("searching", val);
          }}
        />
      </Box>
    </Box>
  );
};
