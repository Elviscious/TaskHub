import { data } from "../data/tasks";

const API = false;

export async function getTasks() {
  if (API) {
    // Fetch tasks from an external API
    const response = await fetch("https://api.example.com/tasks");
    const tasks = await response.json();
    return tasks;
  } else {
    // Return static data for development/testing
    return data;
  }
}