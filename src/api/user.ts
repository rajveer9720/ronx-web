import Request from "./Request";
import { IUser } from "../interfaces/user";

export const getUsers = async () => {
  try {
    const response = await Request.get(`${import.meta.env.VITE_API_USER}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserCount = async () => {
  try {
    const response = await Request.get(
      `${import.meta.env.VITE_API_USER_COUNT}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWithdrawBalance = async (
  id: number,
  skip_validation?: boolean
) => {
  try {
    let url: string = `${import.meta.env.VITE_API_USER_WITHDRAW_BALANCE}/${id}?`;
    if (skip_validation) url += `skip_validation=${skip_validation}`;
    const response = await Request.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserBalance = async (id: number) => {
  try {
    const response = await Request.get(
      `${import.meta.env.VITE_API_USER_BALANCE}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveUser = async (data: IUser) => {
  try {
    const response = await Request.post(
      `${import.meta.env.VITE_API_USER}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    await Request.delete(`${import.meta.env.VITE_API_USER}/${id}`);
  } catch (error) {
    throw error;
  }
};
