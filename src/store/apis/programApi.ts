import { api } from "./api";
import { IProgram } from "../interfaces/program";

export const programApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPrograms: build.query<IProgram[], void>({
      query: () => import.meta.env.VITE_API_PROGRAM,
      providesTags: ["Program"],
      keepUnusedDataFor: 3600,
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data as IProgram[];
      },
    }),
  }),
});

export const { useGetProgramsQuery } = programApi;
