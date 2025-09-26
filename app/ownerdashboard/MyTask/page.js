"use client";
import { useEffect, useState, useContext } from "react";
import styles from "./page.module.css";
import { AppContext } from "../../context/context";
export default function MyTask() {
	const [selectedTask, setSelectedTask] = useState(null);
	const [data, setData] = useState([]);

	const { baseUrl } = useContext(AppContext);

	// const data = [
	// 	// {
	// 	// 	id: 1,
	// 	// 	JobTitle: "Follow my YouTube channel",
	// 	// 	platform: "YouTube",
	// 	// 	instructions:
	// 	// 		"Click follow on my channel to stay updated with new videos.",
	// 	// 	requiredProof: "screenshot",
	// 	// 	link: "https://youtube.com/mychannel",
	// 	// 	budget: 5,
	// 	// 	numberOfWorkers: 100,
	// 	// },
	// 	// {
	// 	// 	id: 2,
	// 	// 	JobTitle: "Like my Instagram post",
	// 	// 	platform: "Instagram",
	// 	// 	instructions: "Open my latest Instagram post and hit the like button.",
	// 	// 	requiredProof: "screenshot",
	// 	// 	link: "https://instagram.com/myprofile",
	// 	// 	budget: 5,
	// 	// 	numberOfWorkers: 100,
	// 	// },
	// 	// {
	// 	// 	id: 3,
	// 	// 	JobTitle: "Retweet my tweet",
	// 	// 	platform: "Twitter",
	// 	// 	instructions: "Go to my Twitter profile and retweet the pinned tweet.",
	// 	// 	requiredProof: "link",
	// 	// 	link: "https://twitter.com/myprofile",
	// 	// 	budget: 5,
	// 	// 	numberOfWorkers: 100,
	// 	// },
	// 	// {
	// 	// 	id: 4,
	// 	// 	JobTitle: "Comment on my Facebook post",
	// 	// 	platform: "Facebook",
	// 	// 	instructions: "Write a positive comment under my recent Facebook post.",
	// 	// 	requiredProof: "screenshot",
	// 	// 	link: "https://facebook.com/myprofile",
	// 	// 	budget: 5,
	// 	// 	numberOfWorkers: 100,
	// 	// },
	// 	// {
	// 	// 	id: 5,
	// 	// 	JobTitle: "Subscribe to my YouTube channel",
	// 	// 	platform: "YouTube",
	// 	// 	instructions: "Click subscribe on my channel and turn on notifications.",
	// 	// 	requiredProof: "screenshot",
	// 	// 	link: "https://youtube.com/mychannel",
	// 	// 	budget: 5,
	// 	// 	numberOfWorkers: 100,
	// 	// },
	// 	// {
	// 	// 	id: 6,
	// 	// 	JobTitle: "Follow my TikTok account",
	// 	// 	platform: "TikTok",
	// 	// 	instructions: "Go to my TikTok profile and hit the follow button.",
	// 	// 	requiredProof: "screenshot",
	// 	// 	link: "https://tiktok.com/@myprofile",
	// 	// 	budget: 5,
	// 	// 	numberOfWorkers: 100,
	// 	// },
	// 	// {
	// 	// 	id: 7,
	// 	// 	JobTitle: "Share my LinkedIn post",
	// 	// 	platform: "LinkedIn",
	// 	// 	instructions: "Repost my latest LinkedIn article to your feed.",
	// 	// 	requiredProof: "link",
	// 	// 	link: "https://linkedin.com/in/myprofile",
	// 	// 	budget: 5,
	// 	// 	numberOfWorkers: 100,
	// 	// },
	// 	// {
	// 	// 	id: 8,
	// 	// 	JobTitle: "Join my Discord server",
	// 	// 	platform: "Discord",
	// 	// 	instructions: "Accept the invite link and join my Discord server.",
	// 	// 	requiredProof: "link",
	// 	// 	link: "https://discord.gg/myserver",
	// 	// 	budget: 5,
	// 	// 	numberOfWorkers: 100,
	// 	// },
	// 	// {
	// 	// 	id: 9,
	// 	// 	JobTitle: "Pin my Pinterest pin",
	// 	// 	platform: "Pinterest",
	// 	// 	instructions: "Save my pin to your board on Pinterest.",
	// 	// 	requiredProof: "screenshot",
	// 	// 	link: "https://pinterest.com/myprofile",
	// 	// 	budget: 5,
	// 	// 	numberOfWorkers: 100,
	// 	// },
	// 	// {
	// 	// 	id: 10,
	// 	// 	JobTitle: "Follow my Reddit account",
	// 	// 	platform: "Reddit",
	// 	// 	instructions: "Follow me on Reddit to see my latest posts.",
	// 	// 	requiredProof: "link",
	// 	// 	link: "https://reddit.com/user/myprofile",
	// 	// 	budget: 5,
	// 	// 	numberOfWorkers: 100,
	// 	// },
	// ];

	useEffect(() => {
		const token = localStorage.getItem("token");

		async function fetchTasks() {
			try {
				const response = await fetch(
					`${baseUrl}/api/MainServices/GetAllTaskPost`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const result = await response.json();
				setData(result);
				console.log(result);
			} catch (error) {
				console.error("Error fetching tasks:", error);
			}
		}
		fetchTasks();
	}, []);

	const proofTypes = {
		0: "Image",
		1: "Link",
		2: "Document",
	};

	const platform = {
		0: "Facebook",
		1: "Instagram",
		2: "Twitter",
		3: "LinkedIn",
		4: "TikTok",
		5: "YouTube",
	};

	return (
		<div className={styles.container}>
			<h1>My Tasks</h1>

			{data.length == 0 ? (
				<p>No task yet...</p>
			) : (
				<div className={styles.tableContainer}>
					<table className={styles.tableHeader}>
						<thead>
							<tr>
								<th>S/N</th>
								<th>Titles</th>
								{/* <th>Status</th> */}
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{data.map((task, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{task.JobTitle}</td>
									{/* <td>{task.status}</td> */}
									<td className={styles.actBtn}>
										<button
											className={styles.imgBtn}
											onClick={() => setSelectedTask(task)}
										>
											<img
												src="/book.png"
												alt="Folder"
												className={styles.imgIcon}
											/>
										</button>
										{/* <button className={styles.imgBtn}>
                              <img src="/pen.png" alt="Edit" className={styles.imgIcon} />
                          </button> */}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{selectedTask && (
				<div
					className={styles.popupOverlay}
					onClick={() => setSelectedTask(null)}
				>
					<div
						className={styles.popupMenu}
						onClick={(e) => e.stopPropagation()}
					>
						<p>
							<strong>Title:</strong> {selectedTask.JobTitle}
						</p>
						<p>
							<strong>Platform:</strong> {platform[selectedTask.Platform]}
						</p>
						<p>
							<strong>Instructions:</strong> {selectedTask.Instructions}
						</p>
						<p>
							<strong>Required Proof:</strong>{" "}
							{proofTypes[selectedTask.RequiredProof]}
						</p>
						<p>
							<strong>Link:</strong>{" "}
							<a href={selectedTask.Link} target="_blank">
								Open
							</a>
						</p>
						<p>
							<strong>Budget:</strong> ${selectedTask.Budget}
						</p>
						<p>
							<strong>Workers:</strong> {selectedTask.NumberOfWorkers}
						</p>

						<button
							className={styles.closeBtn}
							onClick={() => setSelectedTask(null)}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
