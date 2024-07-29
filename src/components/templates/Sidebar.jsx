import { useState } from "react";

import { getCategory } from "../../services/admin";

import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setFilterSliceCategory } from "../../features/filter/filterSlice";

import { Box, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import Loader from "../modules/Loader";

import car from "../../assets/icons/car.svg";
import digital from "../../assets/icons/digital.svg";
import game from "../../assets/icons/game.svg";
import home from "../../assets/icons/home.svg";
import personal from "../../assets/icons/personal.svg";
import service from "../../assets/icons/service.svg";

const image = {
  car,
  digital,
  game,
  home,
  personal,
  service,
};

function Sidebar() {
  const dispatch = useDispatch();

  const [selectCategory, setSelectCategory] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  const categoryHandler = (event, id) => {
    if (event.target?.dataset.category === "all") {
      setSelectCategory("all");
      dispatch(setFilterSliceCategory("all"));
    } else {
      setSelectCategory(id);
      dispatch(setFilterSliceCategory(id));
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Box component="div" sx={{ padding: "16px 8px " }}>
        <Typography
          component="span"
          variant="span"
          display="inline-block"
          px={2}
          sx={{ borderBottom: "2px solid #A62626" }}
        >
          دسته بندی ها
        </Typography>
      </Box>

      <Box component="ul">
        <Box
          component="li"
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "8px",
            cursor: "pointer",
          }}
        >
          <CategoryIcon sx={{ color: "#B0B0B0", marginLeft: "4px" }} />
          <Typography
            component="span"
            data-category="all"
            onClick={(event) => categoryHandler(event)}
            sx={
              selectCategory === "all"
                ? { borderBottom: "2px solid #A62626", padding: "2px 8px" }
                : { padding: "2px 8px" }
            }
          >
            همه
          </Typography>
        </Box>

        {data.map((item) => (
          <Box
            component="li"
            key={item._id}
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "6px",
              cursor: "pointer",
            }}
          >
            <img
              src={image[item.icon]}
              alt={item.icon}
              style={{ marginLeft: "4px" }}
            />
            <Typography
              component="span"
              onClick={(event) => categoryHandler(event, item._id)}
              sx={
                item._id === selectCategory
                  ? { borderBottom: "2px solid #A62626", padding: "2px 8px" }
                  : { padding: "2px 8px" }
              }
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default Sidebar;
