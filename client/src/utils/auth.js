// Utility functions for authentication and role management

export const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.error(`Error decoding token: ${error}`);
    return null;
  }
};

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  return decodeToken(token);
};

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isAdmin = () => {
  return getUserRole() === "admin";
};

export const isBlogger = () => {
  return getUserRole() === "blogger";
};

export const getUsername = () => {
  const token = localStorage.getItem("token");
  if(!token) return;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.username;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
