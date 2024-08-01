import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getCategory } from "../../services/admin";
import { addPost } from "../../services/post";

import Loader from "../modules/Loader";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

import styles from "../../styles/addPost.module.css";

function AddPost() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: "",
    city: "",
    category: "",
    images: null,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  const { mutate } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["getMyPost"]);
      enqueueSnackbar("با موفقیت ایجاد شد", { variant: "success" });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },

    onError: () => enqueueSnackbar("مشکلی پیش آمده است", { variant: "error" }),
  });

  const changeHandler = (event) => {
    const name = event.target.name;

    if (name === "images") {
      setForm({ ...form, [name]: event.target.files[0] });
    } else {
      setForm({ ...form, [name]: event.target.value });
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }

    if (
      !form.amount ||
      !form.category ||
      !form.city ||
      !form.content ||
      !form.images ||
      !form.title
    ) {
      enqueueSnackbar("لطفا تمام فیلد هارا پر کنید", { variant: "warning" });
    } else {
      mutate(formData);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Box component="div" sx={{ padding: "16px 8px " }}>
        <Typography
          component="h6"
          variant="h6"
          display="inline-block"
          px={2}
          sx={{ borderBottom: "2px solid #A62626" }}
        >
          ایجاد آگهی
        </Typography>
      </Box>

      <Box
        component="form"
        my={2}
        xs={12}
        onChange={changeHandler}
        onSubmit={submitHandler}
      >
        <FormControl fullWidth sx={{ marginBottom: "16px" }}>
          <InputLabel id="post-category">دسته بندی</InputLabel>
          <Select
            labelId="post-category"
            value={form.category}
            name="category"
            label="دسته بندی"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {data.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box className={styles.title_container} component="div">
          <TextField
            className={styles.title}
            type="text"
            variant="outlined"
            label="عنوان"
            name="title"
          />

          <TextField
            className={styles.city}
            type="text"
            variant="outlined"
            label="شهر"
            name="city"
          />
        </Box>

        <TextField
          variant="outlined"
          type="file"
          label="تصاویر"
          name="images"
          fullWidth
          sx={{ marginBottom: "16px" }}
        />

        <TextField
          variant="outlined"
          multiline
          rows={4}
          label="توضیحات"
          name="content"
          fullWidth
          sx={{ marginBottom: "16px" }}
        />

        <Box className={styles.price_container} component="div">
          <TextField
            className={styles.price}
            variant="outlined"
            type="number"
            label="قیمت"
            name="amount"
            sx={{ width: "50%" }}
          />

          <Typography component="span" variant="span" color="primary" p={1}>
            تومان
          </Typography>
        </Box>

        <Button type="submit" variant="outlined" sx={{ width: "100%" }}>
          ایجاد
        </Button>
      </Box>
    </>
  );
}

export default AddPost;
