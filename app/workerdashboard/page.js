// src/app/workerdashboard/page.jsx

"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/workerdashboard/page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";

function Dashboard() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("navOpen");
		} else {
			document.body.classList.remove("navOpen");
		}
	}, [isOpen]);

	return (
		<div className={styles.container}>
			{/* Hamburger menu for mobile view */}

			<Navbar
				list1="Dashboard"
				list2="My Task"
				list3="Submitted Tasks"
				list4="Earning History"
				list5="Wallet"
				src1="/Home.png"
				src2="/book.png"
				src3="/upload.png"
				src4="/Folders_line.png"
				src5="/Wallet.png"
				link1="/workerdashboard"
				link2="/workerdashboard"
				link3="/workerdashboard"
				link4="/workerdashboard"
				link5="/workerdashboard"
				link6="/workerdashboard"
			/>
			<div className={styles.mainContent}>
				<div className={styles.topMenu}>
					<h1>Overview</h1>
				</div>

				<h2>My Tasks</h2>
				<div className={styles.myTaskContainer}>
					<div className={styles.taskContainer}>
						<p>Available</p>
						<h2>7</h2>
					</div>
					<div className={styles.taskContainer}>
						<p>Pending</p>
						<h2>3</h2>
					</div>
					<div className={styles.taskContainer}>
						<p>Completed</p>
						<h2>9</h2>
					</div>
				</div>

				<div className={styles.submissions}>
					<h2>Submissions</h2>
					<div className={styles.myTaskContainer}>
						<div className={styles.taskContainer}>
							<p>Approved</p>
							<h2>5</h2>
						</div>
						<div className={styles.taskContainer}>
							<p>Rejected</p>
							<h2>10</h2>
						</div>
					</div>
				</div>

				<div className={styles.walletBalance}>
					<p>Wallet Balance</p>
					<h2>$2,000.00</h2>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
