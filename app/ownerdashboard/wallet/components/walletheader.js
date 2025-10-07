"use clients";

import React, { useState } from "react";
import styles from "@/app/ownerdashboard/wallet/page.module.css";
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
				<Link href="/ownerdashboard/wallet/fundwallet">
					<button className={styles.withdrawButton}>
						<Image src="/Add_ring.png" alt="add" width={20} height={20}></Image>
						<p>Fund Wallet</p>
					</button>
				</Link>
			</div>
		</div>
	);
}
