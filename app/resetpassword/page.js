"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
// import styles from "@/app/login/page.module.css";
import resetStyles from "@/app/resetpassword/page.module.css";
import { AppContext } from "../context/resetcontext";

const Reset = () => {
	const [activeEmail, setActiveEmail] = useState("");
  const {email, setEmail} = useContext(AppContext);

	const handleSubmit = (e) => {
		e.preventDefault();
    setEmail(activeEmail);
		router.push("/resetpassword/inputcode");
	};

	const handleChange = (e) => {
    setActiveEmail(e.target.value);
  };

	const router = useRouter();

	return (
		<div className={resetStyles.loginBg}>
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
							<input type="email" id="email" name="email" onChange={handleChange} value={activeEmail} required />
						</div>
						<p className={resetStyles.errorMessage}></p>
					</div>
					<button type="submit" className={resetStyles.btn}>
						Send Code
					</button>
				</form>
			</div>
		</div>
	);
};

export default Reset;
