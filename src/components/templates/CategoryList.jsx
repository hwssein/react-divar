import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../services/admin";

import { Box, Button, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";

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

function CategoryList({ item }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] }),
        enqueueSnackbar("دسته بندی با موفقیت حذف شد", { variant: "warning" });
    },
  });

  const deleteHandler = (categoryId) => {
    mutate(categoryId);
  };

  return (
    <>
      <Box
        component="div"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        my={2}
        p={1}
        sx={{ borderRadius: "4px", border: "1px solid #4e4e4e" }}
      >
        <Box
          component="div"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <img src={image[item.icon]} alt={`${item.icon} icon`} />
          <Typography mr={1}>{item.name}</Typography>
          <Typography mr={1}>{item.slug}/</Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={() => deleteHandler(item._id)}
        >
          حذف
        </Button>
      </Box>
    </>
  );
}

export default CategoryList;
