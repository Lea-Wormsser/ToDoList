import axios from "axios";

// בסיס הכתובת לשרת שלך
axios.defaults.baseURL = "http://localhost:5116";

// שליפת כל המשימות
export async function getTasks() {
  const response = await axios.get("/items");
  return response.data;
}

// הוספת משימה חדשה
export async function addTask(task) {
  const response = await axios.post("/items", task);
  return response.data;
}

// עדכון משימה קיימת
export async function updateTask(id, updatedTask) {
  const response = await axios.put(`/items/${id}`, updatedTask);
  return response.data;
}

// מחיקת משימה
export async function deleteTask(id) {
  const response = await axios.delete(`/items/${id}`);
  return response.data;
}
