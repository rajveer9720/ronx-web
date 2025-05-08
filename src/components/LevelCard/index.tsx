import { AccountBalanceWallet, Cached, People, Tag } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Tooltip,
  Typography,
  useColorScheme,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ILevel } from "../../interfaces/level";
import { getBgColor } from "../../utils/levelUtils";
interface LevelCardProps {
  levelData: ILevel;
  large?: boolean;
  disabled?: boolean;
  route?: string;
}

const LevelCard = (props: LevelCardProps) => {
  const theme = useTheme();
  const { mode } = useColorScheme();
  const { levelData, large, disabled, route } = props;

  return (
    <Card
      sx={{
        boxShadow: 0,
        borderRadius: 2,
        backgroundColor:
          getBgColor(levelData, theme) || theme.palette.action.hover,
        color: levelData?.active
          ? theme.palette.primary.contrastText
          : theme.palette.common[mode === "dark" ? "white" : "black"],
      }}
    >
      <CardActionArea
        disableRipple={disabled}
        disableTouchRipple={disabled}
        component={RouterLink}
        to={large ? "" : route || ""}
        state={levelData}
      >
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
                  {levelData.level}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant={large ? "h4" : "subtitle2"}
              fontWeight={large ? 600 : undefined}
            >
              {levelData.busd}
            </Typography>
          </Box>

          <Box>
            {!levelData?.active && large ? (
              <Box textAlign={"center"} gap={large ? 5 : 2} py={large ? 4 : 2}>
                <Typography variant={"body1"}>Buy it now</Typography>
                <Typography variant={"h2"} fontWeight={700}>
                  {levelData.busd} BUSD
                </Typography>
              </Box>
            ) : (
              <Box
                visibility={
                  !levelData?.active || levelData?.missed_revenue
                    ? "hidden"
                    : "visible"
                }
                display={"flex"}
                justifyContent="center"
                gap={large ? 5 : 2}
                py={large ? 4 : 2}
              >
                <Card
                  sx={{
                    boxShadow: 0,
                    borderRadius: large ? 1.5 : undefined,
                    backgroundColor: '#002de3',
                    p: large ? 5 : 2.5,
                  }}
                />
                <Card
                  sx={{
                    boxShadow: 0,
                    borderRadius: large ? 1.5 : undefined,
                    backgroundColor: getBgColor(levelData, theme),
                    p: large ? 5 : 2.5,
                  }}
                />
                <Card
                  sx={{
                    boxShadow: 0,
                    borderRadius: large ? 1.5 : undefined,
                    backgroundColor: getBgColor(levelData, theme),
                    p: large ? 5 : 2.5,
                  }}
                />
              </Box>
            )}
          </Box>

          <Box
            visibility={
              !levelData?.active || levelData?.missed_revenue
                ? "hidden"
                : "visible"
            }
            display="flex"
            justifyContent={large ? "end" : "space-between"}
            alignItems="center"
            gap={large ? 5 : 0}
          >
            <Tooltip title="Partners" placement="top" color="info" arrow>
              <Chip
                size={large ? "medium" : "small"}
                color="info"
                icon={<People />}
                label={levelData.people}
              />
            </Tooltip>

            <Tooltip title="Cycles" placement="top" arrow>
              <Chip
                size={large ? "medium" : "small"}
                color="info"
                icon={<Cached />}
                label={levelData.cycles}
              />
            </Tooltip>

            {large && levelData.revenue && (
              <Tooltip title="Total Revenue" placement="top" arrow>
                <Chip
                  size={large ? "medium" : "small"}
                  color="info"
                  icon={<AccountBalanceWallet />}
                  label={levelData.revenue}
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
