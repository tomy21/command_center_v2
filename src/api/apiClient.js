import axios from "axios";

export const apiClient = axios.create({
  // baseURL: "http://localhost:7001",
  baseURL: "https://ws-occ.skyparking.online",
  withCredentials: true,
});

export const apiLot = axios.create({
  baseURL: "https://devapi-injectmember.skyparking.online",
  // baseURL: "https://ws-occ.skyparking.online",
  withCredentials: true,
});
