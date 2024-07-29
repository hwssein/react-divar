import { sendOtp } from "../../services/auth";

import { useNavigate } from "react-router-dom";

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
import { p2e } from "../../utils/numbers";

function SendOtpForm({ setStep, mobile, setMobile }) {
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    const regex = /^9\d{9}$/g;
    const regexResult = regex.test(mobile);

    if (regexResult) {
      const { response, error } = await sendOtp(p2e(mobile));

      if (response) setStep(2);

      if (error) {
        enqueueSnackbar("مشکلی پیش آمده", { variant: "error" });

        console.log(error.response.data.message);
      }
    } else {
      enqueueSnackbar("لطفا یک شماره موبایل معتبر وارد نمایید.", {
        variant: "warning",
      });
    }
  };

  return (
    <>
      <Container maxWidth="sm">
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

        <Box component="form" onSubmit={submitHandler}>
          <Typography component="h6" variant="h6" my={2}>
            شمارهٔ موبایل خود را وارد کنید
          </Typography>

          <Typography component="p" variant="p" mt={3} color="secondary">
            قبل از ثبت آگهی، لطفاً وارد حساب خود شوید. کد تأیید به این شماره
            پیامک می‌شود.
          </Typography>

          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            mt={3}
            py={2}
          >
            <TextField
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              type="number"
              variant="outlined"
              label="شماره موبایل"
              sx={{ width: "100%", direction: "ltr" }}
            />
            <span
              style={{
                width: "60px",
                padding: "5px",
                textAlign: "center",
                direction: "ltr",
              }}
            >
              +98
            </span>
          </Box>

          <Typography component="p" variant="p" my={2} mb={3}>
            <Typography component="span" variant="span" color="primary">
              شرایط استفاده از خدمات{" "}
            </Typography>
            و
            <Typography component="span" variant="span" color="primary">
              {" "}
              حریم خصوصی
            </Typography>{" "}
            دیوار را می پذیرم.
          </Typography>

          <Divider component="li" />

          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: "16px", float: "left" }}
          >
            تایید
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default SendOtpForm;
