"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/ownerdashboard/PostJob/page.module.css";

export default function PostJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [instructions, setInstructions] = useState("");
  const [budget, setBudget] = useState("");
  const [worker, setWorker] = useState("");
  const [targetCountry, setTargetCountry] = useState("");

  const PostJobData = {
    title: jobTitle,
    type: jobType,
    instruction: instructions,
    budget: budget,
    numberOfWorker: worker,
    country: targetCountry,
  };

  //   useEffect(() => {
  //     console.log(PostJobData);
  //   }, [PostJob]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(PostJobData);
  };

  return (
    <div>
      <h1>Post Job</h1>

      <div className={styles.formContainer}>
        <form className={styles.jobForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Job Title</label>
            <input
              type="text"
              placeholder="John Doe"
              required
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Job Type</label>
            <input
              type="text"
              placeholder="John Doe"
              required
              value={jobType}
              onChange={(e) => {
                setJobType(e.target.value);
              }}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Instructions</label>
            <input
              type="text"
              placeholder="John Doe"
              required
              value={instructions}
              onChange={(e) => {
                setInstructions(e.target.value);
              }}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Required Proof</label>
            <select
              id="requiredProof"
              name="requiredProof"
              className={styles.dropDown}
            >
              <option value="">Select a Proof</option>
              <option value="File">File</option>
              <option value="screenshot">Screenshot</option>
              <option value="Links">Links</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Budget</label>
            <input
              type="number"
              placeholder="John Doe"
              required
              value={budget}
              onChange={(e) => {
                setBudget(e.target.value);
              }}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Number of Workers</label>
            <input
              type="number"
              placeholder="John Doe"
              required
              value={worker}
              onChange={(e) => {
                setWorker(e.target.value);
              }}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Target Country</label>
            <input
              type="text"
              placeholder="John Doe"
              value={targetCountry}
              onChange={(e) => {
                setTargetCountry(e.target.value);
              }}
            />
          </div>

          <div className={styles.formCheckBox}>
            <input type="checkbox" id="deduct" />
            <label htmlFor="deduct">Deduct total budget from wallet</label>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.btn}>
              Save to Draft
            </button>
            <button
              type="submit"
              className={styles.btn}
              onClick={() => {
                console.log(PostJobData);
              }}
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
