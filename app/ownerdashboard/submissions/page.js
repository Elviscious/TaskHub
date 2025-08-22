"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ownerdashboard/submissions/page.module.css";

export default function Submissions() {
  const tasks = [
    { id: 1, title: "Subscribe to my YouTube" },
    { id: 2, title: "Like and retweet" },
    { id: 3, title: "Follow my Instagram" },
    { id: 4, title: "Subscribe my YouTube" },
    { id: 5, title: "Like and retweet" },
    { id: 6, title: "Follow my Facebook" },
    { id: 7, title: "Like my Instagram Post" },
    { id: 8, title: "Like my Instagram Post" },
    { id: 9, title: "Like my Instagram Post" },
    { id: 10, title: "Like my Instagram Post" },
    { id: 11, title: "Like my Instagram Post" },
    { id: 12, title: "Like my Instagram Post" },
    { id: 13, title: "Like my Instagram Post" },
    { id: 14, title: "Like my Instagram Post" },
    { id: 15, title: "Like my Instagram Post" },
    { id: 16, title: "Like my Instagram Post" },
    { id: 17, title: "Like my Instagram Post" },
    { id: 18, title: "Like my Instagram Post" },
    { id: 19, title: "Like my Instagram Post" },
    { id: 20, title: "Like my Instagram Post" },
    { id: 21, title: "Like my Instagram Post" },
    { id: 22, title: "Like my Instagram Post" },
    { id: 23, title: "Like my Instagram Post" },
    { id: 24, title: "Like my Instagram Post" },
    { id: 25, title: "Like my Instagram Post" },
    { id: 26, title: "Like my Instagram Post" },
    { id: 27, title: "Like my Instagram Post" },
    { id: 28, title: "Like my Instagram Post" },
    { id: 29, title: "Like my Instagram Post" },
    { id: 30, title: "Like my Instagram Post" },
    { id: 31, title: "Like my Instagram Post" },
    { id: 32, title: "Like my Instagram Post" },
    { id: 33, title: "Like my Instagram Post" },
    { id: 34, title: "Like my Instagram Post" },
    { id: 35, title: "Like my Instagram Post" },
    { id: 36, title: "Like my Instagram Post" },
    { id: 37, title: "Like my Instagram Post" },
    { id: 38, title: "Like my Instagram Post" },
    { id: 39, title: "Like my Instagram Post" },
    { id: 40, title: "Like my Instagram Post" },
    { id: 41, title: "Like my Instagram Post" },
    { id: 42, title: "Like my Instagram Post" },
    { id: 43, title: "Like my Instagram Post" },
    { id: 44, title: "Like my Instagram Post" },
    { id: 45, title: "Like my Instagram Post" },
    { id: 46, title: "Like my Instagram Post" },
    { id: 47, title: "Like my Instagram Post" },
    { id: 48, title: "Like my Instagram Post" },
    { id: 49, title: "Like my Instagram Post" },
    { id: 50, title: "Like my Instagram Post" },
  ];
  return (
    <div>
      <h1>Submissions</h1>

      <div style={{ justifySelf: "right" }}>
        <div className={styles.inputContainer}>
          <Image src="/Search.png" alt="search" width={20} height={20} />
          <input placeholder="Search here..." className={styles.input} />
        </div>
      </div>

      <div className={styles.listContainer}>
        <ul style={{ listStyle: "none" }}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.taskList}>
              <p style={{ color: "black", fontSize: 18 }}>{task.title}</p>
              <Link href={`/ownerdashboard/submissions/${task.id}`}>
                <p style={{ color: "#3b82f6", fontSize: 12 }}>View Table</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
