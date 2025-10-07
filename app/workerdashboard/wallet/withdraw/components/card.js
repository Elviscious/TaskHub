import styles from "../page.module.css";

export default function Card() {
    return (
			<div className={styles.card}>
				<h2>Withdrawal Details</h2>
				<form className={styles.cardForm}>
					<div className={styles.inputGroup}>
						<div className={styles.inputField}>
							<label htmlFor="accountNumber">Card Number</label>
							<input
								type="number"
								name="accountNumber"
								id="accountNumber"
								placeholder="1234 5678 9012 3456"
								required
								maxLength={16}
							/>
						</div>
						<div className={styles.inputField}>
							<label htmlFor="bank">Select Bank</label>
							<input
								type="text"
								name="bank"
								id="bank"
								placeholder="GT Bank"
								required
							/>
						</div>
						<div className={styles.inputField}>
							<label htmlFor="amount">Amount</label>
							<input
								type="number"
								name="amount"
								id="amount"
								placeholder="10,000"
								required
							/>
						</div>
					</div>
					<div className={styles.saveDetails}>
						<input type="checkbox" id="detailsCheck" name="detailsCheck" />
						<label htmlFor="detailsCheck">Save my withdrawal details</label>
					</div>
					<button type="submit" className={styles.payButton}>
						Withdraw
					</button>
				</form>
			</div>
		);
}