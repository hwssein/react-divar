import api from "../configs/api";
import axios from "axios";
import { getCookie } from "../utils/cookie";

const addPost = async (formData) => {
  const token = getCookie("accessToken");

  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}post/create`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `bearer ${token}`,
      },
    }
  );
  return response;
};

const getPosts = async () => await api.get("/");

const getPost = async (id) => (await api.get(`post/${id}`)) || false;

const getMyPost = async () => (await api.get("post/my")) || false;

const deletePost = async (id) => await api.delete(`post/delete/${id}`);

export { addPost, getMyPost, deletePost, getPosts, getPost };
