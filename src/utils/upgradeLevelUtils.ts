import ContractABI from "../abi/abi.json";
import { showLoader, hideLoader } from "../store/slices/loaderSlice";
import { AppDispatch } from "../store";
import { useWeb3Transaction } from "../hooks/useWeb3Transaction";

export const useUpgradeLevel = ({
  onUpgradeComplete,
}: {
  onUpgradeComplete?: () => void;
}) => {
  const {
    executeTransaction,
  } = useWeb3Transaction({
    successMessage: "Level upgrade successful!",
    errorMessage: "Level upgrade failed.",
    onSettled: () => {
      onUpgradeComplete?.();
    },
  });

  const upgradeLevel = async (
    dispatch: AppDispatch,
    matrix: number,
    level: number
  ) => {
    try {
      dispatch(showLoader());
      await executeTransaction({
        address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
        abi: ContractABI,
        functionName: "buyNewLevel",
        args: [matrix, level],
      });
    } catch (error) {
      console.error("Upgrade failed:", error);
    } finally {
      dispatch(hideLoader());
    }
  };

  return { upgradeLevel };
};
