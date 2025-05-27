import { Clear, Search } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  styled,
  SxProps,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  selectSearchTerm,
  setSearchTerm,
} from "../../store/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hook";

interface SearchFieldProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  styles?: SxProps;
}

const SearchField = (props: SearchFieldProps) => {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const { placeholder, onSearch, styles } = props;
  const [searchValue, setSearchValue] = useState<string>(searchTerm || "");

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
    onSearch?.(searchValue);
  };

  const clearSearch = () => {
    setSearchValue("");
    dispatch(setSearchTerm(""));
    onSearch?.("");
  };

  return (
    <SearchStyled>
      <TextField
        fullWidth
        placeholder={placeholder || "Search…"}
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        sx={styles}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={(event) => {
                    event.preventDefault();
                    searchTerm ? clearSearch() : handleSearch(searchValue);
                  }}
                  edge="end"
                >
                  {searchTerm ? <Clear /> : <Search />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </SearchStyled>
  );
};

const SearchStyled = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export default SearchField;
