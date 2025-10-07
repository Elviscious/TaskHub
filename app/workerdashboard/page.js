// src/app/workerdashboard/page.jsx

"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "@/app/workerdashboard/page.module.css";
import { useRouter } from "next/navigation";
// import otherstyles from "@/app/ownerdashboard/dashboard.module.css";
import { AppContext } from "@/app/context/context";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { baseUrl } = useContext(AppContext);
  const { profile } = useContext(AppContext);
  const [availableTask, setAvailabelTask] = useState(0);
  const [pendingTask, setPendingTask] = useState(0);
  const [completedTask, setCompletedTask] = useState(0);
  const [approvedSubmissions, setApprovedSubmissions] = useState(0);
  const [rejectedSubmissions, setRejectedSubmissions] = useState(0);
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
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/TaskSubmission/Dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Dashboard data:", data);

        // const pendingTask =
        //   JSON.parse(localStorage.getItem("pendingTask")) || [];
        // setPendingTask(pendingTask.length);

        setAvailabelTask(data.AvailableTasks);
        setPendingTask(data.PendingTasks);
        setApprovedSubmissions(data.ApprovedSubmissions);
        setRejectedSubmissions(data.RejectedSubmissions);
        setWalletBalance(data.WalletBalance);
        setCompletedTask(data.CompletedTasks);
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.divContainer}>
        <div className={styles.topMenu}>
          <h1>Overview</h1>
        </div>

        <h2>My Tasks</h2>
        <div className={styles.myTaskContainer}>
          <div className={styles.taskContainer}>
            <p>Available</p>
            <h2>{availableTask}</h2>
          </div>
          <div className={styles.taskContainer}>
            <p>Pending</p>
            <h2>{pendingTask}</h2>
          </div>
          <div className={styles.taskContainer}>
            <p>Completed</p>
            <h2>{completedTask}</h2>
          </div>
        </div>

        <div className={styles.submissions}>
          <h2>Submissions</h2>
          <div className={styles.myTaskContainer}>
            <div className={styles.taskContainer}>
              <p>Approved</p>
              <h2>{approvedSubmissions}</h2>
            </div>
            <div className={styles.taskContainer}>
              <p>Rejected</p>
              <h2>{rejectedSubmissions}</h2>
            </div>
            <div className={styles.walletBalance}>
              <p>Wallet Balance</p>
              <h2>${walletBalance}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* {!profile && (
        <div className={styles.successful}>
          <div className={styles.successfulContent}>
            <img
              src="/User_alt_light.svg"
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
              Please set up Profile to access all features
            </p>
            <p style={{ textAlign: "center", fontSize: 24 }}>
              <span
                onClick={() => {
                  router.push("/workerdashboard/settings/profileinfo");
                }}
                style={{ color: "#3b82f6" }}
              >
                Profile info
              </span>
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Dashboard;
