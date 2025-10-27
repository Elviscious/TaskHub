import styles from "../page.module.css";

export default function Card() {
  return (
    <div style={{ paddingTop: 40 }}>
      <h1 style={{ marginLeft: 30 }}>Withdrawal Details</h1>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Create Recepient</h2>
          <form className={styles.cardForm}>
            <div className={styles.inputGroup}>
              <div className={styles.inputField}>
                <label htmlFor="accountNumber">Account Number</label>
                <input
                  type="number"
                  name="accountNumber"
                  id="accountNumber"
                  //   placeholder="1234 5678 9012 3456"
                  required
                  maxLength={16}
                />
              </div>
              <div className={styles.inputField}>
                <label htmlFor="bank">Bank Code</label>
                <input
                  type="text"
                  name="bank"
                  id="bank"
                  //   placeholder="GT Bank"
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.payButton}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
