"use client";

import styles from "../page.module.css";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "@/app/context/context";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Card() {
  const [accountName, setAccountName] = useState("");
  const [nonCommercialBank, setNonCommercialBank] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [banks, setBanks] = useState([]);
  const [bankName, setBankName] = useState("");
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setsaving] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [failed, setfailed] = useState(false);
  const { baseUrl, publicKey } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/flutterwave/banks");
        const data = await res.json();
        setBanks(data.data || []);
      } catch (error) {
        console.log(error);
        setBanks([]);
      }
    };

    fetchData();
  }, []);

  const COMMERCIAL_BANK_CODES = [
    "044", // Access Bank
    "023", // CitiBank
    "050", // Ecobank
    "070", // Fidelity Bank
    "011", // First Bank
    "214", // FCMB
    "00103", // Globus Bank
    "058", // GTB
    "030", // Heritage Bank
    "082", // Keystone
    "076", // Polaris
    "101", // Providus
    "221", // Stanbic IBTC
    "068", // Standard Chartered
    "232", // Sterling Bank
    "100", // SunTrust
    "102", // Titan Trust Bank
    "032", // Union Bank
    "033", // UBA
    "215", // Unity Bank
    "035", // Wema Bank
    "057", // Zenith Bank
  ];

  // const verifyAccount = async () => {
  //   if (accountNumber.length === 10 && selectedBankCode) {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(
  //         `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${selectedBankCode}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${secretKey}`,
  //           },
  //         }
  //       );
  //       const data = await res.json();
  //       if (data.status) {
  //         setAccountName(data.data.account_name);
  //       } else {
  //         setAccountName("Invalid account");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  const verifyAccount = async () => {
    if (accountNumber.length === 10 && selectedBankCode) {
      // const token = localStorage.getItem("token");
      setLoading(true);
      console.log(selectedBankCode);

      try {
        // const response = await axios.post(
        //   "https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account",
        //   {
        //     recipientaccount: accountNumber,
        //     destbankcode: selectedBankCode,
        //     PBFPubKey: flutterwaveKey,
        //   }
        // );

        const response = await fetch(
          "https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipientaccount: accountNumber,
              destbankcode: selectedBankCode,
              PBFPubKey: publicKey,
            }),
          }
        );

        const data = await response.json();
        setAccountName(data?.data?.data?.accountname ?? "");
        console.log(data);
      } catch (error) {
        console.log("Error resolving account:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    verifyAccount();
  }, [accountNumber, selectedBankCode]);

  const createRecipient = async (e) => {
    e.preventDefault();

    if (!COMMERCIAL_BANK_CODES.includes(selectedBankCode)) {
      setNonCommercialBank(true);
      return;
    }

    const token = localStorage.getItem("token");

    setsaving(true);

    const selectedBankDetails = banks.find(
      (bank) => bank.code === selectedBankCode
    );

    const recipientdata = {
      AccountName: accountName,
      AccountNumber: accountNumber,
      BankCode: selectedBankCode,
      BankName: selectedBankDetails?.name || "",
    };

    console.log(recipientdata);

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

      if (
        data.message === "Account setup already exists. Please update instead."
      ) {
        alert("Please update recipient");
      }

      setTimeout(() => {
        setSuccessful(true);
      }, 1000);

      setTimeout(() => {
        setSuccessful(false);
        setAccountNumber("");
        setSelectedBankCode("");
        setAccountName("");
        router.push("/ownerdashboard/wallet/payout");
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setsaving(false);
    }
  };
  return (
    <div style={{ paddingTop: 40 }}>
      <h1
        style={{ marginLeft: 30, marginBottom: 7 }}
        // onClick={() => {
        //   router.push("/workerdashboard/wallet/otp");
        // }}
      >
        Withdrawal Details
      </h1>
      <span
        onClick={() => {
          router.push("/ownerdashboard/wallet");
        }}
        style={{ cursor: "pointer", color: "black", marginLeft: 30 }}
      >
        Go Back
      </span>

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
                    setSelectedBankCode(e.target.value);
                  }}
                  value={selectedBankCode}
                  className={styles.dropDown}
                >
                  <option value="">Select Bank</option>
                  {[...banks]
                    .filter((bank) => COMMERCIAL_BANK_CODES.includes(bank.code))
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((bank, index) => (
                      <option key={`${bank.code}-${index}`} value={bank.code}>
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
              style={{
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>

      {successful && (
        <div className={styles.successful}>
          <div
            className={styles.successfulContent}
            // onClick={() => {
            //   setSuccessful(false);
            //   router.push("/workerdashboard/wallet/payout");
            // }}
          >
            <img
              src="/Check_ring_light.png"
              alt="check"
              className={styles.checkImage}
            />

            <p
              style={{
                color: "black",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Recipient was successfully created!
            </p>
          </div>
        </div>
      )}
      {failed && (
        <div className={styles.successful}>
          <div
            className={styles.successfulContent}
            // onClick={() => {
            //   setfailed(false);
            // }}
          >
            <img
              src="/Dell_light.png"
              alt="check"
              className={styles.checkImage}
            />

            <p
              style={{
                color: "black",
                fontSize: 24,
                textAlign: "center",
              }}
            >
              Failed to Create Recipient!
            </p>
          </div>
        </div>
      )}
      {nonCommercialBank && (
        <div className={styles.successful}>
          <div className={styles.successfulContent}>
            <Image
              src="/Close_round.png"
              alt="cancel"
              width={30}
              height={30}
              color="#3b8cf6"
              style={{
                display: "flex",
                justifySelf: "right",
                marginBottom: 10,
                cursor: "pointer",
                marginBottom: 20,
              }}
              onClick={() => {
                setNonCommercialBank(false);
              }}
            />
            <img src="/Cancel.png" alt="check" className={styles.checkImage} />

            <p
              style={{
                color: "black",
                fontSize: 24,
                textAlign: "center",
                fontWeight: "bold",
                marginTop: 30,
              }}
            >
              Non-commercial Banks are not Applicable!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
