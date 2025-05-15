import { Card, Grid, Typography, useTheme } from "@mui/material";

interface GridX4Props {
  size: number;
  large?: boolean;
  hide?: boolean;
}

const GridX4 = (props: GridX4Props) => {
  const theme = useTheme();
  const { size, large, hide } = props;

  return (
    <>
      {Array.from({ length: size }, (_, index) => (
        <Grid
          visibility={hide ? "hidden" : "visible"}
          size={{ xs: 6, sm: 6, md: 6 }}
          display={"flex"}
          justifyContent={"center"}
          key={index}
        >
          <Card
            sx={{
              boxShadow: 0,
              borderRadius: large ? 1.5 : undefined,
              backgroundColor: theme.palette.primary.main,
              p: 2,
            }}
          >
            <Typography variant="caption">{large ? "79056" : null}</Typography>
          </Card>
        </Grid>
      ))}

      {Array.from({ length: 4 }, (_, index) => (
        <Grid
          visibility={hide ? "hidden" : "visible"}
          size={{ xs: 3, sm: 3, md: 3 }}
          display={"flex"}
          justifyContent={"center"}
          key={index}
        >
          <Card
            sx={{
              boxShadow: 0,
              borderRadius: large ? 1.5 : undefined,
              backgroundColor: theme.palette.primary.main,
              p: 2,
            }}
          >
            <Typography variant="caption">{large ? "79056" : null}</Typography>
          </Card>
        </Grid>
      ))}
    </>
  );
};
export default GridX4;
