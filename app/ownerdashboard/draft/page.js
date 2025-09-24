"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "@/app/ownerdashboard/draft/page.module.css";
import { AppContext } from "@/app/context/context";
import { useRouter } from "next/navigation";

export default function DraftsTable() {
	const { baseUrl } = useContext(AppContext);
	const [drafts, setDrafts] = useState([]);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		const fetchData = async () => {
			try {
				const res = await fetch(
					`${baseUrl}/api/MainServices/GetAllTaskDrafts`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!res.ok) {
					throw new Error("Failed to fetch");
				}

				const data = await res.json();
				console.log(data);
				setDrafts(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const editDraft = async (item) => {
		const updateDraftData = {
			JobTitle: item.JobTitle,
			Platform: item.Platform,
			Type: item.Type,
			Instructions: item.Instructions,
			RequiredProof: item.RequiredProof,
			Budget: item.Budget,
			NumberOfWorkers: item.NumberOfWorkers,
			Link: item.Link,
		};

		console.log("draftData:", updateDraftData);
		const token = localStorage.getItem("token");
		const fetchData = async () => {
			try {
				const res = await fetch(
					`${baseUrl}/api/MainServices/UpdateTaskDraft/${item.Id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(updateDraftData),
					}
				);

				if (!res.ok) {
					throw new Error("Failed to put data");
				}

				const data = await res.json();
				console.log(data);

				router.push(`/ownerdashboard/draft/${item.Id}`);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	};
	const deleteDraft = async (id) => {
		const token = localStorage.getItem("token");
		const fetchData = async () => {
			try {
				const res = await fetch(
					`${baseUrl}/api/MainServices/DeleteTaskDraft/${id}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!res.ok) {
					throw new Error("Failed to put data");
				}

				const data = await res.json();
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
		setDrafts((prev) => prev.filter((draft) => draft.Id !== id));
	};

	return (
		<div className={styles.draftsContainer}>
			<h2>Drafts</h2>

			<div className={styles.tableContainer}>
				<table className={styles.draftsTable}>
					<thead>
						<tr>
							<th>S/N</th>
							<th>Title</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className={styles.draftBody}>
						{drafts.length === 0 ? (
							<tr>
								<td colSpan={3}>No Drafts found...</td>
							</tr>
						) : (
							drafts.map((item, index) => (
								<tr key={index} className={styles.tableRow}>
									<td className={styles.tableData}>{index + 1}</td>
									<td className={styles.tableData}>{item.JobTitle}</td>

									<td>
										<div className={styles.actionsBtn}>
											<button
												className={styles.imgBtn}
												onClick={() => {
													editDraft(item);
												}}
											>
												<img
													src="/pen.png"
													alt="edit"
													className={styles.iconBtn}
												/>
											</button>

											<button
												className={styles.imgBtn}
												onClick={() => deleteDraft(item.Id)}
											>
												<img
													src="\waste.png"
													alt="delete"
													className={styles.iconBtn}
												/>{" "}
											</button>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
