// src/app/workerdashboard/page.jsx

"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "@/app/ownerdashboard/page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import otherstyles from "./dashboard.module.css";
import { AppContext } from "../context/context";

function Dashboard() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const { baseUrl } = useContext(AppContext);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("navOpen");
		} else {
			document.body.classList.remove("navOpen");
		}
	}, [isOpen]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		console.log(token);
		async function fetchData() {
			try {
				const response = await fetch(`${baseUrl}/api/MainServices/Dashboard`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`, // Add token here
					},
				});
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const result = await response.json();
				console.log(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
		fetchData();
	}, []);
	return (
		<div>
			{/* Hamburger menu for mobile view */}

			<div className={otherstyles.mainContent}>
				<div className={styles.topMenu}>
					<h1>Overview</h1>
				</div>

				<h2>My Tasks</h2>
				<div className={styles.myTaskContainer}>
					<div className={styles.taskContainer}>
						<p>All Jobs</p>
						<h2>0</h2>
					</div>
					<div className={styles.taskContainer}>
						<p>Active Jobs</p>
						<h2>0</h2>
					</div>
					<div className={styles.taskContainer}>
						<p>Paused Jobs</p>
						<h2>0</h2>
					</div>
				</div>

				<div className={styles.submissions}>
					<h2>Submissions</h2>
					<div className={styles.myTaskContainer}>
						<div className={styles.taskContainer}>
							<p>Approved</p>
							<h2>0</h2>
						</div>
						<div className={styles.taskContainer}>
							<p>Pending</p>
							<h2>0</h2>
						</div>
						<div className={styles.taskContainer}>
							<p>Rejected</p>
							<h2>0</h2>
						</div>
					</div>
				</div>

				<div className={styles.walletBalance}>
					<p>Wallet Balance</p>
					<h2>$0</h2>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
