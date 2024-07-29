import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCategory } from "../../services/admin";
import { sp } from "../../utils/numbers";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShareIcon from "@mui/icons-material/Share";

function PostRightSide({ data }) {
  const url = window.location.href;

  const [category, setCategory] = useState({});

  const { data: dataCategory } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  useEffect(() => {
    setCategory(dataCategory?.find((item) => item._id === data.category));
  }, [dataCategory, data]);

  return (
    <>
      <Box
        component="div"
        sx={{
          width: "100%",
          display: "flex",
          flexFlow: "row nowrap",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Typography component="span" variant="span" fontSize="0.7rem">
          دسته بندی
        </Typography>
        <ArrowBackIosIcon sx={{ fontSize: "0.7rem", margin: "0 3px" }} />
        <Typography
          component="span"
          variant="span"
          fontSize="0.7rem"
          mr="3px"
          color="primary"
        >
          {category?.name}
        </Typography>
      </Box>

      <Typography component="h5" variant="h5" my={2} width="100%">
        {data?.options?.title}
      </Typography>

      <Typography component="p" variant="p" color="secondary">
        {`${new Date(data.createdAt).toLocaleDateString("fa-ir")} در ${
          data.options?.city
        }`}
      </Typography>

      <Divider component="li" sx={{ width: "100%", marginTop: "16px" }} />
      <Box
        component="div"
        sx={{
          width: "100%",
          display: "flex",
          flexFlow: "row nowrap",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <Box
          component="div"
          sx={{
            margin: "8px 0",
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <WarningAmberIcon
            sx={{
              color: "#B0B0B0",
              marginLeft: "8px",
              marginBottom: "4px",
            }}
          />
          <Typography component="p" variant="p" color="secondary">
            زنگ خطر های قبل از معامله
          </Typography>
        </Box>

        <ArrowBackIosIcon sx={{ color: "#B0B0B0" }} />
      </Box>

      <Divider component="li" sx={{ width: "100%", marginBottom: "16px" }} />

      <Box
        component="div"
        sx={{
          width: "100%",
          display: "flex",
          flexFlow: "row nowrap",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <Box component="div">
          <Button
            variant="contained"
            sx={{ width: "120px", marginLeft: "8px" }}
          >
            اطلاعات تماس
          </Button>
          <Button variant="outlined" sx={{ width: "120px" }}>
            چت
          </Button>
        </Box>

        <Tooltip title="کپی لینک">
          <IconButton onClick={() => navigator.clipboard.writeText(url)}>
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider component="li" sx={{ width: "100%" }} />
      <Box
        component="div"
        sx={{
          width: "100%",
          display: "flex",
          flexFlow: "row nowrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="p" variant="p" my={1}>
          آخرین بروزرسانی:
        </Typography>
        <Typography component="p" variant="p" my={1}>
          {new Date(data.updatedAt).toLocaleDateString("fa-ir")}
        </Typography>
      </Box>

      <Divider component="li" sx={{ width: "100%" }} />

      <Box
        component="div"
        sx={{
          width: "100%",
          display: "flex",
          flexFlow: "row nowrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="p" variant="p" my={1}>
          قیمت:
        </Typography>
        <Typography component="p" variant="p" my={1}>
          {sp(data.amount)} تومان
        </Typography>
      </Box>

      <Divider component="li" sx={{ width: "100%", marginBottom: "8px" }} />

      <Typography component="p" variant="p" fontSize="1.2rem" mb={1}>
        توضیحات:
      </Typography>
      <Typography component="p" variant="p" fontSize="1rem" mb={2}>
        {data.options?.content}
      </Typography>

      <Divider component="li" sx={{ width: "100%" }} />
    </>
  );
}

export default PostRightSide;
