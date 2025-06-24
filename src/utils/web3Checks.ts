import { showSnackbar } from "../components/SnackbarUtils";
import { parseUnits } from "viem";

export const checkNativeTokenForGas = (
    nativeTokenBalance: bigint | undefined,
    chainSymbol: string = 'BNB/tBNB',
    requiredGasAmount: number = import.meta.env.VITE_GAS_FEE_BNB
): boolean => {
    const estimatedGasFee = parseUnits(requiredGasAmount.toString(), 18);

    if (typeof nativeTokenBalance !== "bigint" || nativeTokenBalance < estimatedGasFee) {
        showSnackbar({
            message: `Insufficient ${chainSymbol} balance for gas. You need at least ${requiredGasAmount} ${chainSymbol} to cover transaction fees.`,
            severity: "error",
        });
        return false;
    }
    return true;
};

export const checkBusdBalance = (
    currentBusdBalance: bigint | undefined,
    requiredBusdAmount: number
): boolean => {
    const requiredBusdAmountWei = parseUnits(requiredBusdAmount.toString(), 18);

    if (typeof currentBusdBalance !== "bigint" || currentBusdBalance < requiredBusdAmountWei) {
        showSnackbar({
            message: `Insufficient BUSD balance. You need at least ${requiredBusdAmount} BUSD for this transaction.`,
            severity: "error",
        });
        return false;
    }
    return true;
};

export const checkBusdAllowance = (
    currentBusdAllowance: bigint | undefined,
    requiredAllowanceAmount: number
): boolean => {
    const requiredAllowanceAmountWei = parseUnits(requiredAllowanceAmount.toString(), 18);

    if (typeof currentBusdAllowance !== "bigint" || currentBusdAllowance < requiredAllowanceAmountWei) {
        return false;
    }
    return true;
};
