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
import { selectCurrentUser } from "../../store/slices/authSlice";

const Program = () => {
  const { name } = useParams();
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const { data: programs, isLoading: isProgramLoading } = useGetProgramsQuery();
  const program: IProgram | undefined = programs?.find(
    (program) => program.name.toLowerCase() === name?.toLowerCase()
  );

  const { data: userLevels, isLoading: isUserLevelLoading } =
    useGetUserLevelsQuery({
      user_id: Number(searchTerm) || loggedInUser?.id || 1,
      program_id: program?.id,
      page: 1,
      limit: 100,
    });
  const placeholderLevels =
    program?.levels
      .slice(userLevels?.pagination?.total_items)
      .map((programLevel) => ({
        ...EmptyUserLevel,
        level: programLevel,
      })) || [];
  const finalLevels = [...(userLevels?.data || []), ...placeholderLevels];

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
