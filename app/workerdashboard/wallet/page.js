"use client";
import React, { useState } from "react";
import styles from "@/app/workerdashboard/wallet/page.module.css";
import WalletHeader from "./components/walletheader";
import WalletLayout from "./components/walletlayout";

export default function Wallet() {
	const data = [
		{
			id: 1,
			type: "Credit",
			task: "Like my video",
			date: "August 9, 2025; 20:33",
			amount: "+$500",
		},
		{
			id: 2,
			type: "Credit",
			task: "Follow on Twitter",
			date: "December 9, 2025; 20:33",
			amount: "+$500",
		},
		{
			id: 3,
			type: "Credit",
			task: "Follow on Instagram",
			date: "July 9, 2025; 20:33",
			amount: "+$500",
		},
		{
			id: 4,
			type: "Credit",
			task: "Subscribe to my youtube channel",
			date: "February 9, 2025; 20:33",
			amount: "+$500",
		},
		{
			id: 5,
			type: "Credit",
			task: "Comment on Instagram",
			date: "December 9, 2025; 20:33",
			amount: "+$500",
		},
		{
			id: 6,
			type: "Credit",
			task: "Sign up to an App",
			date: "June 9, 2025; 20:33",
			amount: "+$500",
		},
		{
			id: 7,
			type: "Credit",
			task: "Follow on Twitter",
			date: "June 9, 2025; 20:33",
			amount: "+$500",
		},
		{
			id: 8,
			type: "Credit",
			task: "Subscribe to my youtube channel",
			date: "September 9, 2025; 20:33",
			amount: "+$500",
		},
		{
			id: 9,
			type: "Credit",
			task: "Subscribe to my youtube channel",
			date: "May 9, 2025; 20:33",
			amount: "+$500",
		},
	];
	return (
		<div className={styles.Container}>
			<WalletHeader
				text="Withdrawal History"
				link="/workerdashboard/wallet/withdrawalhistory"
			/>
			<WalletLayout title="Earning History" payoutData={data} />
		</div>
	);
}
