"use client";

import React, { useState } from "react";
import styles from "@/app/login/page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

	const handlePassword = (e) => {
		if (e.target.name === "password") {
			setPassword(e.target.value);
		} else if (e.target.name === "confirm-password") {
			setConfirmPassword(e.target.value);
		}
	};


	const handleSubmit = (e) => {
		e.preventDefault();

		router.push("/dashboard");
	};

	return (
		<div className={styles.loginBg}>
			<div className={styles.loginContainer}>
				<form
					className={styles.loginForm}
					method="post"
					onSubmit={handleSubmit}
				>
					<h1 style={{ color: "black" }}>Login</h1>
					<div className={styles.inputFields}>
						<div className={styles.formGroup}>
							<label
								htmlFor="email"
								style={{ color: "black", marginBottom: 5 }}
							>
								Email
							</label>
							<input type="email" id="email" name="email" required />
						</div>
						<div className={styles.formGroup}>
							<label
								htmlFor="password"
								style={{ color: "black", marginBottom: 5 }}
							>
								Password
							</label>
							<div onClick={()=>{
                if(password === "") return;
                {showPassword? setShowPassword(false) : setShowPassword(true)}; 
              }}>
								<Image
									width={10}
									height={20}
									alt="show"
									src={showPassword ? "/View_hide.png" : "/View.png"}
									className={styles.showPassword}
								/>
							</div>

							<input
								type={showPassword? "text" : "password"}
								id="password"
								name="password"
								value={password}
								onChange={handlePassword}
								required
							/>
						</div>
						<div className={styles.info}>
							<Link href="/resetpassword" className={styles.highlight}>
								<p>Forgot Password?</p>
							</Link>
							<p style={{ color: "black" }}>
								Don&apos;t have an acount?
								<Link href="/signin" className={styles.highlight}>
									{" "}
									SignUp Here.
								</Link>
							</p>
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

export default Login;
