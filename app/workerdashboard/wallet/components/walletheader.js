"use clients";

import React, { useState } from "react";
import styles from "@/app/workerdashboard/wallet/page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function WalletHeader({ text, link }) {
	const [viewFunds, setViewFunds] = useState(true);
	return (
		<div className={styles.walletHeader}>
			<div className={styles.walletBalance}>
				<p>Wallet Balance</p>
				<h2>{viewFunds ? "$12,000" : "*******"}</h2>
				<Image
					src={viewFunds ? "/View_hide.png" : "/View.png"}
					alt="View"
					width={20}
					height={20}
					onClick={() => setViewFunds(!viewFunds)}
				/>
			</div>
			<div className={styles.walletActions}>
				<Link className={styles.addFundsButton} href={link}>
					{text}
				</Link>
				<Link href="/workerdashboard/wallet/withdraw">
					<button className={styles.withdrawButton}>
						<Image src="/money-recive.png" alt="add" width={20} height={20}></Image>
						<p>withdraw</p>
					</button>
				</Link>
			</div>
		</div>
	);
}
