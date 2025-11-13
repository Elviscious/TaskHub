"use client";

import styles from "@/app/workerdashboard/wallet/withdraw/page.module.css";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "@/app/context/context";
import { useRouter } from "next/navigation";

export default function PayOut() {
  const [amount, setAmount] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { baseUrl } = useContext(AppContext);

  const withdrawMoney = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const withdrawDetails = {
      amount: amount,
    };

    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/api/Payment/InitiateTransfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(withdrawDetails),
      });

      const data = await res.json();
      console.log(data);

      setSuccessful(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 40 }}>
      <h1 style={{ marginLeft: 30 }}>Withdrawal</h1>

      <div>
        <div style={{ display: "flex", justifySelf: "right", marginRight: 10 }}>
          <button className={styles.updateWithdrawal}>
            Update Withdrawal Account
          </button>
        </div>
        <div className={styles.container}>
          <div className={styles.card}>
            <h2>Input Amount</h2>
            <form className={styles.cardForm}>
              <div className={styles.inputGroup}>
                <div className={styles.inputField}>
                  <label htmlFor="accountNumber" style={{ color: "#3b8cf6" }}>
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    //   placeholder="1234 5678 9012 3456"
                    required
                    maxLength={16}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={styles.payButton}
                onClick={withdrawMoney}
                style={{
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Processing..." : "Withdraw"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {successful && (
        <div className={styles.successful}>
          <div
            className={styles.successfulContent}
            onClick={() => {
              setSuccessful(false);
              router.push("/workerdashboard/wallet");
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
