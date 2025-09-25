import { Search } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  styled,
  SxProps,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { selectSearchTerm } from "../../store/slices/searchSlice";
import { useAppSelector } from "../../store/hooks/hook";

interface SearchFieldProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  styles?: SxProps;
}

const SearchField = (props: SearchFieldProps) => {
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const { placeholder, onSearch, styles } = props;
  const [searchValue, setSearchValue] = useState<string>(searchTerm || "");

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSearch?.(searchValue.trim());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleIconClick = () => {
    handleSearch();
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
        onKeyPress={handleKeyPress}
        sx={styles}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={!searchValue.trim()}
                  size="small"
                  onClick={handleIconClick}
                  edge="end"
                >
                  <Search />
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
