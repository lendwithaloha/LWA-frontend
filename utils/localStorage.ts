export const getUserData = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const setUserData = (userData: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userData", JSON.stringify(userData));
  }
};

export const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }
};
