"use client";

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "@/app/context/context";
import styles from "@/app/ownerdashboard/submissions/page.module.css";

export default function Submissions() {
  const [searchTitle, setSearchTitle] = useState("");
  const [submissions, setSubmissions] = useState("");
  const { baseUrl } = useContext(AppContext);
  const tasks = [
    { id: 1, title: "Follow my YouTube" },
    { id: 2, title: "Like my Instagram post" },
    { id: 3, title: "Retweet my tweet" },
    { id: 4, title: "Comment on my Facebook post" },
    { id: 5, title: "Follow my Instagram" },
    { id: 6, title: "Subscribe to my YouTube channel" },
    { id: 7, title: "Like my TikTok video" },
    { id: 8, title: "Follow my Twitter account" },
    { id: 9, title: "Comment on my Instagram post" },
    { id: 10, title: "Like my Facebook post" },
    { id: 11, title: "Follow my TikTok" },
    { id: 12, title: "Retweet my tweet" },
    { id: 13, title: "Like my Instagram post" },
    { id: 14, title: "Follow my YouTube" },
    { id: 15, title: "Comment on my TikTok video" },
    { id: 16, title: "Subscribe to my YouTube channel" },
    { id: 17, title: "Follow my Twitter account" },
    { id: 18, title: "Share my Facebook post" },
    { id: 19, title: "Like my TikTok video" },
    { id: 20, title: "Follow my Instagram" },
    { id: 21, title: "Subscribe to my newsletter" },
    { id: 22, title: "Follow my LinkedIn profile" },
    { id: 23, title: "Like my Pinterest pin" },
    { id: 24, title: "Comment on my LinkedIn post" },
    { id: 25, title: "Join my Telegram group" },
    { id: 26, title: "Share my Instagram story" },
    { id: 27, title: "Follow my Snapchat" },
    { id: 28, title: "Like my YouTube video" },
    { id: 29, title: "Retweet my tweet" },
    { id: 30, title: "Comment on my Facebook post" },
    { id: 31, title: "Follow my Discord server" },
    { id: 32, title: "Like my Instagram post" },
    { id: 33, title: "Share my TikTok video" },
    { id: 34, title: "Follow my Twitch channel" },
    { id: 35, title: "Subscribe to my YouTube channel" },
    { id: 36, title: "Follow my Twitter account" },
    { id: 37, title: "Comment on my Instagram post" },
    { id: 38, title: "Like my Facebook post" },
    { id: 39, title: "Follow my TikTok" },
    { id: 40, title: "Retweet my tweet" },
    { id: 41, title: "Like my Instagram post" },
    { id: 42, title: "Follow my YouTube" },
    { id: 43, title: "Comment on my TikTok video" },
    { id: 44, title: "Subscribe to my YouTube channel" },
    { id: 45, title: "Follow my Twitter account" },
    { id: 46, title: "Share my Facebook post" },
    { id: 47, title: "Like my TikTok video" },
    { id: 48, title: "Follow my Instagram" },
    { id: 49, title: "Join my WhatsApp group" },
    { id: 50, title: "Like my Reddit post" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/MainServices/AllTaskSubmissions`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        console.log("this is data", data);
        setSubmissions(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filteredTitle = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>Submissions</h1>

      {submissions.length > 0 ? (
        <div style={{ justifySelf: "right" }}>
          <div className={styles.inputContainer}>
            <Image src="/Search.png" alt="search" width={20} height={20} />
            <input
              placeholder="Search here..."
              className={styles.input}
              value={searchTitle}
              onChange={(e) => {
                setSearchTitle(e.target.value);
              }}
            />
          </div>
        </div>
      ) : (
        <p></p>
      )}

      <div className={styles.listContainer}>
        <ul style={{ listStyle: "none" }}>
          {submissions.length > 0 ? (
            submissions.map((task) => (
              <li key={task.TaskPostId} className={styles.taskList}>
                <p style={{ color: "black", fontSize: 18, fontWeight: "500" }}>
                  Task: {task.JobTitle}
                </p>
                <Link
                  href={`/ownerdashboard/submissions/${
                    task.TaskPostId
                  }?title=${encodeURIComponent(task.JobTitle)}`}
                >
                  <p style={{ color: "#3b82f6", fontSize: 12 }}>View Table</p>
                </Link>
              </li>
            ))
          ) : (
            <p>No Submissions available</p>
          )}
        </ul>
      </div>
    </div>
  );
}
