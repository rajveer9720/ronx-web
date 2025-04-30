import { AccountBalanceWallet, Cached, People, Tag } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

interface LevelCardProps {
  level?: number;
  busd?: number;
  people?: number;
  cycles?: number;
  large?: boolean;
  revenue?: number;
  disabled?: boolean;
}

const LevelCard = (props: LevelCardProps) => {
  const theme = useTheme();
  const { level, busd, people, cycles, large, revenue, disabled } = props;

  return (
    <Card
      sx={{
        boxShadow: 0,
        borderRadius: 2,
        backgroundColor: theme.palette.action.hover,
      }}
    >
      <CardActionArea disableRipple={disabled} disableTouchRipple={disabled}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" gap={1} alignItems="center">
              <Typography
                variant={large ? "h4" : "subtitle2"}
                fontWeight={large ? 600 : undefined}
                sx={{ verticalAlign: "center" }}
              >
                Level
              </Typography>

              <Box display="flex" alignItems="center">
                <Tag fontSize={large ? "large" : "small"} />
                <Typography
                  variant={large ? "h4" : "subtitle2"}
                  fontWeight={large ? 600 : undefined}
                  sx={{ verticalAlign: "center" }}
                >
                  {level}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant={large ? "h4" : "subtitle2"}
              fontWeight={large ? 600 : undefined}
            >
              {busd}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            justifyContent="center"
            gap={large ? 5 : 2}
            py={large ? 4 : 2}
          >
            <Card
              sx={{
                boxShadow: 1,
                borderRadius: large ? 1.5 : undefined,
                backgroundColor: theme.palette.action.hover,
                p: large ? 5 : 2.5,
              }}
            />
            <Card
              sx={{
                boxShadow: 1,
                borderRadius: large ? 1.5 : undefined,
                backgroundColor: theme.palette.action.hover,
                p: large ? 5 : 2.5,
              }}
            />
            <Card
              sx={{
                boxShadow: 1,
                borderRadius: large ? 1.5 : undefined,
                backgroundColor: theme.palette.action.hover,
                p: large ? 5 : 2.5,
              }}
            />
          </Box>

          <Box
            display="flex"
            justifyContent={large ? "end" : "space-between"}
            alignItems="center"
            gap={large ? 5 : 0}
          >
            <Tooltip title="Partners" placement="top" arrow>
              <Chip
                size={large ? "medium" : "small"}
                color="primary"
                icon={<People />}
                label={people}
              />
            </Tooltip>

            <Tooltip title="Cycles" placement="top" arrow>
              <Chip
                size={large ? "medium" : "small"}
                color="primary"
                icon={<Cached />}
                label={cycles}
              />
            </Tooltip>

            {revenue && (
              <Tooltip title="Total Revenue" placement="top" arrow>
                <Chip
                  size={large ? "medium" : "small"}
                  color="primary"
                  icon={<AccountBalanceWallet />}
                  label={revenue}
                />
              </Tooltip>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LevelCard;
