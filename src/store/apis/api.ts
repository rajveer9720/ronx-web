import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/authUtils";
import { TagTypes } from "../../utils/storeUtils";

// Create our base api service
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      // Get token from your auth utils
      const token = getToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    // Handle global errors similar to your axios interceptor
    responseHandler: async (response) => {
      if (!response.ok) {
        const data = await response.json();
        const status = response.status;
        const errorMessage = data?.error?.message;

        // Handle 401 error (token expiration)
        if (status === 401 && !errorMessage) {
          localStorage.removeItem("access_token");
          // You might want to dispatch a logout action here
        }

        throw {
          status,
          message: errorMessage || "Something went wrong",
        };
      }

      return response.json();
    },
  }),
  // The "tagTypes" you specify here are used for cache invalidation
  tagTypes: TagTypes,
  // The API endpoints are injected in their respective service files
  endpoints: () => ({}),
});
