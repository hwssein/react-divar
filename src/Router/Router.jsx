import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import AdminPage from "../pages/AdminPage";
import PostPage from "../pages/PostPage";
import PageNotFound from "../pages/404";
import { getUsers } from "../services/users";

import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Loader from "../components/modules/Loader";

function Router() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />

      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />

      <Route
        path="/admin"
        element={
          data.role === "ADMIN" ? <AdminPage /> : <Navigate to="/dashboard" />
        }
      />

      <Route path="/post/:slug" element={<PostPage />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
