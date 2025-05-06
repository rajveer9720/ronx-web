import { IUser } from "../interfaces/user";
import moment from "moment";

export function getUserLabelValueArray(
  user: IUser
): { label: string; value: string }[] {
  return [
    { label: "Name", value: user.name },
    { label: "Wallet Address", value: user.wallet_address },
    { label: "Upline ID", value: user.upline_id.toString() },
    {
      label: "Created At",
      value: moment(user.created_at).format(import.meta.env.VITE_APP_TIME_STAMP),
    },
  ];
}
