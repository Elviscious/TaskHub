"use client";

import React, { useState, useRef, useContext, use } from "react";
import codeStyles from "@/app/resetpassword/inputcode/page.module.css";
import { AppContext } from "@/app/context/context";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Code = () => {
	const [otp, setOtp] = useState(["", "", "", "", ""]);
	const inputRefs = useRef([]);
	const { email, baseUrl } = useContext(AppContext);
	const router = useRouter();
	const OTP = 123456;

	const handleChange = (e, index) => {
		const value = e.target.value;
		if (/^\d*$/.test(value) && value.length <= 1) {
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);

			if (value && index < otp.length - 1) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const fullOtp = otp.join("");

		const verifyData = {
			Email: email,
			Code: fullOtp,
		};

		try {
			const response = await fetch(`${baseUrl}/api/Auth/verifyResetCode`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify(verifyData),
			});

			const data = await response.text();

			if (!response.ok) {
				console.log("Response status:", response.status);
				console.log("Response data:", data);
				throw new Error(data.error || "Invalid email");
			}
			console.log("Sign up successful:", data);
			document.cookie = `codeVerified=true; path=/; max-age=300`;

			router.push("/resetpassword/changepassword");
		} catch (error) {
			console.log("Error: ", error.message);
		}
	};

	return (
		<div className={codeStyles.loginBg}>
			<div className={`${codeStyles.loginContainer}`}>
				<form
					className={codeStyles.loginForm}
					method="post"
					onSubmit={handleSubmit}
				>
					<h1 style={{ color: "black" }}>Reset Password</h1>
					{/* <div
						className={`${codeStyles.inputFields} ${codeStyles.inputFields}`}
					> */}
					<div className={codeStyles.formGroup}>
						<label htmlFor="email" style={{ color: "black", marginBottom: 5 }}>
							Enter Code Below
						</label>
						<p
							style={{
								color: "#4b5563",
								fontSize: ".7rem",
							}}
						>
							Check your email <b>{email}</b> for a 5-digit code
						</p>
					</div>
					<p className={codeStyles.errorMessage}></p>
					<div className={codeStyles.inputCode}>
						{otp.map((digit, index) => (
							<input
								key={index}
								type="text"
								maxLength="1"
								value={digit}
								onChange={(e) => handleChange(e, index)}
								onKeyDown={(e) => handleKeyDown(e, index)}
								ref={(el) => (inputRefs.current[index] = el)}
							/>
						))}
					</div>
					{/* </div> */}
					<button type="submit" className={codeStyles.btn}>
						Confirm
					</button>
				</form>
			</div>
		</div>
	);
};

export default Code;
