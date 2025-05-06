import Request from "./Request";

export const getLevel = async (id: number) => {
  try {
    await Request.get(`${import.meta.env.VITE_API_LEVEL}/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getLevelsByParams = async (
  user_id?: number,
  program_id?: number,
  level?: number
) => {
  try {
    let url: string = `${import.meta.env.VITE_API_LEVEL}?`;
    if (user_id) url += `user_id=${user_id}&`;
    if (program_id) url += `program_id=${program_id}&`;
    if (level) url += `level=${level}&`;
    const response = await Request.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
