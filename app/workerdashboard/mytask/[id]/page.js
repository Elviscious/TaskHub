"use client";

import { getTasksId } from "../lib/getTasks";
import React from "react";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "@/app/workerdashboard/mytask/[id]/page.module.css";
import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { AppContext } from "@/app/context/context";
import { jwtDecode } from "jwt-decode";
import { getTasks } from "../lib/getTasks";

export default function TaskDetails() {
  const [detailTasks, setDetailTasks] = useState(null);
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { baseUrl } = useContext(AppContext);
  const [proof, setProof] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    async function fetchTask() {
      try {
        if (!id) return;
        const task = await getTasksId(id, baseUrl);
        console.log("fetched task:", task);
        setDetailTasks(task);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTask();
  }, [baseUrl, id]);

  const requiredProof = {
    0: "Image",
    1: "Link",
    2: "Document",
  };
  const platform = {
    0: "Facebook",
    1: "Instagram",
    2: "Twitter",
    3: "LinkedIn",
    4: "TikTok",
    5: "YouTube",
  };

  const handleStart = (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token not found");
      return;
    }

    let userKey;

    try {
      const decoded = jwtDecode(token);
      const email =
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ];

      userKey = `pendingTask_${email}`;
    } catch (error) {
      console.log(error);
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/TaskSubmission/start/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("handleStart:", data);

        const pendingTask = JSON.parse(localStorage.getItem(userKey)) || [];

        if (!pendingTask.find((t) => t.Id === id)) {
          pendingTask.push({
            taskId: id,
            JobTitle: detailTasks.JobTitle,
            status: "pending",
          });
          localStorage.setItem(userKey, JSON.stringify(pendingTask));
        }

        setIsPending(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  };

  const handleSubmit = async () => {
    if (!proof) return;
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token not found");
      return;
    }

    let userKey;

    try {
      const decoded = jwtDecode(token);
      const email =
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ];

      userKey = `pendingTask_${email}`;
    } catch (error) {
      console.log(error);
    }

    let fileUrl = "";

    try {
      if (typeof proof === "string") {
        fileUrl = proof;
      } else {
        const formData = new FormData();
        formData.append("file", proof);
        formData.append("upload_preset", "proof_upload");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/doki6huld/auto/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Failed to convert image");
        }

        const data = await res.json();
        console.log("Cloudinary response:", data);
        fileUrl = data.secure_url;
        console.log("File URL:", fileUrl);
      }

      // Send URL to your backend
      const response = await fetch(`${baseUrl}/api/TaskSubmission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          TaskPostId: detailTasks?.Id,
          TenantId: detailTasks?.Id,
          ProofFileUrl: fileUrl,
          IsApproved: false,
          Status: 0,
          SubmittedAt: new Date().toISOString(),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit proof");
      }
      alert("Proof submitted successfully!");

      // Removing the task from pending
      const pendingTask = JSON.parse(localStorage.getItem(userKey)) || [];
      const updated = pendingTask.filter(
        (t) => String(t.taskId) !== String(id)
      );
      localStorage.setItem(userKey, JSON.stringify(updated));
      setIsPending(false);
      setProof("");

      router.push("/workerdashboard/mytask");
    } catch (error) {
      console.log("Error uploading proof:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Task Details</h1>

      {detailTasks && (
        <div className={styles.contentDetails}>
          <div className={styles.details}>
            <p>
              <strong>Title:</strong> {detailTasks.JobTitle}
            </p>
            <p>
              <strong>Platform:</strong> {platform[detailTasks.Platform]}
            </p>
            <p>
              <strong>Instructions:</strong> {detailTasks.Instructions}
            </p>
            <p>
              <strong>Required Proof:</strong>{" "}
              {requiredProof[detailTasks.RequiredProof]}
            </p>
            <p>
              <strong>Link:</strong>
              {detailTasks.Link}
            </p>
            {(isPending && detailTasks.RequiredProof === 0) ||
            (isPending && detailTasks.RequiredProof === 2) ? (
              <div>
                <input
                  type="file"
                  id="fileUpload"
                  className={styles.hiddenInput}
                  onChange={(e) => setProof(e.target.files[0])}
                />
                {proof && <span className={styles.fileName}>{proof.name}</span>}
                <label
                  htmlFor="fileUpload"
                  className={styles.fileButton}
                  onClick={() => {
                    console.log(proof);
                  }}
                >
                  Upload File
                </label>
              </div>
            ) : (
              isPending && (
                <input
                  type="text"
                  placeholder="Paste proof link"
                  className={styles.inputLink}
                  value={proof}
                  onChange={(e) => setProof(e.target.value)}
                />
              )
            )}
          </div>

          {/* Toogle between the Start and Submit button */}

          {!isPending ? (
            <button
              className={styles.startBtn}
              onClick={() => handleStart(detailTasks.Id)}
            >
              Start
            </button>
          ) : (
            <button className={styles.startBtn} onClick={() => handleSubmit()}>
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
}
