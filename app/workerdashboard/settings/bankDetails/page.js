"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "@/app/workerdashboard/settings/bankDetails/page.module.css";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/context/context";

export default function ProfileInfo() {
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const { baseUrl } = useContext(AppContext);
  const router = useRouter();

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
        setBankName(data.data.BankName);
      } catch (error) {
        console.log(error);
      }
    };

    getRecipient();
  }, []);

  return (
    <div className={styles.container}>
      <h1 style={{ margin: 0 }}>Bank Account Setup</h1>
      <span
        onClick={() => {
          router.push("/workerdashboard/settings");
        }}
        style={{ cursor: "pointer", color: "black" }}
      >
        Go Back
      </span>

      <div className={styles.profileContainer}>
        <div className={styles.header}>
          <h2>Bank Details</h2>

          <button
            className={styles.button}
            onClick={() => {
              router.push("/workerdashboard/settings/updateBank");
            }}
          >
            Update
          </button>
        </div>

        <div className={styles.detailContainer}>
          <div>
            <div className={styles.detailInfo}>
              <h3>Account Number</h3>
              <p>{accountNumber === "" ? "Nill" : accountNumber}</p>
            </div>
            <div className={styles.detailInfo}>
              <h3>Bank Name </h3>
              <p>{bankName === "" ? "Nill" : bankName}</p>
            </div>
            <div className={styles.detailInfo}>
              <h3>Account Name</h3>
              <p>{accountName === "" ? "Nill" : accountName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
