import {
  IUser,
  IUserLogin,
  IUserReferralRequest,
  IUserReferralResponse,
  IUserRequest,
  IUserStats,
} from "../../interfaces/user";
import { ApiEndpoints } from "../../utils/routes";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<string, IUserLogin>({
      query: (params) => ({
        url: ApiEndpoints.USER_LOGIN,
        method: "POST",
        body: params,
      }),
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data?.access_token as string;
      },
    }),

    getUser: build.query<IUser, IUserRequest>({
      query: (params) => ({
        url: ApiEndpoints.USER,
        params: params,
      }),
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data as IUser;
      },
      providesTags: ["User"],
      keepUnusedDataFor: 3600,
    }),

    getUserStats: build.query<IUserStats, IUserRequest>({
      query: (params) => ({
        url: ApiEndpoints.USER_STATS,
        params: params,
      }),
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data as IUserStats;
      },
      providesTags: ["User"],
      keepUnusedDataFor: 3600,
    }),

    getUserReferrals: build.query<IUserReferralResponse, IUserReferralRequest>({
      query: (params) => ({
        url: ApiEndpoints.USER_REFERRAL,
        params: params,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserStatsQuery,
  useLoginMutation,
  useLazyGetUserQuery,
  useGetUserReferralsQuery,
} = userApi;
