import { useEffect, useState } from "react";

import PostLeftSide from "../components/templates/PostLeftSide";
import PostRightSide from "../components/templates/PostRightSide";

import { useParams } from "react-router-dom";
import { getPost } from "../services/post";

import { Grid } from "@mui/material";
import Loader from "../components/modules/Loader";
import styles from "../styles/post-page.module.css";

function PostPage() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const res = await getPost(params.slug);

      setData(res);
      setIsLoading(false);
    };

    fetchData();
  }, [params.slug]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Grid
        component="div"
        container
        spacing={2}
        className={styles.post_container}
      >
        <Grid
          component="div"
          item
          xs={12}
          sm={6}
          sx={{
            padding: "16px",
            marginTop: "8px",
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {data && <PostRightSide data={data.post} />}
        </Grid>

        <Grid
          component="div"
          item
          xs={12}
          sm={6}
          sx={{
            padding: "16px",
            marginTop: "8px",
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          {data && <PostLeftSide data={data.post} />}
        </Grid>
      </Grid>
    </>
  );
}

export default PostPage;
