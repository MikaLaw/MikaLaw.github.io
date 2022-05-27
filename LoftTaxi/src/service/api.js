import axios from "axios";

const instance = axios.create({
  baseURL: "https://loft-taxi.glitch.me/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authUser = async (email, password) => {
  let responseData = await instance.post("/auth ", { email, password });
  return responseData;
};

export const getAddressList = async () => {
  let responseData = await instance.get("/addressList");
  return responseData;
};

export const getCoords = async (address1, address2) => {
  let responseData = await instance.get(
    `/route?address1=${address1}&address2=${address2}`
  );
  return responseData;
};
export const setAuthDataInLocalStorage = (token) => {
  return window.localStorage.setItem("token", token);
};

export const removeAuthDataInLocalStorage = () => {
  return window.localStorage.clear();
};

export const setUserProfile = (userData) => {
  return window.localStorage.setItem("profile", JSON.stringify(userData));
};
