import { Card, Grid, Typography, useTheme } from "@mui/material";

interface GridX3Props {
  size: number;
  large?: boolean;
  hide?: boolean;
}

const GridX3 = (props: GridX3Props) => {
  const theme = useTheme();
  const { size, large, hide } = props;
  return (
    <>
      {Array.from({ length: size }, (_, index) => (
        <Grid
          visibility={hide ? "hidden" : "visible"}
          size={{ xs: 4, sm: 4, md: 4 }}
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

export default GridX3;
