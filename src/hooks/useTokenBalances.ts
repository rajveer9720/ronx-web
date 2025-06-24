import { useAccount, useReadContract, useBalance } from "wagmi";
import BUSD_ABI from "../abi/busdAbi.json";
import { useEffect } from "react";

interface UseTokenBalancesResult {
    busdBalance: bigint | undefined;
    busdAllowance: bigint | undefined;
    nativeTokenBalance: bigint | undefined;
    refetchBalances: () => void;
    isFetchingBalances: boolean;
}

export const useTokenBalances = (): UseTokenBalancesResult => {
    const { address, isConnected, chain } = useAccount();

    const BUSD_CONTRACT_ADDRESS = import.meta.env.VITE_BUSD_CONTRACT_ADDRESS as `0x${string}`;
    const MAIN_CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`;

    const {
        data: busdBalance,
        refetch: refetchBusdBalance,
        isLoading: isBusdBalanceLoading,
    } = useReadContract({
        address: BUSD_CONTRACT_ADDRESS,
        abi: BUSD_ABI,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
        query: { enabled: isConnected && !!address },
    });

    const {
        data: busdAllowance,
        refetch: refetchBusdAllowance,
        isLoading: isBusdAllowanceLoading,
    } = useReadContract({
        address: BUSD_CONTRACT_ADDRESS,
        abi: BUSD_ABI,
        functionName: "allowance",
        args: [address as `0x${string}`, MAIN_CONTRACT_ADDRESS],
        query: { enabled: isConnected && !!address },
    });

    const {
        data: nativeTokenBalanceObj,
        refetch: refetchNativeTokenBalance,
        isLoading: isNativeTokenBalanceLoading,
    } = useBalance({
        address: address,
        chainId: chain?.id,
        query: { enabled: isConnected && !!address && !!chain?.id },
    });

    const nativeTokenBalance = nativeTokenBalanceObj?.value;

    const refetchAll = async () => {
        await Promise.all([
            refetchBusdBalance(),
            refetchBusdAllowance(),
            refetchNativeTokenBalance()
        ]);
    };

    const isFetchingBalances =
        isBusdBalanceLoading || isBusdAllowanceLoading || isNativeTokenBalanceLoading;

    // Fetch only on mount and when wallet/chain changes (removed the 1-second polling)
    useEffect(() => {
        if (isConnected && address) {
            refetchAll();
        }
    }, [isConnected, address, chain?.id]);

    return {
        busdBalance: busdBalance as bigint | undefined,
        busdAllowance: busdAllowance as bigint | undefined,
        nativeTokenBalance,
        refetchBalances: refetchAll,
        isFetchingBalances,
    };
};