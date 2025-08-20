"use client";

import React, { useState, useContext } from "react";
import styles from "@/app/signin/page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AppContext } from "@/app/context/context";
import Logo from "@/app/components/logo";

const ChangePassword = () => {
	const [selectedRadio, setSelectedRadio] = useState("worker");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState([]);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const router = useRouter();
	const { email, baseUrl } = useContext(AppContext);

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const errors = [];

		if (password.length < 8) {
			errors.push("At least 8 characters required.");
		}
		if (!/[a-z]/.test(password)) {
			errors.push("Must include at least one lowercase letter.");
		}
		if (!/[A-Z]/.test(password)) {
			errors.push("Must include at least one uppercase letter.");
		}
		if (!/\d/.test(password)) {
			errors.push("Must include at least one digit.");
		}
		if (/[^A-Za-z\d]/.test(password)) {
			errors.push("No special characters allowed.");
		}
		if (password !== confirmPassword) {
			errors.push("Password doesn't match");
		}

		// setVerifyPassword(true);

		setPasswordError(errors);
		// setPasswordError("");

		const signUpData = {
			Email: email,
			NewPassword: password,
			ConfirmPassword: password,
		};

		if (errors.length > 0) {
			return; // Stop submission if there are errors
		}

		// Proceed with form submission logic here
		try {
			const response = await fetch(`${baseUrl}/api/Auth/resetPassword`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(signUpData),
			});

			const data = await response.text();

			if (!response.ok) {
				throw new Error(data.error || "Failed to sign up");
			}
			console.log("Sign up successful:", data);
			router.push("/ownerdashboard");
		} catch (error) {
			console.error("Error during sign up:", error.message);

			// const errorMessages = error.message.split(",").map((msg) => msg.trim());
			// const emailError = errorMessages.find((msg) => msg.startsWith("Email"));
			// setApiError(emailError || "Email error occurred");
		}
	};

	return (
		<div className={styles.signupBg}>
			<Logo route={router} />
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
						<ul>
							{passwordError.map((error, index) => (
								<li key={index} className={styles.errorMessage}>
									{error}
								</li>
							))}
						</ul>
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
