import api from "../configs/api";

const getUsers = async () => (await api.get("user/whoami")) || false;

export { getUsers };
