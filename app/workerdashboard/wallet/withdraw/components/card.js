"use client";

import styles from "../page.module.css";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "@/app/context/context";

export default function Card() {
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [banks, setBanks] = useState([]);
  const [bankName, setBankName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [loading, setLoading] = useState(false);
  const { secretKey, baseUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.paystack.co/bank", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${secretKey}`,
          },
        });

        const data = await res.json();
        setBanks(data.data || []);
      } catch (error) {
        console.log(error);
        setBanks([]);
      }
    };

    fetchData();
  }, []);

  const verifyAccount = async () => {
    if (accountNumber.length === 10 && selectedBank) {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${selectedBank}`,
          {
            headers: {
              Authorization: `Bearer ${secretKey}`,
            },
          }
        );
        const data = await res.json();
        if (data.status) {
          setAccountName(data.data.account_name);
        } else {
          setAccountName("Invalid account");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    verifyAccount();
  }, [accountNumber, selectedBank]);

  const createRecipient = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const recipientdata = {
      AccountName: accountName,
      AccountNumber: accountNumber,
      BankCode: selectedBank,
      BankName: bankName,
    };

    try {
      const res = await fetch(
        `${baseUrl}/api/AccountSetup/CreateAccountDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(recipientdata),
        }
      );

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
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
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  //   placeholder="1234 5678 9012 3456"
                  required
                  maxLength={16}
                />
              </div>
              <div className={styles.inputField}>
                <label htmlFor="accountNumber">Bank Name</label>
                <select
                  onChange={(e) => {
                    setSelectedBank(e.target.value);
                    const selectedBankDetails = banks.find(
                      (bank) => bank.code === selectedBank
                    );
                    setBankName(selectedBankDetails.name);
                  }}
                  className={styles.dropDown}
                >
                  <option value="">Select Bank</option>
                  {banks.map((bank, index) => (
                    <option key={`${bank.code} - ${index}`} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>
              {loading ? (
                <p>Verifying ...</p>
              ) : (
                accountName && (
                  <div className={styles.inputField}>
                    <label htmlFor="bank">Account Name</label>
                    <input
                      type="text"
                      name="bank"
                      id="bank"
                      value={accountName}
                      readOnly
                      //   placeholder="GT Bank"
                    />
                  </div>
                )
              )}
            </div>

            <button
              type="submit"
              className={styles.payButton}
              onClick={createRecipient}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
