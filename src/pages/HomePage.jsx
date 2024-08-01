import Sidebar from "../components/templates/Sidebar";
import HomePageContent from "../components/templates/HomePageContent";
import NotFoundPosts from "../components/modules/NotFoundPosts";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getPosts } from "../services/post";
import { filterSliceValue } from "../app/store";
import {
  categoryHandler,
  createFilteringObject,
  searchHandler,
} from "../utils/filtering";

import { Grid } from "@mui/material";
import Loader from "../components/modules/Loader";
import styles from "../styles/homePage.module.css";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterSliceData = useSelector(filterSliceValue);
  const [displayData, setDisplayData] = useState([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getPosts,
    gcTime: 0,
  });

  useEffect(() => {
    setDisplayData(data?.posts);
  }, [data]);

  useEffect(() => {
    if (data?.posts) {
      setSearchParams(createFilteringObject(filterSliceData));

      let filteredPosts = searchHandler(data?.posts, filterSliceData.search);

      filteredPosts = categoryHandler(filteredPosts, filterSliceData.category);

      setDisplayData(filteredPosts);
    }
  }, [filterSliceData]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className={styles.home_page_container}>
        <div className={styles.sidebar_container}>
          <Sidebar />
        </div>

        <div className={styles.home_page_content_container}>
          {displayData?.length === 0 ? (
            <NotFoundPosts />
          ) : (
            <HomePageContent
              data={displayData}
              refetch={refetch}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
