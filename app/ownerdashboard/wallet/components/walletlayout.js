"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "@/app/ownerdashboard/wallet/page.module.css";
import Image from "next/image";

export default function WalletLayout({ title, payoutData }) {
  const [dropDown, setDropDown] = useState(false);
  const [taskIndex, settaskIndex] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const dropdownRef = useRef(null);

  const transactionTypes = ["Funding", "TaskPostingFee"];

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  const handleSelect = (type) => {
    setSelectedType(type);
    setDropDown(false);
  };

  const filterData =
    selectedType === "All"
      ? payoutData
      : payoutData.filter((item) => {
          return item.Type === selectedType;
        });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get month abbreviation (e.g. "Aug")
    const options = { month: "short" };
    const month = date.toLocaleString("en-US", options);

    // Extract day, year, hour, and minute
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${month} ${day}, ${year}; ${hours}:${minutes}`;
  }

  return (
    <div className={styles.WalletLayout}>
      <div className={styles.titleBar}>
        <h2>{title}</h2>
        <div className={styles.filter} ref={dropdownRef}>
          <Image src="/Filter_alt.png" alt="filter" width={20} height={20} />
          <div className={styles.customDropdown}>
            <div className={styles.selected} onClick={handleDropDown}>
              <span>{selectedType}</span>
              <Image
                src="/down.png"
                alt="down"
                width={10}
                height={5}
                style={{
                  cursor: "pointer",
                  transform: dropDown ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>

            {dropDown && (
              <ul className={styles.dropdownList}>
                <li onClick={() => handleSelect("All")}>All</li>
                {transactionTypes.map((type, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(type)}
                    style={{
                      background:
                        selectedType === type ? "#3b82f6" : "transparent",
                      color: selectedType === type ? "#fff" : "#000",
                      cursor: "pointer",
                    }}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className={styles.payoutLists}>
        {filterData === 0 ? (
          <p>No transaction history...</p>
        ) : (
          filterData.map((data, index) => (
            <div key={index} className={styles.payout}>
              <div className="listFirst">
                <div className={styles.money}>
                  <Image src="/Money.png" alt="money" height={30} width={30} />
                  <p>{data.Type}</p>
                  {data.Type === "TaskPostingFee" && (
                    <Image
                      src="/down.png"
                      id={index}
                      onClick={(e) => {
                        settaskIndex(taskIndex === index ? "" : index);
                      }}
                      alt="down"
                      width={10}
                      height={5}
                      style={{
                        marginLeft: "20px",
                        cursor: "pointer",
                        transform:
                          taskIndex === index
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  )}
                </div>
                <p>{formatDate(data.CreatedAt)}</p>
                {data.Type === "TaskPostingFee" && taskIndex === index && (
                  <p
                    style={{
                      fontSize: "13px",
                      paddingLeft: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    <b>Task: </b>
                    {data.TaskTitle}
                  </p>
                )}
              </div>
              <p
                style={
                  data.Type === "Funding"
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {data.Type === "Funding"
                  ? `+${data.Amount}`
                  : `-${data.Amount}`}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
