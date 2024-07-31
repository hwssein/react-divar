import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sp } from "../../utils/numbers";
import { deletePost } from "../../services/post";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom";

function PostCard({ item, admin }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["getPosts"]);
      enqueueSnackbar("پست با موفقیت حذف شد", { variant: "success" });
    },
    onError: () => enqueueSnackbar("مشکلی پیش آمده است", { variant: "error" }),
  });

  return (
    <>
      <Link style={{ width: "100%" }} to={`post/${item._id}`}>
        <Card
          sx={{
            width: "100%",
            border: "1px solid #ccc",
          }}
        >
          <CardActionArea
            sx={{
              width: "100%",
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ width: "calc(100% - 150px)" }}>
              <Typography
                component="h6"
                variant="h6"
                color="primary"
                mb={3}
                height="60px"
                width="100%"
              >
                {item.options?.title}
              </Typography>

              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <Typography component="p" variant="p">
                  {sp(item.amount)}
                </Typography>

                <Typography
                  component="p"
                  variant="p"
                  color="primary"
                  sx={{ marginRight: "8px" }}
                >
                  تومان
                </Typography>
              </Box>

              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography component="p" variant="p" color="secondary">
                  {new Date(item.createdAt).toLocaleDateString("fa-ir")}
                </Typography>
                <Typography component="p" variant="p" color="primary">
                  {item.options?.city}
                </Typography>
              </Box>
            </CardContent>

            <CardMedia
              component="img"
              src={`${BASE_URL}${item.images[0]}`}
              sx={{ width: "150px", borderRadius: "4px", marginLeft: "8px" }}
              alt={`${item.options?.title} image`}
            />
          </CardActionArea>
        </Card>
      </Link>

      {admin.role === "ADMIN" && (
        <Button
          variant="contained"
          onClick={() => mutate(item._id)}
          sx={{ width: "100%" }}
        >
          حذف
        </Button>
      )}
    </>
  );
}

export default PostCard;
