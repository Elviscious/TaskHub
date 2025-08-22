"use client";
import React, { useState } from "react";
import styles from "@/app/ownerdashboard/wallet/page.module.css";
import WalletHeader from "./components/walletheader";
import WalletLayout from "./components/walletlayout";

export default function Wallet() {
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
	return (
		<div className={styles.Container}>
			<WalletHeader
				text="Funding History"
				link="/ownerdashboard/wallet/fundinghistory"
			/>
			<WalletLayout title="Payout History" payoutData={data} />
		</div>
	);
}
