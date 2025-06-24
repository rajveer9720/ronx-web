import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { showSnackbar } from "../components/SnackbarUtils";
import { useState, useEffect, useCallback } from "react";
import { BaseError } from "viem";

type WriteContractArgs = Parameters<
    ReturnType<typeof useWriteContract>["writeContract"]
>[0];

interface UseWeb3TransactionOptions {
    onSuccess?: (hash: `0x${string}`) => void;
    onError?: (error: BaseError | Error) => void;
    successMessage?: string;
    errorMessage?: string;
    onSettled?: () => void;
}

export const useWeb3Transaction = (options?: UseWeb3TransactionOptions) => {
    const {
        writeContract,
        data: hash,
        isPending: isWritePending,
        error: writeError,
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        error: confirmationError,
    } = useWaitForTransactionReceipt({
        hash,
        query: {
            enabled: !!hash,
        },
    });

    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setIsProcessing(isWritePending || isConfirming);
    }, [isWritePending, isConfirming]);

    useEffect(() => {
        if (isConfirmed) {
            showSnackbar({
                message: options?.successMessage || "Transaction successful!",
                severity: "success",
            });
            options?.onSuccess?.(hash as `0x${string}`);
            options?.onSettled?.();
        }
    }, [isConfirmed, hash, options]);

 
    const executeTransaction = useCallback(
        (args: WriteContractArgs) => {
            if (isProcessing) {
                showSnackbar({
                    message: "A transaction is already in progress. Please wait.",
                    severity: "info",
                });
                return;
            }
            writeContract(args);
        },
        [writeContract, isProcessing]
    );

    return {
        executeTransaction,
        hash,
        isProcessing,
        isWritePending,
        isConfirming,
        isConfirmed,
        transactionError: writeError || confirmationError,
    };
};
