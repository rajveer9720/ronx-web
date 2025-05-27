import { IUser } from "../interfaces/user";
import moment from "moment";

export function getUserLabelValueArray(
  user: IUser
): { label: string; value: string }[] {
  return [
    { label: "Upline ID", value: user?.parent?.id?.toString()|| "" },
    { label: "Wallet Address", value: truncateAddress(user?.wallet_address) },
    {
      label: "Joining Date",
      value: moment(user?.created_at).format(
        import.meta.env.VITE_APP_TIME_STAMP
      ),
    },
  ];
}

export const truncateAddress = (
  address: string,
  startChars: number = 7,
  endChars: number = 5
) => {
  if (!address) return "";

  const start = address.substring(0, startChars);
  const end = address.substring(address.length - endChars);

  return `${start}...${end}`;
};
