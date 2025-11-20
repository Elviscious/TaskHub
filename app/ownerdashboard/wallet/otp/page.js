"use client";

import styles from "@/app/ownerdashboard/wallet/withdraw/page.module.css";
import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "@/app/context/context";
import { useRouter } from "next/navigation";

export default function PayOut() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [successful, setSuccessful] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRefs = useRef([]);
  const { baseUrl, transferCode } = useContext(AppContext);

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

    const token = localStorage.getItem("token");
    const fullOtp = otp.join("");

    setLoading(true);

    const otpData = {
      TransferCode: transferCode,
      Otp: fullOtp,
    };

    if (fullOtp.length === 6) {
      try {
        const res = await fetch(`${baseUrl}/api/Paystack/FinalizeTransfer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(otpData),
        });

        const data = await res.json();
        console.log(data);
        setSuccessful(true);

        setTimeout(() => {
          setSuccessful(false);
          router.push("/ownerdashboard/wallet");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    } else {
      setOtpError(true);
    }
  };

  return (
    <div style={{ paddingTop: 40 }}>
      <h1 style={{ marginLeft: 30, marginBottom: 7 }}>Withdrawal</h1>
      <span
        onClick={() => {
          router.push("/ownerdashboard/wallet/payout");
        }}
        style={{ cursor: "pointer", color: "black", marginLeft: 30 }}
      >
        Go Back
      </span>

      <div>
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 style={{ marginBottom: 10 }}>Verify OTP</h1>
            <p style={{ fontWeight: "bold", marginBottom: 5 }}>
              Enter Code below
            </p>
            <span style={{ fontSize: 15 }}>
              Check your email for a six digit code
            </span>
            <form className={styles.cardForm} style={{ marginTop: 15 }}>
              <div className={styles.inputGroup}>
                <div className={styles.inputCode}>
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
              </div>
              {otpError && (
                <span style={{ fontSize: 15, color: "red" }}>
                  Pls input OTP
                </span>
              )}

              <button
                type="submit"
                className={styles.payButton}
                onClick={handleSubmit}
                style={{
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {successful && (
        <div className={styles.successful}>
          <div
            className={styles.successfulContent}
            // onClick={() => {
            //   setSuccessful(false);
            //   router.push("/workerdashboard/wallet");
            // }}
          >
            <img
              src="/Check_ring_light.png"
              alt="check"
              className={styles.checkImage}
            />

            <p
              style={{
                color: "black",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Transfer was successful!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
