import { IUserLevel, IUserLevelRequest } from "../interfaces/user-levels";
import { api } from "./api";

export const userlevelApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserLevels: build.query<IUserLevel[], IUserLevelRequest>({
      query: (params) => ({
        url: import.meta.env.VITE_API_USER_LEVEL,
        params: params,
      }),
      providesTags: ["UserLevel"],
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data as IUserLevel[];
      },
    }),
  }),
});

export const { useGetUserLevelsQuery } = userlevelApi;
