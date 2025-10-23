"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "@/app/ownerdashboard/wallet/page.module.css";
import Image from "next/image";

export default function WalletLayout({ title, payoutData }) {
  const [dropDown, setDropDown] = useState(false);
  const [taskIndex, settaskIndex] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const dropdownRef = useRef(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  const handleSelect = (month) => {
    setSelectedMonth(month);
    setDropDown(false);
  };

  const filterData =
    selectedMonth === "All"
      ? payoutData
      : payoutData.filter((item) => {
          return item.date
            .toLowerCase()
            .startsWith(selectedMonth.toLowerCase());
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

  return (
    <div className={styles.WalletLayout}>
      <div className={styles.titleBar}>
        <h2>{title}</h2>
        <div className={styles.filter} ref={dropdownRef}>
          <Image src="/Filter_alt.png" alt="filter" width={20} height={20} />
          <div className={styles.customDropdown}>
            <div className={styles.selected} onClick={handleDropDown}>
              <span>{selectedMonth}</span>
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
                {months.map((month, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(month)}
                    style={{
                      background:
                        selectedMonth === month ? "#3b82f6" : "transparent",
                      color: selectedMonth === month ? "#fff" : "#000",
                      cursor: "pointer",
                    }}
                  >
                    {month}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className={styles.payoutLists}>
        {filterData.map((data, index) => (
          <div key={index} className={styles.payout}>
            <div className="listFirst">
              <div className={styles.money}>
                <Image src="/Money.png" alt="money" height={30} width={30} />
                <p>{data.type}</p>
                {title === "Payout History" && (
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
                        taskIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                )}
              </div>
              <p>{data.date}</p>
              {title === "Payout History" && taskIndex === index && (
                <p
                  style={{
                    fontSize: "13px",
                    paddingLeft: "10px",
                    paddingTop: "10px",
                  }}
                >
                  <b>Task: </b>
                  {data.task}
                </p>
              )}
            </div>
            <p>{data.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
