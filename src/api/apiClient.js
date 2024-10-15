import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5001",
  // baseURL: "https://ws-occ.skyparking.online",
  withCredentials: true,
});
