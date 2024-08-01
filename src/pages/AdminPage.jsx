import CategoryForm from "../components/templates/CategoryForm";
import CategoryList from "../components/templates/CategoryList";

import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../services/admin";

import { Grid, Typography } from "@mui/material";
import Loader from "../components/modules/Loader";

function AdminPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  if (isLoading) return <Loader />;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <CategoryForm />
        </Grid>

        <Grid item xs={12} sm={8}>
          <Typography
            component="h6"
            variant="h6"
            textAlign="center"
            my={2}
            sx={{
              borderBottom: "2px solid #A62626",
            }}
          >
            لیست دسته بندی ها
          </Typography>

          {data.map((item) => (
            <CategoryList key={item._id} item={item} />
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default AdminPage;
