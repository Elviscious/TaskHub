import { availableTask as localTasks } from "../data/tasks";
import { pendingTask } from "../data/tasks";

const API = false;

export async function getTasks() {
  if (API) {
    const res = await fetch("", {
      cache: "no-store",
    });
    return await res.json();
  } else {
    return localTasks;
  }
}

export async function getTasksId(id) {
  if (API) {
    const res = await fetch("http://localhost:5000/api/tasks/${id}", {
      cache: "no-store",
    });
    return await res.json();
  } else {
    return localTasks.find((t) => String(t.id) === String(id));
  }
}

export async function getPendingTask() {
  if (API) {
    const res = await fetch("", {
      cache: "no-store",
    });
    return await res.json();
  } else {
    return pendingTask;
  }
}
