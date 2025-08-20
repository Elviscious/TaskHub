// src/app/workerdashboard/page.jsx

"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/ownerdashboard/page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

			<div className={`${styles.navigationBar} ${isOpen ? styles.open : ""}`}>
				<nav>
					<h1>MAIN MENU</h1>
					<ul className={styles.navUl}>
						<li className={`${styles.navItem} ${styles.active}`}>
							<Image src="/Home.png" alt="" width={30} height={30} />
							<p
								style={{
									color: "#3b82f6",
								}}
							>
								Dashboard
							</p>
						</li>
						<li className={styles.navItem}>
							<Image src="/plus.png" alt="" width={30} height={30} />
							<p>Post New Task</p>
						</li>
						<li className={styles.navItem}>
							<Image src="/book.png" alt="" width={30} height={30} />
							<p>My Tasks</p>
						</li>
						<li className={styles.navItem}>
							<Image src="/folder.png" alt="" width={30} height={30} />
							<p>Submissions</p>
						</li>
						<li className={styles.navItem}>
							<Image src="/Wallet.png" alt="" width={30} height={30} />
							<p>Wallet</p>
						</li>
						<li className={styles.navItem}>
							<Image
								src="/Setting_alt_line.png"
								alt=""
								width={30}
								height={30}
							/>
							<p>Settings</p>
						</li>
					</ul>
					<div
						className={styles.logOut}
						onClick={() => {
							document.cookie = "loggedIn=false; path=/; max-age=0";
							router.push("/login");
						}}
					>
						<Image src="/Sign_out_squre.png" alt="" width={30} height={30} />
						<p>Log Out</p>
					</div>
				</nav>
			</div>

			<button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
				<Image
					src={isOpen ? "/Close_round.png" : "/Menu.png"}
					alt="menu toggle"
					width={44}
					height={44}
				/>
			</button>
			<div className={styles.mainContent}>
				<div className={styles.topMenu}>
					<h1>Overview</h1>
					<button className={styles.topMenuBtn}>
						<Image
							src="/plus.png"
							width={20}
							height={20}
							alt="plus sign"
							style={{ filter: "brightness(100)" }}
						/>
						<span>Post new job</span>
					</button>
				</div>

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

				<div className={styles.submissions}>
					<h2>Submissions</h2>
					<div className={styles.myTaskContainer}>
						<div className={styles.taskContainer}>
							<p>Approved</p>
							<h2>5</h2>
						</div>
						<div className={styles.taskContainer}>
							<p>Pending</p>
							<h2>3</h2>
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
