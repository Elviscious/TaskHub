"use client";

import React, { useState } from "react";
import styles from "@/app/ownerdashboard/wallet/page.module.css";
import Image from "next/image";

export default function WalletLayout({ title, payoutData }) {
	return (
		<div className={styles.WalletLayout}>
			<div className={styles.titleBar}>
				<h2>{title}</h2>
				<div className={styles.filter}>
					<Image
						src="/Filter_alt.png"
						alt="filter"
						width={20}
						height={20}
					></Image>
					<Image
						src="/down.png"
						alt="down"
						width={10}
						height={5}
						style={{ cursor: "pointer" }}
					></Image>
				</div>
			</div>
			<div className={styles.payoutLists}>
				{payoutData.map((data, index) => {
					return (
						<div key={index} className={styles.payout}>
							<div className="listFirst">
								<div className={styles.money}>
									<Image
										src="/Money.png"
										alt="money"
										height={30}
										width={30}
									></Image>
									<p>{data.type}</p>
								</div>
							<p>{data.date}</p>
							</div>
							<p>{data.amount}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
