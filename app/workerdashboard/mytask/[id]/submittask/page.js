"use client";

import { getTasksId } from "../../lib/getTasks";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "@/app/workerdashboard/mytask/[id]/submittask/page.module.css";

export default function SubmitTasks() {
  const [submitTask, setSubmitTask] = useState(null);
  const [proof, setProof] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function fetchTask() {
      if (!id) return;
      const task = await getTasksId(id);
      console.log("Params:", id, "Task fetched:", task);
      setSubmitTask(task);
    }
    fetchTask();
  }, [id]);

  const handleSubmit = () => {
    alert("Proof Submitted");

    console.log("Proof:", proof);
  };

  return (
    <div className={styles.container}>
      <h1>Task Details</h1>

      {!submitTask ? (
        <p>Tasks not found</p>
      ) : (
        <div className={styles.contentDetails}>
          <div className={styles.details}>
            <p>
              <strong>Title:</strong> {submitTask.title}
            </p>
            <p>
              <strong>Platform:</strong> {submitTask.platform}
            </p>
            <p>
              <strong>Instructions:</strong> {submitTask.instructions}
            </p>
            <p>
              <strong>Required Proof:</strong> {submitTask.requiredProof}
            </p>
            <p>
              <strong>Link:</strong>{" "}
              <a className={styles.link} href={submitTask.link}>
                {" "}
                {submitTask.link}
              </a>
            </p>

            {/* Render input depending on requiredProof */}

            {submitTask.requiredProof === "screenshot" ||
            submitTask.requiredProof === "file" ? (
              <div>
                <input
                  type="file"
                  id="fileUpload"
                  className={styles.hiddenInput}
                  onChange={(e) => setProof(e.target.files[0])}
                />
                <label htmlFor="fileUpload" className={styles.fileButton}>
                  Upload File
                </label>
              </div>
            ) : (
              <input
                type="text"
                placeholder="Paste proof link"
                className={styles.inputLink}
                value={proof}
                onChange={(e) => setProof(e.target.value)}
              />
            )}
          </div>

          <button className={styles.startBtn} onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
