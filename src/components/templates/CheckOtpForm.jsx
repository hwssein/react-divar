import { checkOtp } from "../../services/auth";
import { setCookie } from "../../utils/cookie.js";
import { getUsers } from "../../services/users.js";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { enqueueSnackbar } from "notistack";

function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const navigate = useNavigate();

  const { refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    const regex = /^\d{5}$/g;
    const regexResult = regex.test(code);

    if (regexResult) {
      const { response, error } = await checkOtp(mobile, code);

      if (response) {
        setCookie(response);

        enqueueSnackbar("با موفقیت وارد شدید", { variant: "success" });

        refetch();

        navigate("/");
      }

      if (error) {
        enqueueSnackbar("کد تایید معتبر نیست", { variant: "error" });

        console.log(error.response.data.message);
      }

      setCode("");
    } else {
      enqueueSnackbar("در وارد کردن کد دقت کنید", { variant: "warning" });
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box component="form" onSubmit={submitHandler}>
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
            py={2}
          >
            <Typography component="h5" variant="h5">
              ورود به حساب کاربری
            </Typography>

            <ArrowBackIcon
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            />
          </Box>

          <Divider component="li" />

          <Typography component="p" variant="p" py={4} fontWeight="600">
            کد تأیید را وارد کنید
          </Typography>

          <Typography component="p" variant="p" py={2} color="secondary">
            کد پیامک شده به شماره{" "}
            <Typography component="span" variant="span">
              «0{mobile}»
            </Typography>{" "}
            را وارد کنید.
          </Typography>

          <TextField
            type="number"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            label="کد تایید 5 رقمی"
            sx={{
              width: "100%",
              direction: "ltr",
            }}
          />

          <Box
            component="div"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            mt={2}
          >
            <Button
              variant="outlined"
              sx={{ marginLeft: "8px", width: "104px" }}
              onClick={() => setStep(1)}
            >
              تغییر شماره
            </Button>

            <Button type="submit" variant="contained">
              تایید
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default CheckOtpForm;
