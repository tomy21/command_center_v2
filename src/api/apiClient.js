import axios from "axios";

export const apiClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL_DEV,
  baseURL: "https://ws-occ.skyparking.online",
  withCredentials: true,
});

export const apiLot_v2 = axios.create({
  // baseURL: process.env.REACT_APP_API_URL_DEV_LOT,
  baseURL: "https://devintegrationv2.skyparking.online",
  withCredentials: true,
});

export const apiLot = axios.create({
  baseURL: "https://devapi-injectmember.skyparking.online",
  // baseURL: "https://ws-occ.skyparking.online",
  withCredentials: true,
});
