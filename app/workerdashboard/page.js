"use client";

import React, { useState } from "react";
import styles from "@/app/workerdashboard/page.module.css"; // Assuming you have a CSS file for styles

function Dashboard() {
	const [isOpen, setIsOpen] = useState(false);

	React.useEffect(() => {
		if (isOpen) {
			document.body.classList.add("nav-open");
		} else {
			document.body.classList.remove("nav-open");
		}
	}, [isOpen]);

	return (
		<div className={styles.container}>
			<button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
				<img
					src={isOpen ? "/Close_round.png" : "/Menu.png"}
					alt="menu toggle"
					style={{ width: "44px", height: "44px" }}
				/>
			</button>

			<div className={`${styles.navigationBar} ${isOpen ? "open" : ""}`}>
				<nav className={styles.nav}>
					<h1>MAIN MENU</h1>
					<ul className={styles.navUl}>
						<div className={styles.upload}>
							<img src="/Home.png" alt="" />
							<p>Dashboard</p>
						</div>
						<div className={styles.availableTasks}>
							<img src="/plus.png" alt="" />
							<p>Post New Task</p>
						</div>
						<div className={styles.submittedTasks}>
							<img src="/book.png" alt="" />
							<p>My Tasks</p>
						</div>
						<div className={styles.earningHistory}>
							<img src="/folder.png" alt="" />
							<p>Submissions</p>
						</div>
						<div className={styles.wallet}>
							<img src="/Wallet.png" alt="" />
							<p>Wallet</p>
						</div>
						<div className={styles.setting}>
							<img src="/Setting_alt_line.png" alt="" />
							<p>Settings</p>
						</div>
					</ul>
					<div className={styles.logOut}>
						<img src="/Sign_out_squre.png" alt="" />
						<p>Log Out</p>
					</div>
				</nav>
			</div>

			<div className={styles.homePage}>
				<div className={styles.topMenu}>
					<h1>OVERVIEW</h1>
					<div className={styles.postJobBtn}>
						<img src="/plus.png" alt="plus" className={styles.icon} />
						<p>Post New Job</p>
					</div>
				</div>
				<div className={styles.innerContainer}>
					<h2>My Tasks</h2>

					<div className={styles.myTaskContainer}>
						<div className={styles.taskContainer}>
							<p>All Jobs</p>
							<h2>7</h2>
						</div>
						<div className={styles.taskContainer}>
							<p>Active Jobs</p>
							<h2>3</h2>
						</div>
						<div className={styles.taskContainer}>
							<p>Paused Jobs</p>
							<h2>9</h2>
						</div>
					</div>

					<div className={styles.innerContainer}>
						<h2>Submissions</h2>
						<div className={styles.myTaskContainer}>
							<div className={styles.taskContainer}>
								<p>Approved</p>
								<h2>5</h2>
							</div>

							<div className={styles.taskContainer}>
								<p>Pending</p>
								<h2>2</h2>
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
		</div>
	);
}

export default Dashboard;
