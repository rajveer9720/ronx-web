import { Search } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  styled,
  SxProps,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface SearchFieldProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  styles?: SxProps;
}

const SearchField = (props: SearchFieldProps) => {
  const { placeholder, onSearch, styles } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <SearchStyled>
      <TextField
        fullWidth
        placeholder={placeholder || "Search…"}
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        sx={styles}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={(event) => {
                    event.preventDefault();
                    onSearch(searchValue);
                  }}
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
