"use client";
import React, { useState } from "react";
import styles from "@/app/ownerdashboard/wallet/page.module.css";
import WalletHeader from "../components/walletheader";
import WalletLayout from "../components/walletlayout";

export default function Wallet() {
	const data = [
		{
			id: 1,
			type: "Deposit",
			date: "Aug 9, 2025; 20:33",
			amount: +50,
		},
		{
			id: 2,
			type: "Deposit",
			date: "Aug 9, 2025; 20:33",
			amount: +50,
		},
		{
			id: 3,
			type: "Deposit",
			date: "Aug 9, 2025; 20:33",
			amount: +50,
		},
		{
			id: 4,
			type: "Deposit",
			date: "Aug 9, 2025; 20:33",
			amount: +50,
		},
		{
			id: 5,
			type: "Deposit",
			date: "Aug 9, 2025; 20:33",
			amount: +50,
		},
		{
			id: 6,
			type: "Deposit",
			date: "Aug 9, 2025; 20:33",
			amount: +50,
		},
		{
			id: 7,
			type: "Deposit",
			date: "Aug 9, 2025; 20:33",
			amount: +50,
		},
		{
			id: 8,
			type: "Deposit",
			date: "Aug 9, 2025; 20:33",
			amount: +50,
		},
	];
	return (
		<div className={styles.Container}>
			<WalletHeader text="Payout History" link="/ownerdashboard/wallet" />
			<WalletLayout title="Funding History" payoutData={data} />
		</div>
	);
}
