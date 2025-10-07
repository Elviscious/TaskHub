"use client";

import React, { useState, useContext } from "react";
import styles from "@/app/login/page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AppContext } from "../context/context";
import Logo from "../components/logo";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { baseUrl, setLoggedIn } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handlePassword = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      Email: email,
      Password: password,
    };
    setLoading(true);
    // Proceed with form submission logic here
    try {
      const response = await fetch(`${baseUrl}/api/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      const token = data.Token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      console.log(decoded);
      if (!response.ok) {
        throw new Error(data.error || "Failed to sign up");
      }
      console.log("Sign up successful:", data);
      setLoggedIn(true);
      document.cookie = `loggedIn=true; path=/; max-age=3600`;
      if (
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] === "Owner"
      ) {
        router.push("/ownerdashboard");
      } else if (
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] === "Worker"
      ) {
        router.push("/workerdashboard");
      }
    } catch (error) {
      console.log("Error during sign up:", error.message);

      // const errorMessages = error.message.split(",").map((msg) => msg.trim());
      // const emailError = errorMessages.find((msg) => msg.startsWith("Email"));
      setApiError(
        error.message === "Invalid login attempt."
          ? "Wrong password"
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginBg}>
      <Logo route={router} />
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
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                required
                onChange={handlePassword}
              />
            </div>
            <div className={styles.formGroup}>
              <label
                htmlFor="password"
                style={{ color: "black", marginBottom: 5 }}
              >
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
            {/* {apiError && <p className={styles.errorMessage}>{apiError}</p>} */}
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
          <button
            type="submit"
            className={styles.btn}
            disabled={loading}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
