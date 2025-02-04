import Cookies from "js-cookie";

// Utility to set tokens
export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set("accessToken", accessToken, {
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: 2,
  });
  Cookies.set("refreshToken", refreshToken, {
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: 2,
  });
};

// Utility to clear tokens
export const clearTokens = () => {
  Cookies.remove("accessToken", { path: "/" });
  Cookies.remove("refreshToken", { path: "/" });
};

// Utility to get tokens
export const getTokens = () => ({
  accessToken: Cookies.get("accessToken"),
  refreshToken: Cookies.get("refreshToken"),
});
