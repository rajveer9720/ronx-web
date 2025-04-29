import { jwtDecode } from "jwt-decode";
import { IUser } from "../interfaces/user";
import { CustomJwtPayload } from "../interfaces/user";

export const getToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const parseJwt = (): CustomJwtPayload | null => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode<CustomJwtPayload>(token);
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  const payload = parseJwt();
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
};

export const getLoggedInUser = (): IUser | null => {
  const token: any = parseJwt();
  const user: IUser = token?.user as IUser;
  if (!user) return null;
  return user;
};
