import { Breadcrumbs, Typography, Box, Link } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";

const PageHeader = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} underline="hover" color="inherit" to="/">
          Home
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={to} color="text.primary">
              {decodeURIComponent(value)}
            </Typography>
          ) : (
            <Link
              component={RouterLink}
              underline="hover"
              color="inherit"
              key={to}
              to={to}
            >
              {decodeURIComponent(value)}
            </Link>
          );
        })}
      </Breadcrumbs>
      <Typography
        variant="h4"
        sx={{ mt: 1, fontWeight: 600, textTransform: "capitalize" }}
      >
        {pathnames[pathnames.length - 1]?.replace(/-/g, " ") || "Dashboard"}
      </Typography>
    </Box>
  );
};

export default PageHeader;
