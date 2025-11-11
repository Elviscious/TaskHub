"use client";

import React, { useState, useContext, useEffect } from "react";
import styles from "@/app/ownerdashboard/wallet/page.module.css";
import { AppContext } from "@/app/context/context";
import Image from "next/image";
import Link from "next/link";

export default function WalletHeader() {
  const [viewFunds, setViewFunds] = useState(true);
  const { setFundWallet, walletBalance, fetchWalletBalance } =
    useContext(AppContext);

  useEffect(() => {
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
          className={styles.withdrawButton}
          onClick={() => setFundWallet(true)}
        >
          <Image src="/Add_ring.png" alt="add" width={20} height={20}></Image>
          <p>Fund Wallet</p>
        </button>
      </div>
    </div>
  );
}
