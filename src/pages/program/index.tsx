import { Box, Typography, Card, Divider, Grid } from "@mui/material";
import { LevelCard } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { IProgram } from "../../interfaces/program";
import { EmptyUserLevel } from "../../utils/levelUtils";
import { useAppDispatch } from "../../store/hooks/hook";
import { useGetProgramsQuery } from "../../store/apis/programApi";
import { useGetUserLevelsQuery } from "../../store/apis/userlevelApi";
import { hideLoader, showLoader } from "../../store/slices/loaderSlice";

const Program = () => {
  const { name } = useParams();
  const dispatch = useAppDispatch();
  const { data: programs, isLoading: isProgramLoading } = useGetProgramsQuery();
  const { data: userLevels, isLoading: isUserLevelLoading } =
    useGetUserLevelsQuery({ user_id: 1 });
  const program: IProgram | undefined = programs?.find(
    (program) => program.name.toLowerCase() === name?.toLowerCase()
  );
  const filteredUserLevels =
    userLevels?.filter((level) => level.level.program.id === program?.id) || [];
  const placeholderLevels =
    program?.levels.slice(filteredUserLevels.length).map((programLevel) => ({
      ...EmptyUserLevel,
      level: programLevel,
    })) || [];
  const finalLevels = [...filteredUserLevels, ...placeholderLevels];

  useEffect(() => {
    if (isProgramLoading || isUserLevelLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isProgramLoading, isUserLevelLoading]);

  return (
    <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={"bold"}>
          Program: {program?.name}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2} py={2}>
        {finalLevels?.map((level, index) => {
          return (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={index.toString()}>
              <LevelCard
                programName={program?.name}
                userLevel={level}
                route={
                  `/program/${program?.name?.toLowerCase()}` +
                  `/level/${level?.level?.level}`
                }
              />
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};

export default Program;
