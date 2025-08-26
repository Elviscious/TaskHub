import styles from "../page.module.css";

export default function Card() {
    return (
			<div className={styles.card}>
				<h2>Card Details</h2>
				<form className={styles.cardForm}>
					<div className={styles.inputGroup}>
						<div className={styles.inputField}>
							<label htmlFor="cardName">Cardholder&apos;s name</label>
							<input
								type="text"
								name="cardName"
								id="cardName"
								autoComplete="cc-name"
                                placeholder="John Doe"
                                required
							/>
						</div>
						<div className={styles.inputField}>
							<label htmlFor="cardNumber">Card Number</label>
							<input
								type="text"
								name="cardNumber"
								id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                required
                                maxLength={16}
								autoComplete="cc-number"
							/>
						</div>
						<div className={styles.Ec}>
							<div className={styles.inputField}>
								<label htmlFor="cardExp">Expiry Date</label>
								<input
									type="text"
									name="cardExp"
									id="cardExp"
									placeholder="8/25"
                                    required
									autoComplete="cc-exp"
								/>
							</div>
							<div className={styles.inputField}>
								<label htmlFor="cvv">CVV</label>
								<input
									type="text"
									name="cvv"
									id="cvv"
									placeholder="123"
                                    required
									autoComplete="cc-csc"
									maxLength={4}
								/>
							</div>
						</div>
						<div className={styles.inputField}>
							<label htmlFor="amount">Amount</label>
							<input
								type="text"
								name="amount"
								id="amount"
								placeholder="0.00"
                                required
								inputMode="decimal"
								pattern="\d+(\.\d{2})?"
							/>
						</div>
					</div>
                    <div className={styles.saveDetails}>
                        <input type="checkbox" id="detailsCheck" name="detailsCheck"/>
                        <label htmlFor="detailsCheck">Save my card details</label>
                    </div>
                    <button type="submit" className={styles.payButton}>
                        Pay
                    </button>
				</form>
			</div>
		);
}