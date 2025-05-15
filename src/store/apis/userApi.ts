import { api } from "./api";
import { IUser, IUserRequest } from "../interfaces/user";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<IUser, IUserRequest>({
      query: (params) => ({
        url: import.meta.env.VITE_API_USER,
        params: params,
      }),
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data as IUser;
      },
      providesTags: ["User"],
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
