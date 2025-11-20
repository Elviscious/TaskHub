"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "@/app/ownerdashboard/settings/updateBank/page.module.css";
import { AppContext } from "@/app/context/context";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const [banks, setBanks] = useState([]);
  const [usernameError, setUsernameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [previewError, setPreviewError] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [daysLeft, setDaysLeft] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { baseUrl, publicKey } = useContext(AppContext);
  const router = useRouter();
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [verify, setVerify] = useState(false);

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getRecipient = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/AccountSetup/GetAccountDetails`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("UpdateRecipient:", data);

        setAccountNumber(data.data.AccountNumber);
        setBankName(data.data.BankName);
        setSelectedBankCode(data.data.BankCode);
      } catch (error) {
        console.log(error);
      }
    };

    getRecipient();
  }, []);

  const verifyAccount = async () => {
    if (accountNumber.length === 10 && selectedBankCode) {
      // const token = localStorage.getItem("token");
      setVerify(true);
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
        setVerify(false);
      }
    }
  };

  useEffect(() => {
    if (accountNumber.length === 10 && selectedBankCode) {
      verifyAccount();
    }
  }, [accountNumber, selectedBankCode]);

  const formCheck = () => {
    if (accountName === "") {
      setUsernameError("This field is required");
    } else {
      setUsernameError("");
    }

    if (accountNumber === "") {
      setPreviewError("Profile photo is required");
    } else {
      setPreviewError("");
    }

    if (bankName === "") {
      setLocationError("This field is required");
    } else {
      setLocationError("");
    }
    // if (number === null) {
    //   setNumberError("This field is required");
    // } else {
    //   setNumberError("");
    // }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (formCheck) {
      setLoading(true);

      const selectedBankDetails = banks.find(
        (bank) => bank.code === selectedBankCode
      );

      const updateRecipientDetails = {
        AccountName: accountName,
        AccountNumber: accountNumber,
        BankName: selectedBankDetails?.name || "",
        BankCode: selectedBankCode,
      };

      try {
        const res = await fetch(
          `${baseUrl}/api/AccountSetup/UpdateAccountDetails`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateRecipientDetails),
          }
        );

        const data = await res.json();
        console.log(data);
        setSuccessful(true);

        setTimeout(() => {
          setLoading(false);
          setSuccessful(false);
          router.push("/ownerdashboard/settings/bankDetails");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 style={{ margin: 0 }}>Bank Account Setup</h1>
        <span
          onClick={() => {
            router.push("/ownerdashboard/settings/bankDetails");
          }}
          style={{ cursor: "pointer", color: "black" }}
        >
          Go Back
        </span>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Bank Details</h2>

            <div className={styles.formGroup}>
              <label>Account Number</label>
              <input
                type="text"
                value={accountNumber === "" ? "" : accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                }}
                style={
                  usernameError === ""
                    ? { borderColor: "#3b82f6" }
                    : { borderColor: "red" }
                }
              />
              <p style={{ color: "red" }}>{usernameError}</p>
            </div>
            <div className={styles.formGroup}>
              <label>Bank Name</label>
              <select
                className={styles.dropDown}
                value={selectedBankCode}
                onChange={(e) => {
                  setSelectedBankCode(e.target.value);
                }}
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
              <p style={{ color: "red" }}>{locationError}</p>
            </div>
            {verify ? (
              <p>Verifying ...</p>
            ) : (
              accountName && (
                <div className={styles.formGroup}>
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

            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              style={{
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Saving..." : "Save"}
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
            //   router.push("/workerdashboard/wallet");
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
              Bank Account updated successfully!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
