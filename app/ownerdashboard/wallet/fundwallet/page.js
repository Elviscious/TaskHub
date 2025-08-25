import styles from "./page.module.css";

export default function FundWallet() {
	return (
		<div className={styles.fundWallet}>
			<div className={styles.paymentMethods}>
				<div>Pay with Bank Transfer</div>
				<div>Pay with Credit Card</div>
			</div>
		</div>
	);
}
