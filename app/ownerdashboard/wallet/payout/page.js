"use client";

// import styles from "@/app/ownerdashboard/wallet/withdraw/page.module.css";
import styles from "@/app/ownerdashboard/wallet/withdraw/page.module.css";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "@/app/context/context";
import { useRouter } from "next/navigation";

export default function PayOut() {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState("");
  const router = useRouter();
  const { baseUrl, setTransferCode } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getRecipient = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/AccountSetup/GetAccountDetails`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("UpdateRecipient:", data);
        setAccountName(data.data.AccountName);
        setAccountNumber(data.data.AccountNumber);
        setBankCode(data.data.BankCode);
        setBankName(data.data.BankName);
      } catch (error) {
        console.log(error);
      }
    };

    getRecipient();
  }, []);

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
      setTransferCode(data?.data?.transfer_code);

      setTimeout(() => {
        router.push("/ownerdashboard/wallet/otp");
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 40 }}>
      <h1 style={{ marginLeft: 30, marginBottom: 7 }}>Withdrawal</h1>
      <span
        onClick={() => {
          if (
            accountName === "" &&
            accountNumber === "" &&
            bankCode === "" &&
            bankName === ""
          ) {
            router.push("/ownerdashboard/wallet/withdraw");
          } else {
            router.push("/ownerdashboard/wallet");
          }
        }}
        style={{ cursor: "pointer", color: "black", marginLeft: 30 }}
      >
        Go Back
      </span>

      <div>
        {/* <div style={{ display: "flex", justifySelf: "right", marginRight: 10 }}>
          <button
            className={styles.updateWithdrawal}
            onClick={() => {
              router.push("/workerdashboard/wallet/withdraw");
            }}
          >
            Update Withdrawal Account
          </button>
        </div> */}
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
    </div>
  );
}
