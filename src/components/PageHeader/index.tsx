import { ChevronRight, HomeFilled } from "@mui/icons-material";
import { Breadcrumbs, Typography, Box, Link } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";

const PageHeader = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const nonClickablePaths: (string | RegExp)[] = [
    "/program", // no explicit /program route
    /^\/program\/[^\/]+\/level$/, // matches /program/:name/level intermediate path
  ];

  const isNonClickable = (path: string) => {
    return nonClickablePaths.some((pattern) =>
      pattern instanceof RegExp ? pattern.test(path) : pattern === path
    );
  };

  const getPageTitle = (pathname: string): string => {
    const matchProgram = pathname.match(/^\/program\/([^\/]+)$/);
    if (matchProgram) {
      return `Program: ${decodeURIComponent(matchProgram[1])}`;
    }

    const matchLevel = pathname.match(/^\/program\/([^\/]+)\/level\/([^\/]+)$/);
    if (matchLevel) {
      const [_, programName, level] = matchLevel;
      return `Level ${level} of ${decodeURIComponent(programName)}`;
    }

    // fallback to last segment or default
    const segments = pathname.split("/").filter(Boolean);
    return segments[segments.length - 1]?.replace(/-/g, " ") || "Dashboard";
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<ChevronRight fontSize="small" />}
        sx={{
          "& .MuiBreadcrumbs-separator": {
            margin: 0.2,
          },
        }}
      >
        <Link
          component={RouterLink}
          underline="hover"
          color="inherit"
          to="/dashboard"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HomeFilled sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const label = decodeURIComponent(value.replace(/-/g, " "));

          if (isNonClickable(to)) {
            return (
              <Typography
                key={to}
                color="text.primary"
                sx={{ textTransform: "capitalize" }}
              >
                {label}
              </Typography>
            );
          }

          return (
            <Link
              sx={{ textTransform: "capitalize" }}
              component={RouterLink}
              underline="hover"
              color="inherit"
              key={to}
              to={to}
            >
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>
      <Typography
        variant="h4"
        sx={{ mt: 1, fontWeight: 700, textTransform: "capitalize" }}
      >
        {getPageTitle(location.pathname)}
      </Typography>
    </Box>
  );
};

export default PageHeader;
