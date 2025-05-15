import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  useTheme,
  Link,
  ListItemButton,
  ListItemText,
  List,
  ListItem,
  ListItemAvatar,
  Badge,
  Avatar,
  Tooltip,
  CardActions,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  EmptyUserLevel,
  getLevelIcon,
  getLevelIconBgColor,
} from "../../utils/levelUtils";
import { IProgram } from "../../interfaces/program";
import { LockOpenRounded, LockRounded } from "@mui/icons-material";
import { useGetUserLevelsQuery } from "../../store/apis/userlevelApi";

interface ProgramCardProps {
  textPrimary?: string;
  textSecondary?: string;
  program: IProgram;
  href: string;
}

const ProgramCard = (props: ProgramCardProps) => {
  const theme = useTheme();
  const { textPrimary, href, program } = props;
  const { data: userLevels } = useGetUserLevelsQuery({ user_id: 1 });

  const filteredUserLevels =
    userLevels?.filter((level) => level.level.program.id === program.id) || [];

  const placeholderLevels = program.levels
    .slice(filteredUserLevels.length, 3)
    .map((programLevel) => ({
      ...EmptyUserLevel,
      level: programLevel,
    }));

  const finalLevels =
    filteredUserLevels.length >= 3
      ? filteredUserLevels.reverse().slice(0, 3)
      : [...filteredUserLevels, ...placeholderLevels].reverse();

  return (
    <Card sx={cardStyle}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}
      >
        <Typography variant="h5" mx={1} fontWeight={700}>
          {textPrimary}
        </Typography>

        <Link component={RouterLink} underline="none" to={href}>
          <Button variant="outlined" color="primary">
            View All
          </Button>
        </Link>
      </Box>

      <Divider sx={{ my: 1 }} />

      <List dense>
        {finalLevels?.map((level, index) => {
          return (
            <ListItemButton
              component={RouterLink}
              to={`${href}/level/${level.level.level}`}
              key={index}
            >
              <ListItem
                secondaryAction={
                  <ListItemAvatar>
                    <Tooltip
                      placement="top"
                      title={level.active ? "Unlocked" : "Locked"}
                      arrow
                    >
                      <Badge
                        overlap="rectangular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          level.active && (
                            <Avatar
                              sizes="small"
                              color="primary"
                              variant="circular"
                              sx={{
                                width: 24,
                                height: 24,
                                bgcolor: theme.palette.primary.dark,
                                boxShadow: 4,
                              }}
                            >
                              {getLevelIcon(level)}
                            </Avatar>
                          )
                        }
                      >
                        <Avatar
                          variant="rounded"
                          sx={{
                            bgcolor: getLevelIconBgColor(level, theme),
                          }}
                        >
                          {level.active ? (
                            <LockOpenRounded sx={{ color: "white" }} />
                          ) : (
                            <LockRounded />
                          )}
                        </Avatar>
                      </Badge>
                    </Tooltip>
                  </ListItemAvatar>
                }
              >
                <ListItemText
                  primary={`Level #${level.level.level}`}
                  secondary={`Revenue: ${level.revenue} BUSD`}
                />
              </ListItem>
            </ListItemButton>
          );
        })}
      </List>

      <CardActions sx={{ display: "flex", justifyContent: "center", px: 5 }}>
        <Button variant="contained" color="primary" fullWidth>
          Upgrade
        </Button>
      </CardActions>
    </Card>
  );
};

const cardStyle = {
  borderRadius: "20px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export default ProgramCard;
