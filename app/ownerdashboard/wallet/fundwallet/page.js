import styles from "./page.module.css";
import Card from "./components/card";

export default function FundWallet() {
	return (
		<div className={styles.fundWallet}>
			<div className={styles.paymentMethods}>
				<div>Pay with Bank Transfer</div>
                <span></span>
				<div>Pay with Credit Card</div>
			</div>
            <Card />
		</div>
	);
}
