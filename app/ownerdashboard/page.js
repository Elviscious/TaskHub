// src/app/workerdashboard/page.jsx

"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "@/app/ownerdashboard/page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import otherstyles from "./dashboard.module.css";
import { AppContext } from "../context/context";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { baseUrl } = useContext(AppContext);
  const [jobCount, setJobCount] = useState(0);
  const [activeJobCount, setactiveJobCount] = useState(0);
  const [completedJobCount, setCompletedJobCount] = useState(0);
  const [rejectedSubmissionsCount, setRejectedSubmissionsCount] = useState(0);
  const [approvedSubmissionsCount, setApprovedSubmissionsCount] = useState(0);
  const [pendingSubmissionsCount, setPendingSubmissionsCount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("navOpen");
    } else {
      document.body.classList.remove("navOpen");
    }
  }, [isOpen]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    async function fetchData() {
      try {
        const response = await fetch(`${baseUrl}/api/MainServices/Dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token here
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setJobCount(result.JobsCount);
        setactiveJobCount(result.ActiveJobsCount);
        setCompletedJobCount(result.CompletedJobsCount);
        setRejectedSubmissionsCount(result.RejectedSubmissionCount);
        setApprovedSubmissionsCount(result.ApprovedSubmissionCount);
        setPendingSubmissionsCount(result.PendingSubmissionCount);
        setWalletBalance(result.WalletBalance);
        console.log(result);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      {/* Hamburger menu for mobile view */}

      <div className={otherstyles.mainContent}>
        <div className={styles.topMenu}>
          <h1>Overview</h1>
        </div>

        <h2>My Tasks</h2>
        <div className={styles.myTaskContainer}>
          <div className={styles.taskContainer}>
            <p>All Jobs</p>
            <h2>{jobCount}</h2>
          </div>
          <div className={styles.taskContainer}>
            <p>Active Jobs</p>
            <h2>{activeJobCount}</h2>
          </div>
          <div className={styles.taskContainer}>
            <p>Completed Jobs</p>
            <h2>{completedJobCount}</h2>
          </div>
        </div>

        <div className={styles.submissions}>
          <h2>Submissions</h2>
          <div className={styles.myTaskContainer}>
            <div className={styles.taskContainer}>
              <p>Approved</p>
              <h2>{approvedSubmissionsCount}</h2>
            </div>
            <div className={styles.taskContainer}>
              <p>Pending</p>
              <h2>{pendingSubmissionsCount}</h2>
            </div>
            <div className={styles.taskContainer}>
              <p>Rejected</p>
              <h2>{rejectedSubmissionsCount}</h2>
            </div>
          </div>
        </div>

        <div className={styles.walletBalance}>
          <p>Wallet Balance</p>
          <h2>${walletBalance}</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
