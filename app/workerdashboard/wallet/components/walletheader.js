"use clients";

import React, { useState, useContext, useEffect } from "react";
import styles from "@/app/workerdashboard/wallet/page.module.css";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "@/app/context/context";
import { useRouter } from "next/navigation";

export default function WalletHeader({ text, link }) {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [transactionDetails, setTransactionDetails] = useState("");
  const [viewFunds, setViewFunds] = useState(true);
  const { fetchWorkerBalance, workerWalletBalance, baseUrl } =
    useContext(AppContext);
  const router = useRouter();

  // const safeJson = async (res) => {
  //   const text = await res.text();
  //   return text ? JSON.parse(text) : null;
  // };

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
    fetchWorkerBalance();
  }, []);

  // useEffect(() => {

  // }, []);
  return (
    <div className={styles.walletHeader}>
      <div className={styles.walletBalance}>
        <p>Wallet Balance</p>
        <h2>{viewFunds ? workerWalletBalance : "*******"}</h2>
        <Image
          src={viewFunds ? "/View_hide.png" : "/View.png"}
          alt="View"
          width={20}
          height={20}
          onClick={() => setViewFunds(!viewFunds)}
        />
      </div>
      <div className={styles.walletActions}>
        <div
          onClick={() => {
            if (
              accountName === "" &&
              accountNumber === "" &&
              bankCode === "" &&
              bankName === ""
            ) {
              router.push("/workerdashboard/wallet/withdraw");
            } else {
              router.push("/workerdashboard/wallet/payout");
            }
          }}
        >
          <button className={styles.withdrawButton}>
            <Image
              src="/money-recive.png"
              alt="add"
              width={20}
              height={20}
            ></Image>
            <p>withdraw</p>
          </button>
        </div>
      </div>
    </div>
  );
}
