import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Toolbar,
} from "@mui/material";
import styles from "../../styles/layout.module.css";
import divarIcon from "../../assets/icons/divar.svg";
import locationIcon from "../../assets/icons/location.svg";
import profileIcon from "../../assets/icons/profile.svg";
import DashboardMoreOption from "../modules/DashboardMoreOption";
import SearchBox from "../modules/SearchBox";

function Layout({ children }) {
  const location = useLocation();

  const [moreOptions, setMoreOptions] = useState(false);

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

              <div className={styles.city_btn} style={{ margin: "0 8px" }}>
                <Button
                  variant="text"
                  color="secondary"
                  startIcon={
                    <img src={locationIcon} className={styles.button_icons} />
                  }
                >
                  رشت
                </Button>
              </div>

              <div className={styles.search_box_container}>
                <SearchBox />
              </div>
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
                sx={{ width: "104px" }}
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
                  <Link to="/dashboard" className={styles.my_divar_btn}>
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

              <Link to="/auth" className={styles.post_btn}>
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
