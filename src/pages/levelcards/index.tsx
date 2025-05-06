import {
  Box,
  Button,
  Chip,
  Grid,
  Typography,
  Link,
  ButtonGroup,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  Tag,
} from "@mui/icons-material";
import { LevelCard } from "../../components";
import { useParams } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import { useEffect, useState } from "react";
import { IProgram } from "../../interfaces/program";
import { getPrograms } from "../../api/program";
import { getLevelsByParams } from "../../api/level";
import { ILevel } from "../../interfaces/level";
import { data as UserData } from "../../mock";
import { Link as RouterLink } from "react-router-dom";
import { EmptyLevel } from "../../utils/levelUtils";
import { Slots } from "../../utils/slots";

const LevelCards = () => {
  const { name, level } = useParams();
  const { showLoader, hideLoader } = useLoader();
  const [program, setProgram] = useState<IProgram>({} as IProgram);
  const [currentLevel, setCurrentLevel] = useState<ILevel>({} as ILevel);
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(
    Number(level) || 0
  );

  const fetchProgram = async () => {
    showLoader();
    try {
      const response = await getPrograms();
      const data: IProgram[] = response.data;
      const prog =
        data.find(
          (program) => program.name.toLowerCase() == name?.toLowerCase()
        ) || data[0];
      setProgram(prog);
      fetchLevels(prog);
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      hideLoader();
    }
  };

  const fetchLevels = async (program: IProgram) => {
    showLoader();
    try {
      const emptyLvl: ILevel = {
        ...EmptyLevel,
        level: currentLevelIndex || 0,
        busd: Slots[currentLevelIndex - 1 || 0],
        program: program,
      };
      const response = await getLevelsByParams(
        UserData.id,
        program.id,
        currentLevelIndex
      );
      const data = response.data;
      setCurrentLevel(data[0] || emptyLvl);
    } catch (error) {
      console.error("Error fetching levels:", error);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchProgram();
  }, []);

  useEffect(() => {
    fetchLevels(program);
  }, [currentLevelIndex]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 6 }} offset={{ xs: 0, sm: 0, md: 3 }}>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Typography variant="h6" fontWeight={600}>
            Upline ID
          </Typography>
          <Chip size="small" color="primary" icon={<Tag />} label={"123"} />
        </Box>

        <Box py={2}>
          <LevelCard large={true} disabled={false} levelData={currentLevel} />
        </Box>

        <Box display={"flex"} justifyContent="space-between">
          <Link
            component={RouterLink}
            underline="none"
            to={
              `/program/${name?.toLowerCase()}` +
              `/level/${currentLevel.level - 1}`
            }
          >
            <Button
              size="large"
              variant="contained"
              startIcon={<ChevronLeft />}
              onClick={() => {
                setCurrentLevelIndex((prev) => prev - 1);
              }}
            >
              Level {currentLevel.level - 1}
            </Button>
          </Link>

          <ButtonGroup
            variant="outlined"
            sx={{ display: !currentLevel.active ? "none" : "flex" }}
          >
            <Button variant="contained">
              <ExpandLess />
            </Button>
            <Button disableRipple color="inherit">
              Cycles: {currentLevel.cycles}
            </Button>
            <Button variant="contained">
              <ExpandMore />
            </Button>
          </ButtonGroup>

          <Link
            component={RouterLink}
            underline="none"
            to={
              `/program/${name?.toLowerCase()}` +
              `/level/${currentLevel.level + 1}`
            }
          >
            <Button
              size="large"
              variant="contained"
              endIcon={<ChevronRight />}
              onClick={() => {
                setCurrentLevelIndex((prev) => prev + 1);
              }}
            >
              Level {currentLevel.level + 1}
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LevelCards;
