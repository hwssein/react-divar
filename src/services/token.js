import api from "../configs/api";
import { getCookie } from "../utils/cookie";

const getNewToken = async () => {
  const refreshToken = getCookie("refreshToken");

  if (!refreshToken) return;

  const response = await api.post("auth/check-refresh-token", {
    refreshToken,
  });
  return { response };
};

export default getNewToken;
