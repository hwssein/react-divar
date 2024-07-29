import { getMyPost } from "../../services/post";
import MyPostCard from "../modules/MyPostCard";

import { useQuery } from "@tanstack/react-query";

import Loader from "../modules/Loader";
import { Box, Grid, Typography } from "@mui/material";

function PostList() {
  let filterData = [];

  const { data, isLoading } = useQuery({
    queryKey: ["getMyPost"],
    queryFn: getMyPost,
  });

  data?.posts.filter(
    (item) => !!item.images.length === true && filterData.push(item)
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box component="div" sx={{ padding: " 8px " }}>
        <Typography
          component="h6"
          variant="h6"
          display="inline-block"
          px={2}
          sx={{ borderBottom: "2px solid #A62626" }}
        >
          آگهی های شما
        </Typography>
      </Box>

      <Grid container spacing={1} my={1}>
        {filterData.map((item) => (
          <Grid item xs={12} key={item._id}>
            <MyPostCard data={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default PostList;
