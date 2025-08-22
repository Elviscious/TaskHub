"use client";
import React, { useState } from "react";
import styles from "@/app/ownerdashboard/wallet/page.module.css";
import WalletHeader from "./components/walletheader";
import WalletLayout from "./components/walletlayout";

export default function Wallet() {

    const data = [
			{ id: 1, type: "Auto Payout", date: "Aug 9, 2025; 20:33", amount: -50 },
			{ id: 2, type: "Auto Payout", date: "Aug 9, 2025; 20:33", amount: -50 },
		];
	return (
		<div className={styles.container}>
			<WalletHeader
				text="Funding History"
				link="/ownerdashboard/wallet/fundinghistory"
			/>
            <WalletLayout
                title="Payout History"
                payoutData= {data}
            />

		</div>
	);
}
