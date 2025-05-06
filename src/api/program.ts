import Request from "./Request";

export const getPrograms = async () => {
  try {
    const response = await Request.get(`${import.meta.env.VITE_API_PROGRAM}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
