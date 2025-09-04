
import { availableTask as localTasks } from "../data/tasks";
import { pendingTask } from "../data/tasks";


const API = true;

export async function getTasks(baseUrl) {
	if (API) {
		try {
			const res = await fetch(`${baseUrl}/api/MainServices/AvailableTask`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			if (!res.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await res.json();
			console.log(data);
			return data;
		} catch (error) {
			console.error("Error fetching tasks:", error);
			return [];
		}
	} else {
		return localTasks;
	}
}

export async function getTasksId(id, baseUrl) {
	if (API) {
		try {
			const res = await fetch(
				`${baseUrl}/api/MainServices/GetTaskPostById/${id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			if (!res.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await res.json();
			console.log(data);
			return data;
		} catch (error) {
			console.error("Error fetching tasks:", error);
			return [];
		}
	} else {
		return localTasks.find((t) => String(t.id) === String(id));
	}
}
export async function getFirstTaskDetails(baseUrl) {
	try {
		const tasks = await getTasks(baseUrl); // First API call
		if (tasks.length > 0) {
			const firstTaskId = tasks[0].id; // Pick the first task's ID
			console.log("First task ID:", firstTaskId);

			// Call second API using the ID
			const details = await getTasksId(firstTaskId, baseUrl);
      console.log("Task details:", details);
			return details;
		} else {
			console.warn("No tasks found");
			return null;
		}
	} catch (error) {
		console.error("Error in getFirstTaskDetails:", error);
		return null;
	}
}

export async function getPendingTask() {
	if (!API) {
		const res = await fetch("", {
			cache: "no-store",
		});
		return await res.json();
	} else {
		return pendingTask;
	}
}
