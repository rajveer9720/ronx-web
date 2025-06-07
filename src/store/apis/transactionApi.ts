import {
  ITransactionPaginateRequest,
  ITransactionRequest,
  ITransactionResponse,
} from "../../interfaces/transaction";
import { ApiEndpoints } from "../../utils/routes";
import { api } from "./api";

export const transactionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTransactionsByCycle: build.query<
      ITransactionResponse,
      ITransactionRequest
    >({
      query: (params) => ({
        url: ApiEndpoints.TRANSACTION_CYCLE,
        params: params,
      }),
      providesTags: ["Transaction"],

    }),

    getTransactions: build.query<
      ITransactionResponse,
      ITransactionPaginateRequest
    >({
      query: (params) => ({
        url: ApiEndpoints.TRANSACTION,
        params: params,
      }),
      providesTags: ["Transaction"],

    }),
  }),
});

export const { useGetTransactionsByCycleQuery, useGetTransactionsQuery } =
  transactionApi;
