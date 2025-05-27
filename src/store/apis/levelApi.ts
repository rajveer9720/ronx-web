import { ILevel, ILevelRequest } from "../../interfaces/level";
import { ApiEndpoints } from "../../utils/routes";
import { api } from "./api";

export const levelApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLevels: build.query<ILevel[], ILevelRequest>({
      query: (params) => ({
        url: ApiEndpoints.LEVEL,
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
