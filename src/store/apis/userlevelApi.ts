import {
  IUserLevelRequest,
  IUserLevelResponse,
} from "../../interfaces/user-levels";
import { ApiEndpoints } from "../../utils/routes";
import { api } from "./api";

export const userlevelApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserLevels: build.query<IUserLevelResponse, IUserLevelRequest>({
      query: (params) => ({
        url: ApiEndpoints.USER_LEVEL,
        params: params,
      }),
      providesTags: ["UserLevel"],
    }),
  }),
});

export const { useGetUserLevelsQuery, useLazyGetUserLevelsQuery } =
  userlevelApi;
