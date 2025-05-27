import {
  useTheme,
  ListItemButton,
  ListItemText,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Tooltip,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { getLevelIconBgColor } from "../../utils/levelUtils";
import {
  AcUnitRounded,
  LockOpenRounded,
  LockRounded,
  RedeemRounded,
  WarningAmberRounded,
} from "@mui/icons-material";
import { IUserLevel } from "../../interfaces/user-levels";

interface LevelListProps {
  levels: IUserLevel[];
  href: string;
}

const LevelList = (props: LevelListProps) => {
  const theme = useTheme();
  const { levels, href } = props;

  return (
    <List dense>
      {levels?.map((level, index) => {
        return (
          <ListItemButton
            component={RouterLink}
            to={`${href}/level/${level.level.level}`}
            key={index}
          >
            <ListItem
              secondaryAction={
                <Box gap={1} alignItems="center" sx={{ display: "flex" }}>
                  {level?.freeze && (
                    <Tooltip title="Freeze" placement="top" arrow>
                      <AcUnitRounded sx={{ color: "white" }} fontSize="small" />
                    </Tooltip>
                  )}

                  {level?.gift_revenue > 0 && (
                    <Tooltip title="Gift Revenue" placement="top" arrow>
                      <RedeemRounded sx={{ color: "white" }} fontSize="small" />
                    </Tooltip>
                  )}

                  {level?.missed_revenue > 0 && (
                    <Tooltip title="Missed Revenue" placement="top" arrow>
                      <WarningAmberRounded
                        sx={{ color: "white" }}
                        fontSize="small"
                      />
                    </Tooltip>
                  )}
                </Box>
              }
            >
              <ListItemAvatar>
                <Tooltip
                  placement="top"
                  title={level.unlock ? "Unlocked" : "Locked"}
                  arrow
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: getLevelIconBgColor(level, theme),
                    }}
                  >
                    {level.unlock ? (
                      <LockOpenRounded sx={{ color: "white" }} />
                    ) : (
                      <LockRounded />
                    )}
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>
              <ListItemText
                primary={`Level #${level.level.level}`}
                secondary={`Revenue: ${level.total_revenue} BUSD`}
              />
            </ListItem>
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default LevelList;
