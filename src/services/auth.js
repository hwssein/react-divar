import api from "../configs/api";

const sendOtp = async (mobile) => {
  const response = await api.post("auth/send-otp", { mobile: `0${mobile}` });
  return { response };
};

const checkOtp = async (mobile, code) => {
  const response = await api.post("auth/check-otp", {
    mobile: `0${mobile}`,
    code,
  });
  return { response };
};

export { sendOtp, checkOtp };
