"use client";

import { getTasksId } from "../lib/getTasks";
import React from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/app/workerdashboard/mytask/[id]/page.module.css";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function TaskDetails() {
  const [detailTasks, setDetailTasks] = useState(null);
  const [status, setStatus] = useState("New");
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function fetchTask() {
      if (!id) return;
      const task = await getTasksId(id);
      //   console.log("fetched task:", task);
      setDetailTasks(task);
      setStatus(task?.status || "New");
    }
    fetchTask();
  }, [id]);

  const handleStart = () => {
    setStatus("pending");
  };

  return (
    <div className={styles.container}>
      <h1>Task Details</h1>

      {!detailTasks ? (
        <p>Tasks not found</p>
      ) : (
        <div className={styles.contentDetails}>
          <div className={styles.details}>
            <p>
              <strong>Title:</strong> {detailTasks.title}
            </p>
            <p>
              <strong>Platform:</strong> {detailTasks.platform}
            </p>
            <p>
              <strong>Instructions:</strong> {detailTasks.instructions}
            </p>
            <p>
              <strong>Required Proof:</strong> {detailTasks.requiredProof}
            </p>
            <p>
              <strong>Link:</strong>{" "}
              <span className={styles.link}> {detailTasks.link}</span>
            </p>
          </div>

          {status === "New" && (
            <Link href={`/workerdashboard/mytask/${id}/submittask`}>
              <button className={styles.startBtn} onClick={() => handleStart()}>
                Start
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
