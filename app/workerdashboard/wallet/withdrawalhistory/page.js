"use client";
import React, { useState } from "react";
import styles from "@/app/workerdashboard/wallet/page.module.css";
import WalletHeader from "../components/walletheader";
import WalletLayout from "../components/walletlayout";

export default function Wallet() {
	const data = [
		{
			id: 1,
			type: "Debit",
			date: "August 9, 2025; 20:33",
			amount: "-$500",
		},
		{
			id: 2,
			type: "Debit",
			date: "August 9, 2025; 20:33",
			amount: "-$500",
		},
		{
			id: 3,
			type: "Debit",
			date: "August 9, 2025; 20:33",
			amount: "-$500",
		},
		{
			id: 4,
			type: "Debit",
			date: "August 9, 2025; 20:33",
			amount: "-$500",
		},
		{
			id: 5,
			type: "Debit",
			date: "August 9, 2025; 20:33",
			amount: "-$500",
		},
		{
			id: 6,
			type: "Debit",
			date: "August 9, 2025; 20:33",
			amount: "-$500",
		},
		{
			id: 7,
			type: "Debit",
			date: "August 9, 2025; 20:33",
			amount: "-$500",
		},
		{
			id: 8,
			type: "Debit",
			date: "August 9, 2025; 20:33",
			amount: "-$500",
		},
	];
	return (
		<div className={styles.Container}>
			<WalletHeader text="Earning History" link="/workerdashboard/wallet" />
			<WalletLayout title="Withdrawal History" payoutData={data} />
		</div>
	);
}
