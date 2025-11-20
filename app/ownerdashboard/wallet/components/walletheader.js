"use client";

import React, { useState, useContext, useEffect } from "react";
import styles from "@/app/ownerdashboard/wallet/page.module.css";
import { AppContext } from "@/app/context/context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WalletHeader() {
  const [accountName, setAccountName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [transactionDetails, setTransactionDetails] = useState("");
  const [viewFunds, setViewFunds] = useState(true);
  const router = useRouter();
  const { setFundWallet, walletBalance, fetchWalletBalance, baseUrl } =
    useContext(AppContext);

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
        s;
      } catch (error) {
        console.log(error);
      }
    };

    getRecipient();
    fetchWalletBalance();
  }, []);

  return (
    <div className={styles.walletHeader}>
      <div className={styles.walletBalance}>
        <p>Wallet Balance</p>
        <h2>{viewFunds ? walletBalance : "*******"}</h2>
        <Image
          src={viewFunds ? "/View_hide.png" : "/View.png"}
          alt="View"
          width={20}
          height={20}
          onClick={() => setViewFunds(!viewFunds)}
        />
      </div>
      <div className={styles.walletActions}>
        <button
          className={styles.fundButton}
          onClick={() => setFundWallet(true)}
        >
          <Image src="/Add_ring.png" alt="add" width={20} height={20}></Image>
          <p>Fund Wallet</p>
        </button>

        <button
          className={styles.withdrawButton}
          onClick={() => {
            if (
              accountName === "" &&
              accountNumber === "" &&
              bankCode === "" &&
              bankName === ""
            ) {
              router.push("/ownerdashboard/wallet/withdraw");
            } else {
              router.push("/ownerdashboard/wallet/payout");
            }
          }}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}
