import { IProgram } from "../../interfaces/program";
import { ApiEndpoints } from "../../utils/routes";
import { api } from "./api";

export const programApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPrograms: build.query<IProgram[], void>({
      query: () => ApiEndpoints.PROGRAM,
      providesTags: ["Program"],
      keepUnusedDataFor: 3600,
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data as IProgram[];
      },
    }),
  }),
});

export const { useGetProgramsQuery } = programApi;
