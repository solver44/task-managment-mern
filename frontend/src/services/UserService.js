import AxiosService from "./ApiService.js";

export async function getAllUsers() {
  try {
    const response = await AxiosService.get("/users");
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getUser(id) {
  try {
    const response = await AxiosService.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function updateUser(id, data) {
  return await AxiosService.put(`/users/${id}`, data);
}
export async function createUser(data) {
  return await AxiosService.post(`/users`, data);
}
export async function deleteUser(id) {
  try {
    const response = await AxiosService.delete(`/users/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
