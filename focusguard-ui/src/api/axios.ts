import axios from "axios";

import {
  getStorageItem,
} from "../utils/extensionStorage";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token =
      await getStorageItem(
        "access_token"
      );

    const language =
      (await getStorageItem("language")) ||
      "en";

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    config.params = {
      ...(config.params || {}),
      language,
    };

    return config;
  }
);

export default api;