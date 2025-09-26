"use client";

import React, { useContext, useState, useEffect } from "react";
import styles from "@/app/workerdashboard/mytask/pendingtask/page.module.css";
import { useRouter } from "next/navigation";
import { getPendingTask } from "../lib/getTasks";
import { AppContext } from "@/app/context/context";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

export default function MyTask() {
	const { baseUrl } = useContext(AppContext);
	const router = useRouter();
	const [pending, setPending] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			console.log("Token not found");
			return;
		}

		let userKey;

		try {
			const decoded = jwtDecode(token);
			const email =
				decoded[
					"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
				];

			userKey = `pendingTask_${email}`;
		} catch (error) {
			console.log(error);
		}
		const saved = JSON.parse(localStorage.getItem(userKey)) || [];
		setPending(saved);
	}, []);

	const handleComplete = (id) => {
		const token = localStorage.getItem("token");
		const fetchData = async () => {
			try {
				const res = await fetch(`${baseUrl}/api/TaskSubmission/start/${id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await res.json();
				console.log(data);

				router.push(`/workerdashboard/mytask/${id}`);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 style={{ margin: 0 }}>Pending Tasks</h1>
				<div>
					<Link href={`/workerdashboard/mytask`}>
						<button className={styles.button}>View Task</button>
					</Link>
				</div>
			</div>

			{pending.length === 0 ? (
				<p style={{ marginTop: 60 }}>No Pending tasks</p>
			) : (
				<div className={styles.tableContainer}>
					<table className={styles.table}>
						<thead className={styles.tableHead}>
							<tr>
								<th>S/N</th>
								<th>Title</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							{pending.map((task, index) => (
								<tr key={index} className={styles.tableRow}>
									<td className={styles.tableData}>{index + 1}</td>
									<td className={styles.tableTitle}>{task.JobTitle}</td>
									<td className={styles.tableData}>{task.status}</td>
									<td className={styles.tableData}>
										<button
											className={styles.buttonData}
											onClick={() => handleComplete(task.taskId)}
										>
											Complete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
