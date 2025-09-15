export async function getTasks(baseUrl) {
	// Fetch tasks from an external API
	try {
		const res = await fetch(`${baseUrl}/api/TaskSubmission`, {
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
		return data;
	} catch (error) {
		console.error("Error fetching tasks:", error);
		return [];
	}
}
