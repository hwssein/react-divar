import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setFilterSliceSearch } from "../../features/filter/filterSlice";

import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/layout.module.css";
import divarIcon from "../../assets/icons/divar.svg";
import locationIcon from "../../assets/icons/location.svg";
import profileIcon from "../../assets/icons/profile.svg";
import DashboardMoreOption from "../modules/DashboardMoreOption";

function Layout({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [moreOptions, setMoreOptions] = useState(false);

  const searchHandler = () => {
    dispatch(setFilterSliceSearch(search));

    setSearch("");
  };

  return (
    <>
      <Container maxWidth="lg">
        <AppBar
          position="static"
          sx={{ boxShadow: "none", marginBottom: "8px", bgcolor: "#fff" }}
        >
          <Toolbar
            sx={{
              bgcolor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              component="div"
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Link to="/">
                <img
                  src={divarIcon}
                  alt="divar icon"
                  className={styles.divar_Icon}
                />
              </Link>

              <Divider orientation="vertical" variant="middle" flexItem />

              <Button
                variant="text"
                color="secondary"
                startIcon={
                  <img src={locationIcon} className={styles.button_icons} />
                }
                sx={{ margin: "0 8px" }}
              >
                رشت
              </Button>

              <span className={styles.search_container}>
                <input
                  className={styles.search_input}
                  type="text"
                  placeholder="جستجو در همه ی آگهی ها"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value.toLowerCase().trim())
                  }
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
            </Box>

            <Box
              component="div"
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Box
                component="div"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-start"
                position="relative"
              >
                {location.pathname === "/dashboard" ? (
                  <Button
                    onClick={() => setMoreOptions((value) => !value)}
                    variant="text"
                    color="secondary"
                    startIcon={
                      <img src={profileIcon} className={styles.button_icons} />
                    }
                    sx={{ margin: "0 8px", width: "104px" }}
                  >
                    دیوار من
                  </Button>
                ) : (
                  <Link to="/dashboard">
                    <Button
                      variant="text"
                      color="secondary"
                      startIcon={
                        <img
                          src={profileIcon}
                          className={styles.button_icons}
                        />
                      }
                      sx={{ margin: "0 8px", width: "104px" }}
                    >
                      دیوار من
                    </Button>
                  </Link>
                )}

                {moreOptions && (
                  <DashboardMoreOption setMoreOptions={setMoreOptions} />
                )}
              </Box>

              <Link to="/auth">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "0 8px", width: "104px" }}
                >
                  ثبت آگهی
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Divider orientation="horizontal" variant="middle" flexItem />
      </Container>

      {children}

      <Container maxWidth="lg">
        <footer></footer>
      </Container>
    </>
  );
}

export default Layout;
