import styles from "../page.module.css";

export default function Transfer() {
	return (
		<div className={styles.transfer}>
			<h2>Bank Transfer</h2>
			<p>Make your tansfer using the account details below</p>

			<div className={styles.accountDetails}>
				<div>
					<h2>Account Name: </h2>
					<span>TaskHub Wallet</span>
				</div>
				<div>
					<h2>Account No: </h2>
					<span>1234567890</span>
				</div>
			</div>
		</div>
	);
}
