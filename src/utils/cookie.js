const setCookie = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken}; max-age=${
    1 * 24 * 60 * 60
  }`;
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${
    30 * 24 * 60 * 60
  }`;
};

const getCookie = (cookieKey) => {
  return document.cookie
    .split(";")
    .find((item) => item.trim().split("=")[0] === cookieKey)
    ?.split("=")[1];
};

const deleteCookie = (key) => cookieStore.delete(key);

export { setCookie, getCookie, deleteCookie };
