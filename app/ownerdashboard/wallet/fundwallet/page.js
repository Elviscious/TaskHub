"use client";
import styles from "./page.module.css";
import React from "react";
import Card from "./components/card";
import Transfer from "./components/transfer";
import {  useState } from "react";

export default function FundWallet() {
	const [activeMethod, setActiveMethod] = useState("card");
	const paymentMethods = [
		{ id: "card", name: "Pay with Credit Card", component: Card },
		{ id: "transfer", name: "Pay with Bank Transfer", component: Transfer },
		{ id: "card-2", name: "Pay with Credit card", component: Card },
	];
	return (
		<div className={styles.fundWallet}>
			<div className={styles.paymentMethods}>
				{paymentMethods.map((method, index) => {
					return (
						<React.Fragment key={method.id || index}>
							<div
								key={method.id}
								onClick={() => setActiveMethod(method.id)}
								className={`${
									activeMethod === method.id ? styles.active : ""
								} ${styles.method}`}
							>
								{method.name}
							</div>
							{paymentMethods.indexOf(method, index) <
								paymentMethods.length - 1 && <span key={index}></span>}
						</React.Fragment>
					);
				})}
			</div>
			{paymentMethods
				.filter((method) => method.id === activeMethod)
				.map((method) => {
					const Component = method.component;
					return <Component key={method.id} />;
				})}
		</div>
	);
}
