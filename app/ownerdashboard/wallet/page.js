"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "@/app/ownerdashboard/wallet/page.module.css";
import { AppContext } from "@/app/context/context";
import WalletHeader from "./components/walletheader";
import WalletLayout from "./components/walletlayout";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function Wallet() {
  const {
    fundWallet,
    setFundWallet,
    baseUrl,
    fetchWalletBalance,
    payStackKey,
  } = useContext(AppContext);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [amountError, setAmountError] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  //   const [reference, setReference] = useState("");
  const data = [
    {
      id: 1,
      type: "Auto Payout",
      task: "Like my video",
      date: "August 9, 2025; 20:33",
      amount: "-$50",
    },
    {
      id: 2,
      type: "Auto Payout",
      task: "Follow on Twitter",
      date: "December 9, 2025; 20:33",
      amount: "-$50",
    },
    {
      id: 3,
      type: "Auto Payout",
      task: "Follow on Instagram",
      date: "July 9, 2025; 20:33",
      amount: "-$50",
    },
    {
      id: 4,
      type: "Auto Payout",
      task: "Subscribe to my youtube channel",
      date: "February 9, 2025; 20:33",
      amount: "-$50",
    },
    {
      id: 5,
      type: "Auto Payout",
      task: "Comment on Instagram",
      date: "December 9, 2025; 20:33",
      amount: "-$50",
    },
    {
      id: 6,
      type: "Auto Payout",
      task: "Sign up to an App",
      date: "June 9, 2025; 20:33",
      amount: "-$50",
    },
    {
      id: 7,
      type: "Auto Payout",
      task: "Follow on Twitter",
      date: "June 9, 2025; 20:33",
      amount: "-$50",
    },
    {
      id: 8,
      type: "Auto Payout",
      task: "Subscribe to my youtube channel",
      date: "September 9, 2025; 20:33",
      amount: "-$50",
    },
    {
      id: 9,
      type: "Auto Payout",
      task: "Subscribe to my youtube channel",
      date: "May 9, 2025; 20:33",
      amount: "-$50",
    },
  ];

  useEffect(() => {
    if (window.PaystackPop) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;

    script.onload = () => {
      console.log("✅ Paystack script loaded");
      setScriptLoaded(true);
    };

    script.onerror = () => {
      console.error("❌ Failed to load Paystack script");
      alert("Failed to load Paystack payment system. Please refresh the page.");
    };

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/ProfileSetup/GetOwnerProfile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log(data);
        setUserEmail(data.Email);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (reference) {
      const verifyPayment = async (reference) => {
        const token = localStorage.getItem("token");

        try {
          const res = await fetch(
            `${baseUrl}/api/payment/VerifyPayment/${reference}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await res.json();
          console.log("Verification data:", data);

          if (data.data?.status === "success") {
            setPaymentSuccessful(true);
            // await fetchWalletBalance();
          } else {
            setPaymentFailed(true);
          }
        } catch (error) {
          console.log(error);
        }
      };

      verifyPayment(reference);
    }
  }, [reference]);

  // const verifyPayment = async (ref) => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     console.error("No authentication token found.");
  //     setPaymentFailed(true);
  //     return;
  //   }

  //   try {
  //     const res = await fetch(`${baseUrl}/api/Paystack/VerifyPayment/${ref}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!res.ok) {
  //       console.error(`HTTP error: ${res.status}`);
  //       setPaymentFailed(true);
  //       return;
  //     }

  //     const data = await res.json();
  //     console.log("This is verifyPayment data:", data);

  //     if (data.status === true || data.data?.status === "success") {
  //       // setPaymentSuccessful(true);
  //       await fetchWalletBalance();

  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setPaymentFailed(true);
  //   }
  // };

  // verifyPayment.js
  const verifyPayment = async (ref, retries = 3, delay = 3000) => {
    // retries = how many times to recheck if payment is complete
    // delay = how long to wait (in ms) between checks

    const token = localStorage.getItem("token");

    for (let attempt = 1; attempt <= retries; attempt++) {
      console.log(`Verifying payment... Attempt ${attempt}`);

      try {
        const res = await fetch(`${baseUrl}/api/payment/VerifyPayment/${ref}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        // If verification API itself failed
        if (!data.status) {
          console.warn("Verification API returned an error");
          continue;
        }

        const txStatus = data.data?.status;
        console.log("This is txStatus:", txStatus);

        if (txStatus === "success") {
          console.log("✅ Payment verified successfully!");
          await fetchWalletBalance();
          // Handle success (e.g., update wallet or database)
          return data;
        }

        if (txStatus === "failed") {
          console.log("❌ Payment failed");
          return data;
        }

        // If abandoned or pending, wait and retry
        if (txStatus === "abandoned" || txStatus === "pending") {
          console.log("⏳ Payment not completed yet, retrying...");
          await new Promise((resolve) => setTimeout(resolve, delay));

          // setPaymentFailed(true);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    }

    console.warn("⚠️ Payment verification retries exhausted.");
    setPaymentFailed(true);
    return null;
  };

  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    if (!amount) {
      setAmountError("Please enter amount");
      return;
    }

    if (!payStackKey) {
      alert("Missing Paystack Public Key");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Initialize payment from backend
      const res = await fetch(
        `${baseUrl}/api/Payment/InitializePayment?amount=${amount}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      console.log("Backend init response:", data);

      if (!data?.data?.authorization_url || !data?.data?.reference) {
        alert("Failed to initialize payment");
        return;
      }

      window.open(data?.data?.authorization_url);
    } catch (error) {
      console.error("💥 Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Container}>
      <div>
        <h1>Wallet</h1>
        <WalletHeader
          text="Funding History"
          link="/ownerdashboard/wallet/fundinghistory"
        />
        <WalletLayout title="Payout History" payoutData={data} />
      </div>

      {fundWallet && (
        <div className={styles.successful}>
          <div className={styles.successfulContent}>
            <Image
              src="/Close_round.png"
              alt="cancel"
              width={30}
              height={30}
              style={{
                display: "flex",
                justifySelf: "right",
                marginBottom: 10,
                cursor: "pointer",
              }}
              onClick={() => {
                setAmount("");
                setFundWallet(false);
                setAmountError("");
              }}
            />
            <h1 style={{ marginBottom: 40, fontWeight: 600 }}>
              Pay with Paystack
            </h1>
            <div className={styles.formGroup}>
              <label style={{ color: "#3b82f6" }}>Amount</label>
              <input
                type="text"
                className={styles.inputPopUp}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p style={{ color: "red", fontSize: 12 }}>{amountError}</p>
            </div>
            <button
              className={styles.btn}
              onClick={!loading ? handlePayment : undefined}
              disabled={loading}
              style={{
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Processing..." : "Pay"}
            </button>
          </div>
        </div>
      )}

      {paymentSuccessful && (
        <div className={styles.successful}>
          <div
            className={styles.successfulContent}
            onClick={() => {
              setPaymentSuccessful(false);
              setAmount("");
              setFundWallet(false);
            }}
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
                textAlign: "center",
              }}
            >
              Payment was successful!
            </p>
          </div>
        </div>
      )}
      {paymentFailed && (
        <div className={styles.successful}>
          <div
            className={styles.successfulContent}
            onClick={() => {
              setPaymentFailed(false);
              setAmount("");
              setFundWallet(false);
            }}
          >
            <img
              src="/Dell_light.png"
              alt="check"
              className={styles.checkImage}
            />

            <p
              style={{
                color: "black",
                fontSize: 24,
                textAlign: "center",
              }}
            >
              Payment Failed!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
