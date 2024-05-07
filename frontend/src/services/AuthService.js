import AxiosService from "./ApiService.js";

export async function login(email, password) {
  try {
    const response = await AxiosService.post(`/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function signup(name, email, password) {
  try {
    const response = await AxiosService.post(`/signup`, {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
