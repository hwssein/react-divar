import { useEffect, useState } from "react";

import PostLeftSide from "../components/templates/PostLeftSide";
import PostRightSide from "../components/templates/PostRightSide";

import { useParams } from "react-router-dom";
import { getPost } from "../services/post";

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
      <div className={styles.post_container}>
        <div className={styles.right_container}>
          {data && <PostRightSide data={data.post} />}
        </div>

        <div className={styles.left_container}>
          {data && <PostLeftSide data={data.post} />}
        </div>
      </div>
    </>
  );
}

export default PostPage;
