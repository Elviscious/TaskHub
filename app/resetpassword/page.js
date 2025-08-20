"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
// import styles from "@/app/login/page.module.css";
import resetStyles from "@/app/resetpassword/page.module.css";
import { AppContext } from "../context/context";
import Logo from "../components/logo";

const Reset = () => {
	const [activeEmail, setActiveEmail] = useState("");
	const { email, setEmail, baseUrl } = useContext(AppContext);
	const [apiError, setApiError] = useState("");
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setEmail(activeEmail);

		// router.push("/resetpassword/inputcode");
		const forget = {
			Email: activeEmail,
		};
		setLoading(true);

		try {
			const response = await fetch(`${baseUrl}/api/Auth/forgotPassword`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify(forget),
			});

			const data = await response.text();

			if (!response.ok) {
				console.log("Response status:", response.status);
				console.log("Response data:", data);
				throw new Error(data.error || "Invalid email");
			}
			// if (data === "User not found.") {
			// 	throw new Error("User not found");
			// }
			console.log("Sign up successful:", data);
			document.cookie = `emailEntered=true; path=/; max-age=300`; // expires in 5 mins
			document.cookie = "codeVerified=; path=/; max-age=0";

			router.push("/resetpassword/inputcode");
		} catch (error) {
			console.log("Error: ", error.message);
			setApiError(error.message);
			document.cookie = "emailEntered=false; path=/; max-age=300"; // expires
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setActiveEmail(e.target.value);
	};

	return (
		<div className={resetStyles.loginBg}>
			<Logo route={router} />
			<div
				className={` ${resetStyles.resetContainer} ${resetStyles.loginContainer}`}
			>
				<form
					className={resetStyles.loginForm}
					method="post"
					onSubmit={handleSubmit}
				>
					<h1 style={{ color: "black" }}>Reset Password</h1>
					<div className={resetStyles.inputFields}>
						<div className={resetStyles.formGroup}>
							<label
								htmlFor="email"
								style={{ color: "black", marginBottom: 5 }}
							>
								Input your email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								onChange={handleChange}
								value={activeEmail}
								required
							/>
						</div>
						<p className={resetStyles.errorMessage}>{apiError}</p>
					</div>
					<button
						type="submit"
						className={resetStyles.btn}
						disabled={loading}
						style={{
							cursor: loading ? "not-allowed" : "pointer",
							opacity: loading ? 0.7 : 1,
						}}
					>
						{loading ? "Sending Code..." : "Send Code"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Reset;
