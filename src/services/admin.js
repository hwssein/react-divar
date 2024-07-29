import api from "../configs/api";

const addCategory = async (data) => await api.post("category", data);

const getCategory = async () => await api.get("category");

const deleteCategory = async (data) => await api.delete(`category/${data}`);

export { addCategory, getCategory, deleteCategory };
