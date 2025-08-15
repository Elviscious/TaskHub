"use client";

import React, { useState } from "react";
import styles from "@/app/signin/page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SignUp = () => {
	const [selectedRadio, setSelectedRadio] = useState("worker");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [confirmShowPassword, setconfirmShowPassword] = useState(false);
	const router = useRouter();

	const handleOptionChange = (e) => {
		setSelectedRadio(e.target.value);
	};

	const handlePassword = (e) => {
		if (e.target.name === "password") {
			setPassword(e.target.value);
		} else if (e.target.name === "confirm-password") {
			setConfirmPassword(e.target.value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setPasswordError("Passwords don't match");
			return;
		}

		if (password.length < 6) {
			setPasswordError("Password is too short");
			return;
		}

		setPasswordError("");
		// Proceed with form submission logic here

		router.push("/dashboard");
	};

	return (
		<div className={styles.signupBg}>
			<div className={styles.signupContainer}>
				<form
					className={styles.signupForm}
					method="post"
					onSubmit={handleSubmit}
				>
					<h1 style={{ color: "black" }}>Create Account</h1>
					<div className={styles.inputFields}>
						<div className={styles.formGroup}>
							<label htmlFor="username" style={{ color: "black" }}>
								Full Name
							</label>
							<input type="text" id="username" name="username" required />
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="email" style={{ color: "black" }}>
								Email
							</label>
							<input type="email" id="email" name="email" required />
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="password" style={{ color: "black" }}>
								Password
							</label>
							<div
								onClick={() => {
									if (password === "") return;
									{
										showPassword
											? setShowPassword(false)
											: setShowPassword(true);
									}
								}}
							>
								<Image
									width={10}
									height={20}
									alt="show"
									src={showPassword ? "/View_hide.png" : "/View.png"}
									className={styles.showPassword}
								/>
							</div>
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								value={password}
								onChange={handlePassword}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="confirm-password" style={{ color: "black" }}>
								Confirm Password
							</label>
							<div
								onClick={() => {
									if (confirmPassword === "") return;
									{
										confirmShowPassword
											? setconfirmShowPassword(false)
											: setconfirmShowPassword(true);
									}
								}}
							>
								<Image
									width={10}
									height={20}
									alt="show"
									src={confirmShowPassword ? "/View_hide.png" : "/View.png"}
									className={styles.showPassword}
								/>
							</div>
							<input
								type={confirmShowPassword ? "text" : "password"}
								id="confirm-password"
								name="confirm-password"
								value={confirmPassword}
								onChange={handlePassword}
								required
							/>
						</div>
						<p className={styles.errorMessage}>{passwordError}</p>
						<h3 style={{ color: "black" }}>Select Role:</h3>
					</div>
					<div className="role">
						<input
							type="radio"
							name="role"
							id="worker"
							value="worker"
							checked={selectedRadio === "worker"}
							onChange={handleOptionChange}
						/>
						<label htmlFor="worker" style={{ color: "black", marginRight: 7 }}>
							Worker
						</label>
						<input
							type="radio"
							name="role"
							id="owner"
							value="owner"
							checked={selectedRadio === "owner"}
							onChange={handleOptionChange}
						/>
						<label htmlFor="owner" style={{ color: "black" }}>
							Owner
						</label>
					</div>
					<button type="submit" className={styles.btn}>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
