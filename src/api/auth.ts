import { IAdminAuth, IUserAuth } from "../interfaces/auth";
import Request from "./Request";

export const adminLogin = async (data: IAdminAuth) => {
  try {
    const response = await Request.post(
      import.meta.env.VITE_API_ADMIN + import.meta.env.VITE_API_LOGIN,
      data,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const userLogin = async (data: IUserAuth) => {
  try {
    const response = await Request.post(
      import.meta.env.VITE_API_USER + import.meta.env.VITE_API_LOGIN,
      data,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  localStorage.removeItem("access_token");
  return true;
};
