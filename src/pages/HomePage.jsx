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
    setSearchParams(createFilteringObject(filterSliceData));

    let filteredPosts = searchHandler(data?.posts, filterSliceData.search);

    filteredPosts = categoryHandler(filteredPosts, filterSliceData.category);

    setDisplayData(filteredPosts);
  }, [filterSliceData]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Grid
        container
        spacing={2}
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Grid item xs={4} md={2}>
          <Sidebar />
        </Grid>

        <Grid item xs={8} md={10}>
          {displayData?.length === 0 ? (
            <NotFoundPosts />
          ) : (
            <HomePageContent
              data={displayData}
              refetch={refetch}
              isLoading={isLoading}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
