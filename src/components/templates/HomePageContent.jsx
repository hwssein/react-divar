import { useQuery } from "@tanstack/react-query";

import { Grid } from "@mui/material";
import Loader from "../modules/Loader";
import PostCard from "../modules/PostCard";
import { getUsers } from "../../services/users";
import { useEffect } from "react";

function HomePageContent({ data, refetch }) {
  const { data: admin, isLoading: adminLoader } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  useEffect(() => {
    refetch();
  }, []);

  if (adminLoader) return <Loader />;

  return (
    <>
      <Grid container spacing={2} sx={{ margin: "8px 0" }}>
        {data?.map((item) => (
          <Grid
            item
            key={item._id}
            sm={12}
            md={6}
            lg={4}
            sx={{
              display: "flex",
              flexFlow: "row wrap",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <PostCard item={item} admin={admin} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default HomePageContent;
