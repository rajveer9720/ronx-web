import {
  ITransaction,
  ITransactionRequest,
} from "../../interfaces/transaction";
import { ApiEndpoints } from "../../utils/routes";
import { api } from "./api";

export const transactionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query<ITransaction[], ITransactionRequest>({
      query: (params) => ({
        url: ApiEndpoints.TRANSACTION,
        params: params,
      }),
      transformResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data as ITransaction[];
      },
      providesTags: ["Transaction"],
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionApi;
