export const saveToken = (token) => {
  localStorage.setItem("userToken", JSON.stringify(token));
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem("userToken"));
};
export const removeToken = () => {
  return localStorage.removeItem("userToken");
};
