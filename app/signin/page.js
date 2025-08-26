"use client";

import React, { useState, useContext } from "react";
import styles from "@/app/signin/page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AppContext } from "../context/context";
import Logo from "../components/logo";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setconfirmShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { baseUrl, setLoggedIn, selectedRadio, setSelectedRadio } =
    useContext(AppContext);
  // const baseUrl = "https://fxdt20jg-7098.uks1.devtunnels.ms";

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
    console.log(passwordError);

    const signUpData = {
      FullName: username,
      Email: email,
      CreatePassword: password,
      ConfirmPassword: password,
      Role: selectedRadio === "worker" ? 0 : 1,
    };

    if (errors.length > 0) {
      return; // Stop submission if there are errors
    }
    setLoading(true);
    // Proceed with form submission logic here
    try {
      const response = await fetch(`${baseUrl}/api/Auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign up");
      }
      console.log("Sign up successful:", data);
      setLoggedIn(true);
      document.cookie = `loggedIn=true; path=/; max-age=3600`;
      if (selectedRadio === "worker") {
        router.push("/workerdashboard");
      } else {
        router.push("/ownerdashboard");
      }
    } catch (error) {
      console.error("Error during sign up:", error.message);

      const errorMessages = error.message.split(",").map((msg) => msg.trim());
      const emailError = errorMessages.find((msg) => msg.startsWith("Email"));
      setApiError(emailError || "Email error occurred");
    } finally {
      setLoading(false);
    }
    // router.push("/dashboard");
  };

  return (
    <div className={styles.signupBg}>
      <div className={styles.signupContainer}>
        <form
          className={styles.signupForm}
          method="post"
          onSubmit={handleSubmit}
        >
          <div
            className={styles.logoContainer}
            style={{
              position: "relative",
              bottom: "10px",
              left: "0px",
              height: "5px",
              marginBottom: "20px",
              marginTop: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              src="/Money.svg"
              alt="logo"
              className={styles.logo}
              width={40}
              height={40}
            />
            <p
              style={{
                color: "#3b82f6",
                fontSize: 30,
                fontWeight: 600,
                margin: 0,
              }}
            >
              Logo
            </p>
          </div>
          <h1 style={{ color: "black" }}>Create Account</h1>
          <div className={styles.inputFields}>
            <div className={styles.formGroup}>
              <label htmlFor="username" style={{ color: "black" }}>
                Full Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" style={{ color: "black" }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
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
            <ul>
              {passwordError.map((error, index) => (
                <li key={index} className={styles.errorMessage}>
                  {error}
                </li>
              ))}
            </ul>
            {apiError && <p className={styles.errorMessage}>{apiError}</p>}

            <h3 style={{ color: "black" }}>Select Role:</h3>
          </div>
          <div className={styles.role}>
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
          <button
            type="submit"
            className={styles.btn}
            disabled={loading}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <p className={styles.loginText}>
            {" "}
            Already have an account?{" "}
            <span
              className={styles.highlight}
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
