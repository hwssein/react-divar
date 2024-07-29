import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addCategory } from "../../services/admin";

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

function AdminPage() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] }),
        enqueueSnackbar("با موفقیت ایجاد شد", { variant: "success" });
    },
    onError: () => enqueueSnackbar("مشکلی پیش آمده است", { variant: "error" }),
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!form.name || !form.slug || !form.icon) {
      enqueueSnackbar("لطفا فرم ها را تکمیل کنید", { variant: "warning" });
    } else {
      mutate(form);
    }
  };

  return (
    <>
      <Box component="form" onChange={changeHandler} onSubmit={submitHandler}>
        <Typography
          component="h6"
          variant="h6"
          textAlign="center"
          my={2}
          sx={{
            borderBottom: "2px solid #A62626",
          }}
        >
          ایجاد دسته بندی جدید
        </Typography>

        <TextField
          type="text"
          variant="outlined"
          label="نام دسته بندی"
          name="name"
          sx={{ width: "100%", marginBottom: "16px" }}
        />
        <TextField
          type="text"
          variant="outlined"
          label="اسلاگ"
          name="slug"
          sx={{ width: "100%", marginBottom: "16px" }}
        />

        <FormControl fullWidth>
          <InputLabel id="select-icon">آیکون</InputLabel>
          <Select
            labelId="select-icon"
            value={form.icon}
            label="آیکون"
            name="icon"
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            sx={{ marginBottom: "16px" }}
          >
            <MenuItem value={"car"}>خودرو</MenuItem>
            <MenuItem value={"digital"}>دیجیتال</MenuItem>
            <MenuItem value={"game"}>سرگرمی</MenuItem>
            <MenuItem value={"home"}>املاک</MenuItem>
            <MenuItem value={"personal"}>شخصی</MenuItem>
            <MenuItem value={"service"}>خدماتی</MenuItem>
          </Select>
        </FormControl>

        {isPending ? (
          <Button
            disabled
            variant="outlined"
            type="submit"
            sx={{ width: "100%" }}
          >
            ذخیره
          </Button>
        ) : (
          <Button variant="outlined" type="submit" sx={{ width: "100%" }}>
            ذخیره
          </Button>
        )}
      </Box>
    </>
  );
}

export default AdminPage;
