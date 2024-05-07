import AxiosService from "./ApiService.js";

export async function getAllTasks() {
  try {
    const response = await AxiosService.get("/tasks");
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getTask(id) {
  try {
    const response = await AxiosService.get("/tasks/" + id);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function getTasksDashboard() {
  try {
    const response = await AxiosService.get("/tasks/data/dashboard");
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getTasksByUser(params) {
  try {
    const response = await AxiosService.get("/tasks/filter/byUser", { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function getTasksByStatus(params) {
  try {
    const response = await AxiosService.get("/tasks/filter/byStatus", {
      params,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function createTask(title, description, assignedTo) {
  try {
    const response = await AxiosService.post("/tasks", {
      title,
      description,
      assignedTo,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function submitTask(id, data) {
  try {
    const response = await AxiosService.put("/tasks/submit/" + id, data);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function updateTask(id, data) {
  return await AxiosService.put("/tasks/" + id, data);
}
export async function deleteTask(id) {
  return await AxiosService.delete("/tasks/" + id);
}
