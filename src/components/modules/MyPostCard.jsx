import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost } from "../../services/post";
import { sp } from "../../utils/numbers";
import { Box, Button, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";

function MyPostCard({ data }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMyPost"] }),
        enqueueSnackbar("پست شما با موفقیت حذف شد", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("مشکلی پیش آمده است", { variant: "error" });
    },
  });

  const deleteHandler = (id) => mutate(id);

  return (
    <>
      <Box
        component="div"
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          borderRadius: "4px",
          display: "flex",
          flexFlow: "row nowrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box component="div" sx={{ width: "20%", margin: "8px 4px 0 16px" }}>
          <img
            src={`${BASE_URL}${data.images[0]}`}
            alt={`عکس ${data.options?.title}`}
            style={{ width: "100%", height: "100%", borderRadius: "4px" }}
          />
        </Box>

        <Box component="div" sx={{ width: "40%" }}>
          <Typography component="h6" variant="h6" color="primary" my={1}>
            {data.options?.title}
          </Typography>
          <Typography
            component="p"
            variant="p"
            color="secondary"
            my={1}
            textAlign="right"
          >
            {data.options?.content}
          </Typography>
        </Box>

        <Box
          component="div"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="space-between"
          p={1}
          sx={{ width: "30%", textAlign: "center" }}
        >
          <Typography component="p" variant="p" mb={3} width="100%">
            {new Date(data.createdAt).toLocaleDateString("fa-IR")}
          </Typography>

          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexFlow: "row nowrap",
              justifyContent: "space-evenly",
              textAlign: "center",
            }}
          >
            <Typography component="span" variant="span">
              {sp(data.amount)}
            </Typography>
            <span style={{ color: "#A62626", marginRight: "5px" }}>تومان</span>
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={() => deleteHandler(data._id)}
          sx={{ width: "10%", margin: "8px" }}
        >
          حذف
        </Button>
      </Box>
    </>
  );
}

export default MyPostCard;
