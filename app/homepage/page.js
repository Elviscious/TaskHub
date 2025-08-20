"use client";

import React, { useState } from "react";
import styles from "@/app/homepage/page.module.css";
import Link from "next/link";
import Image from "next/image";
export default function HomePage() {
	const [menu, setMenu] = useState(false);

	const toggleMenu = () => {
		setMenu(!menu);
	};
	return (
		<div>
			<div className={styles.header}>
				<div className={styles.logoContainer}>
					<Image
						src="/Money.svg"
						alt="logo"
						className={styles.logo}
						width={20}
						height={30}
					/>
					<p
						style={{
							color: "#3B82F6",
							fontSize: 30,
							fontWeight: 600,
							margin: 0,
						}}
					>
						Logo
					</p>
				</div>

				<div className={`${styles.callToAction} ${menu ? styles.active : ""}`}>
					<div
						className={`${styles.buttonsDisplay} ${menu ? styles.active : ""}`}
					>
						<Link href="/login">
							<button className={styles.loginBtn}>Login</button>
						</Link>
						<Link href="/signin">
							<button className={styles.signUpBtn}>Sign up</button>
						</Link>
					</div>
				</div>
				<div className={styles.hamburger} onClick={() => toggleMenu()}>
					{menu === false ? (
						<Image width={20} height={20} src="/Menu.svg" alt="" />
					) : (
						<Image
							width={20}
							height={20}
							src="/Close_round.svg"
							alt=""
							className={styles.cancel}
						/>
					)}
				</div>
			</div>

			<div className={styles.main}>
				<h1 className={styles.mainEarn}>
					Earn Money For <span style={{ color: "#3b82f6" }}>Simple Task</span>
				</h1>
				<p className={styles.mainText}>
					Connecting task owners with skilled workers worldwide. Post tasks and
					get work done, or complete simple task and earn money instantly
				</p>
				<div className={styles.userBtnContainer}>
					<button className={styles.workerBtn}>
						<Image
							width={20}
							height={20}
							src="/User.svg"
							alt="logo"
							style={{ width: 22, height: 22 }}
						/>
						<p style={{ fontSize: 15, margin: 0 }}> I&apos;m a Worker</p>
					</button>
					<button className={styles.ownerBtn}>
						<Image
							width={20}
							height={20}
							src="/briefcase.svg"
							alt="logo"
							style={{ width: 22, height: 22 }}
						/>
						<p style={{ fontSize: 15, margin: 0 }}>I&apos;m an Owner</p>
					</button>
				</div>

				<div className={styles.mainDetails}>
					<div className={styles.activeUser}>
						<p className={styles.detailsBold}>50k+</p>
						<p className={styles.detailsThin}>Active Users</p>
					</div>
					<div className={styles.taskCompleted}>
						<p className={styles.detailsBold}>1M+</p>
						<p className={styles.detailsThin}>Task Completed</p>
					</div>
					<div className={styles.earnedWorkers}>
						<p className={styles.detailsBold}>$2M+</p>
						<p className={styles.detailsThin}>Earned by Workers</p>
					</div>
				</div>
			</div>

			<div className={styles.taskhub}>
				<div className={styles.taskhubText}>
					<h1
						style={{
							margin: 0,
							textAlign: "center",
							fontSize: 36,
							color: "black",
						}}
					>
						Why Choose <span style={{ color: "#3B82F6" }}>TaskHub?</span>
					</h1>
					<p
						style={{
							textAlign: "center",
							marginTop: 20,
							marginBottom: 0,
							color: "black",
						}}
					>
						The most trusted platform connecting task owners with skilled
						workers worldwide
					</p>
				</div>
				<div className={styles.taskPlatform}>
					<div className={styles.platform}>
						<Image
							width={50}
							height={50}
							src="/money-recive.png"
							alt="logo"
							className={styles.platformImg}
						/>
						<h2 className={styles.platformH2}>Instant Payments</h2>
						<p className={styles.platformParagraph}>
							Get paid immediately after task approval. Secure payment
							processing with multiple withdrawal options including PayPal, bank
							transfer, and mobile money.
						</p>
					</div>
					<div className={styles.platform}>
						<Image
							width={50}
							height={50}
							src="/Chield_check.png"
							alt="logo"
							className={styles.platformImg}
						/>
						<h2 className={styles.platformH2}>Secure & Trusted</h2>
						<p className={styles.platformParagraph}>
							Get paid immediately after task approval. Secure payment
							processing with multiple withdrawal options including PayPal, bank
							transfer, and mobile money.
						</p>
					</div>
					<div className={styles.platform}>
						<Image
							width={50}
							height={50}
							src="/global.png"
							alt="logo"
							className={styles.platformImg}
						/>
						<h2 className={styles.platformH2}>Global Reach</h2>
						<p className={styles.platformParagraph}>
							Get paid immediately after task approval. Secure payment
							processing with multiple withdrawal options including PayPal, bank
							transfer, and mobile money.
						</p>
					</div>
				</div>
			</div>

			<div className={styles.guideline}>
				<div className={styles.guidelineText}>
					<h1 style={{ margin: 0, textAlign: "center", fontSize: 36 }}>
						How it Works
					</h1>
					<p style={{ textAlign: "center", marginTop: 20, marginBottom: 0 }}>
						Simple steps to start earning or get work done
					</p>
				</div>
				<div className={styles.guidelineOption}>
					<div className={styles.worker}>
						<h2 style={{ textAlign: "center", marginBottom: 20, marginTop: 0 }}>
							For Workers
						</h2>
						<div className={styles.workerContent}>
							<h3>1</h3>
							<div className={styles.workerText}>
								<p className={styles.firstText}>Signup and Get Verified</p>
								<p style={{ margin: 0, fontSize: 14 }}>
									Create your account and complete identity verification to
									access premium tasks
								</p>
							</div>
						</div>
						<div className={styles.workerContent}>
							<h3>2</h3>
							<div className={styles.workerText}>
								<p className={styles.firstText}>Signup and Get Verified</p>
								<p style={{ margin: 0, fontSize: 14 }}>
									Create your account and complete identity verification to
									access premium tasks
								</p>
							</div>
						</div>
						<div className={styles.workerContent}>
							<h3>3</h3>
							<div className={styles.workerText}>
								<p className={styles.firstText}>Signup and Get Verified</p>
								<p style={{ margin: 0, fontSize: 14 }}>
									Create your account and complete identity verification to
									access premium tasks
								</p>
							</div>
						</div>
						<div className={styles.workerContent}>
							<h3>4</h3>
							<div className={styles.workerText}>
								<p className={styles.firstText}>Signup and Get Verified</p>
								<p style={{ margin: 0, fontSize: 14 }}>
									Create your account and complete identity verification to
									access premium tasks
								</p>
							</div>
						</div>
					</div>
					<div className={styles.owner}>
						<h2 style={{ textAlign: "center", marginBottom: 20, marginTop: 0 }}>
							For Task Owners
						</h2>
						<div className={styles.ownerContent}>
							<h3>1</h3>
							<div>
								<p className={styles.firstText}>Signup and Get Verified</p>
								<p style={{ margin: 0, fontSize: 14 }}>
									Create your account and complete identity verification
								</p>
							</div>
						</div>
						<div className={styles.ownerContent}>
							<h3>2</h3>
							<div>
								<p className={styles.firstText}>
									Fund your task and post your task
								</p>
								<p style={{ margin: 0, fontSize: 14 }}>
									Add funds securely through different payment channel, describe
									your tasks, set budgets and specific requirement clearly
								</p>
							</div>
						</div>
						<div className={styles.ownerContent}>
							<h3>3</h3>
							<div>
								<p className={styles.firstText}>Review Submissions</p>
								<p style={{ margin: 0, fontSize: 14 }}>
									Workers submit their completed tasks for your approval or
									feedback
								</p>
							</div>
						</div>
						<div className={styles.ownerContent}>
							<h3>4</h3>
							<div>
								<p className={styles.firstText}>Approve & Pay</p>
								<p style={{ margin: 0, fontSize: 14 }}>
									Approve quality work and payment are automatically released to
									workers
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.getStarted}>
				<h1>
					Ready to Get <span>Started?</span>
				</h1>
				<p>
					Join thousands of satisfied workers earning on our platform and task
					owners getting work done with ease and efficiency
				</p>
				<Link href="/signin">
					<button>Signup NOW!!</button>
				</Link>
			</div>

			<div className={styles.footer}>
				<div className={styles.footerDisplay}>
					<div className={styles.socialIcons}>
						<Image width={50} height={50} src="/Facebook.png" alt="" />
						<Image width={50} height={50} src="/Instagram.png" alt="" />
						<Image width={50} height={50} src="/Twitter.png" alt="" />
						<Image width={50} height={50} src="/LinkedIn.png" alt="" />
					</div>
					<div className={styles.footerContent}>
						<div className={styles.footerText}>
							<h3>Platform</h3>
							<p>How it works</p>
							<p>Features</p>
							<p>API Documentation</p>
						</div>
						<div className={styles.footerText}>
							<h3>Support</h3>
							<p>Help Center</p>
							<p>FAQ</p>
							<p>Contact Us</p>
						</div>
						<div className={styles.footerText}>
							<h3>Legal</h3>
							<p>Terms of Service</p>
							<p>Privacy Policy</p>
							<p>Cookie Policy</p>
						</div>
					</div>
				</div>
				<hr
					style={{
						color: "#faf9fe",
						width: "100%",
						opacity: "20%",
						marginTop: 50,
					}}
				/>
				<div className={styles.footerBottomText}>
					<Image width={20} height={20} src="/copyright.png" alt="" />
					<p
						style={{
							color: "#faf9fe",
							opacity: "80%",
							fontSize: 20,
						}}
					>
						2025 TaskHub.All rights reserved
					</p>
				</div>
			</div>
		</div>
	);
}
