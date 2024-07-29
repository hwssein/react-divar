import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../../services/users";
import { deleteCookie } from "../../utils/cookie";

import { Box, Button } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function DashboardMoreOption({ setMoreOptions }) {
  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const navigateToAdminPage = () => {
    setMoreOptions((value) => !value);
    navigate("/admin");
  };

  const logoutHandler = () => {
    deleteCookie("refreshToken");
    deleteCookie("accessToken");

    setMoreOptions((value) => !value);

    refetch();

    navigate("/");
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        position="absolute"
        sx={{ top: "100%", marginTop: "6px", backgroundColor: "#fff" }}
      >
        {data.role === "ADMIN" && (
          <Button
            onClick={navigateToAdminPage}
            variant="text"
            color="secondary"
            startIcon={<AdminPanelSettingsIcon style={{ marginLeft: "5px" }} />}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              margin: "3px 0",
              width: "104px",
            }}
          >
            پنل ادمین
          </Button>
        )}

        <Button
          onClick={logoutHandler}
          variant="text"
          color="secondary"
          startIcon={<ExitToAppIcon style={{ marginLeft: "5px" }} />}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            margin: "3px 0",
            width: "104px",
          }}
        >
          خروج
        </Button>
      </Box>
    </>
  );
}

export default DashboardMoreOption;
