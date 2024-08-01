import { useState } from "react";
import { useDispatch } from "react-redux";

import { setFilterSliceSearch } from "../../features/filter/filterSlice";

import { Button } from "@mui/material";
import styles from "../../styles/searchBox.module.css";
import SearchIcon from "@mui/icons-material/Search";

function SearchBox() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const searchHandler = () => {
    dispatch(setFilterSliceSearch(search));

    setSearch("");
  };

  return (
    <>
      <span className={styles.search_container}>
        <input
          className={styles.search_input}
          type="text"
          placeholder="جستجو در همه ی آگهی ها"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
        />
        <Button
          variant="outlined"
          sx={{ width: "40px" }}
          size="small"
          onClick={searchHandler}
        >
          <SearchIcon />
        </Button>
      </span>
    </>
  );
}

export default SearchBox;
