import { Divider } from "@mui/material";
import AddPost from "../components/templates/AddPost";
import PostList from "../components/templates/PostList";

function DashboardPage() {
  return (
    <>
      <AddPost />

      <Divider component="li" variant="fullWidth" sx={{ margin: "16px 0" }} />

      <PostList />
    </>
  );
}

export default DashboardPage;
