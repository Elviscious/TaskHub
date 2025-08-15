"use client";

import React, { useState } from "react";
import styles from "@/app/signin/page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ChangePassword = () => {
	const [selectedRadio, setSelectedRadio] = useState("worker");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

	const togglePasswordVisibility = () => {
		if (password === "") {
			return;
		}
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		if (confirmPassword === "") {
			return;
		}
		setShowConfirmPassword(!showConfirmPassword);
	};

	// const showPasswordIcon = (e) => {
	// 	const inputField = e.target.nextElementSibling;
	// 	if (password === "") {
	// 		return;
	// 	}
	// 	if (inputField.type === "password") {
	// 		inputField.type = "text";
	// 		e.target.src = "/View_hide.png";
	// 	} else {
	// 		inputField.type = "password";
	// 		e.target.src = "/View.png";
	// 	}
	// };

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
					<h1 style={{ color: "black" }}>Create New Password</h1>
					<div className={styles.inputFields}>
						<div className={styles.formGroup}>
							<label htmlFor="password" style={{ color: "black" }}>
								Password
							</label>
							<Image
								alt="show"
								width={20}
								height={20}
								src={showPassword ? "/View_hide.png" : "/View.png"}
								className={styles.showPassword}
								onClick={togglePasswordVisibility}
								style={{
									marginTop: "43px",
								}}
							/>
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
							<Image
								alt="show"
								width={20}
								height={20}
								src={showConfirmPassword ? "/View_hide.png" : "/View.png"}
								className={styles.showPassword}
								onClick={toggleConfirmPasswordVisibility}
								style={{
									marginTop: "43px",
								}}
							/>
							<input
								type={showConfirmPassword ? "text" : "password"}
								id="confirm-password"
								name="confirm-password"
								value={confirmPassword}
								onChange={handlePassword}
								required
							/>
						</div>
						<p className={styles.errorMessage}>{passwordError}</p>
					</div>
					<button type="submit" className={styles.btn}>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChangePassword;
