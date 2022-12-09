import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: "https://fcm.googleapis.com/",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token =
      "AAAAxggnayE:APA91bHaFV3k89mfyv6uzBiehgZtgk6c029sKcBTg48sIRfV6z9d5viLleZiDGqEgtjCYsQJBCYkkYDFTCAgS4L1NNxLht82rssRWaWiP0UYx5UmrhAJhxVIGODU6bgk836Sm1k6mJRD";

    config.headers = {
      Authorization: `key=${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (err) => Promise.reject(err)
);
axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);
export default axiosInstance;
