import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost } from "../../services/post";
import { sp } from "../../utils/numbers";
import { Box, Button, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import divarImage from "../../assets/image/DivarLogo.png";

import styles from "../../styles/myPostCard.module.css";

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
      <Box component="div" className={styles.card_container}>
        <Box component="div" className={styles.card_image}>
          <img
            // src={`${BASE_URL}${data.images[0]}`} cant show the image
            src={divarImage}
            alt={`عکس ${data.options?.title}`}
            style={{ width: "100%", height: "100%", borderRadius: "4px" }}
          />
        </Box>

        <Box component="div" className={styles.card_title}>
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

        <Box className={styles.card_date_container} component="div">
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

        <div className={styles.delete_btn}>
          <Button
            variant="contained"
            onClick={() => deleteHandler(data._id)}
            sx={{ width: "100%" }}
          >
            حذف
          </Button>
        </div>
      </Box>
    </>
  );
}

export default MyPostCard;
