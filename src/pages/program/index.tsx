import { Box, Typography, Card, Divider } from "@mui/material";
import { LevelList } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { IProgram } from "../../interfaces/program";
import { EmptyUserLevel } from "../../utils/levelUtils";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hook";
import { useGetProgramsQuery } from "../../store/apis/programApi";
import { useGetUserLevelsQuery } from "../../store/apis/userlevelApi";
import { hideLoader, showLoader } from "../../store/slices/loaderSlice";
import { selectSearchTerm } from "../../store/slices/searchSlice";

const Program = () => {
  const { name } = useParams();
  const dispatch = useAppDispatch();
  const searchTerm: string = useAppSelector(selectSearchTerm);
  const { data: programs, isLoading: isProgramLoading } = useGetProgramsQuery();
  const { data: userLevels, isLoading: isUserLevelLoading } =
    useGetUserLevelsQuery({ user_id: +searchTerm });
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
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography variant="h5" fontWeight={"bold"}>
          Program: {program?.name}
        </Typography>
      </Box>

      <Divider />

      <LevelList
        levels={finalLevels}
        href={`/program/${program?.name?.toLowerCase()}`}
      />
    </Card>
  );
};

export default Program;
