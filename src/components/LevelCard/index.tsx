import {
  AcUnitRounded,
  CachedRounded,
  PeopleRounded,
  RedeemRounded,
  Tag,
  WarningAmberRounded,
} from "@mui/icons-material";
import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  getBgColor,
  getLevelListItems,
  getNodesData,
} from "../../utils/levelUtils";
import { IUserLevel } from "../../interfaces/user-levels";
import { PROGRAM_CONST } from "../../utils/slots";
import GridX3 from "../GridX3";
import GridX4 from "../GridX4";
import { useAppSelector } from "../../store/hooks/hook";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { ITransaction } from "../../interfaces/transaction";
import ContractABI from "../../abi/abi.json";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { showSnackbar } from "../../components/SnackbarUtils";
import { useGetProgramsQuery } from "../../store/apis/programApi";

interface LevelCardProps {
  userLevel: IUserLevel;
  transactions?: ITransaction[];
  large?: boolean;
  disabled?: boolean;
  route?: string;
  programName?: string;
  cycles?: number;
}

const LevelCard = (props: LevelCardProps) => {
  const { address } = useAccount();
  const theme = useTheme();
  const {
    userLevel,
    large,
    disabled,
    route,
    programName,
    transactions,
    cycles,
  } = props;
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: hash, writeContract } = useWriteContract();
  const program = useGetProgramsQuery().data?.find(
    (program) => program.name.toLowerCase() === programName?.toLowerCase()
  );
  const nodesData =
    getNodesData(theme, transactions || [], program?.id || 0) || [];
  const { isSuccess: isTransactionSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const handleUpgradeLevel = async (matrix: number, level: number) => {
    try {
      if (!address) {
        showSnackbar({
          message: "Wallet not connected.",
          severity: "warning",
        });
        return;
      }

      writeContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi: ContractABI,
        functionName: "buyNewLevel",
        args: [matrix, level],
      });
    } catch (err: any) {
      console.error("Upgrade failed:", err);
      showSnackbar({
        message: err?.reason || "Upgrade failed.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (isTransactionSuccess && hash) {
      showSnackbar({
        message: "upgrade successful.",
        severity: "success",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [isTransactionSuccess, hash]);

  return (
    <Card
      sx={{
        boxShadow: 0,
        borderRadius: 2,
        backgroundColor: getBgColor(userLevel, theme),
      }}
    >
      <CardActionArea
        disableRipple={disabled}
        disableTouchRipple={disabled}
        component={RouterLink}
        to={large ? "" : route || ""}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: large ? 7 : 12 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" gap={0.5} alignItems="center">
                  <Typography
                    variant={large ? "h4" : "subtitle1"}
                    fontWeight={large ? 600 : undefined}
                    sx={{ verticalAlign: "center" }}
                  >
                    Level
                  </Typography>

                  <Box display="flex" alignItems="center">
                    <Tag fontSize={large ? "large" : "small"} />
                    <Typography
                      variant={large ? "h4" : "subtitle1"}
                      fontWeight={large ? 600 : undefined}
                      sx={{ verticalAlign: "center" }}
                    >
                      {userLevel?.level?.level}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant={large ? "h4" : "subtitle1"}
                  fontWeight={large ? 600 : undefined}
                >
                  {userLevel?.level?.busd}
                </Typography>
              </Box>

              <Box>
                {!userLevel?.unlock && large ? (
                  <Box
                    textAlign={"center"}
                    gap={large ? 5 : 2}
                    py={large ? 4 : 2}
                  >
                    <Typography variant={"body1"}>
                      Unlock this level at
                    </Typography>
                    <Typography variant={"h2"} fontWeight={700}>
                      {userLevel?.level?.busd} BUSD
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        px: { xs: 5, md: 20 },
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!currentUser}
                        onClick={() =>
                          handleUpgradeLevel(
                            programName?.toLowerCase() === "x3" ? 1 : 2,
                            userLevel?.level?.level
                          )
                        }
                      >
                        Unlock now
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Grid container spacing={1} py={large ? 4 : 2}>
                    {programName?.toLowerCase() === PROGRAM_CONST.X3 && (
                      <GridX3 nodesData={nodesData} />
                    )}

                    {programName?.toLowerCase() === PROGRAM_CONST.X4 && (
                      <GridX4 nodesData={nodesData} />
                    )}
                  </Grid>
                )}
              </Box>

              <Box
                display={large ? "none" : "flex"}
                justifyContent={large ? "end" : "space-between"}
                alignItems="center"
                gap={large ? 5 : 0}
              >
                <Tooltip title="Partners" placement="top" color="info" arrow>
                  <Chip
                    size={large ? "medium" : "small"}
                    color={userLevel?.unlock ? "primary" : "default"}
                    icon={<PeopleRounded />}
                    label={55}
                  />
                </Tooltip>

                <Box
                  gap={large ? 5 : 2}
                  alignItems="center"
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  {userLevel?.freeze && (
                    <Tooltip title="Freeze" placement="top" arrow>
                      <AcUnitRounded sx={{ color: "white" }} fontSize="small" />
                    </Tooltip>
                  )}

                  {userLevel?.gift_revenue > 0 && (
                    <Tooltip title="Gift Revenue" placement="top" arrow>
                      <RedeemRounded sx={{ color: "white" }} fontSize="small" />
                    </Tooltip>
                  )}

                  {userLevel?.missed_revenue > 0 && (
                    <Tooltip title="Missed Revenue" placement="top" arrow>
                      <WarningAmberRounded
                        sx={{ color: "white" }}
                        fontSize="small"
                      />
                    </Tooltip>
                  )}
                </Box>

                <Tooltip title="Cycles" placement="top" arrow>
                  <Chip
                    size={large ? "medium" : "small"}
                    color={userLevel?.unlock ? "primary" : "default"}
                    icon={<CachedRounded />}
                    label={cycles}
                  />
                </Tooltip>
              </Box>
            </Grid>

            <Grid
              size={{ xs: 12, sm: 12, md: 0.5 }}
              sx={{ display: { xs: "none", md: large ? "block" : "none" } }}
            >
              <Divider orientation="vertical" />
            </Grid>
            <Grid
              size={{ xs: 12, sm: 12, md: 0.5 }}
              sx={{ display: { xs: large ? "block" : "none", md: "none" } }}
            >
              <Divider orientation="horizontal" />
            </Grid>

            <Grid
              size={{ xs: 12, sm: 12, md: 4 }}
              sx={{ display: large ? "block" : "none" }}
            >
              <List disablePadding>
                {getLevelListItems(userLevel, cycles)?.map((item, index) => {
                  const isLastItem =
                    index === getLevelListItems(userLevel).length - 1;

                  return (
                    <div key={index.toString()}>
                      <ListItem disableGutters disablePadding sx={{ py: 0.5 }}>
                        <ListItemAvatar>{item.icon}</ListItemAvatar>
                        <ListItemText
                          primary={item.value}
                          secondary={item.label}
                          slotProps={{
                            root: {
                              sx: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "row-reverse",
                              },
                            },
                          }}
                        />
                      </ListItem>
                      {!isLastItem && <Divider component="div" />}
                    </div>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LevelCard;
