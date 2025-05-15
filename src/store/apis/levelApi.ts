import { api } from "./api";
import { ILevel, ILevelRequest } from "../interfaces/level";

export const levelApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLevels: build.query<ILevel[], ILevelRequest>({
      query: (params) => ({
        url: import.meta.env.VITE_API_LEVEL,
        params: params,
      }),
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data as ILevel[];
      },
      providesTags: ["Level"],
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetLevelsQuery } = levelApi;
