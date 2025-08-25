"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/ownerdashboard/PostJob/page.module.css";

export default function PostJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [instructions, setInstructions] = useState("");
  const [budget, setBudget] = useState("");
  const [worker, setWorker] = useState("");
  const [inputLink, setinputLink] = useState("");
  const [Error, setError] = useState(null)

  const PostJobData = {
    title: jobTitle,
    type: jobType,
    instruction: instructions,
    budget: budget,
    numberOfWorker: worker,
    country: inputLink,
  };

  //   useEffect(() => {
  //     console.log(PostJobData);
  //   }, [PostJob]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Error) {
      return
    }

    console.log(PostJobData);
  };

  const checkLink = (value) =>{
    if(value.includes(" ") || value.includes("\n")){
      setError("No space allowed in links");
    }
    else{
      setError(null)
    }
  }

  return (
		<div className={styles.container}>
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
						<label>Platform</label>
						<select
							id="requiredProof"
							name="requiredProof"
							className={styles.dropDown}
						>
							<option value="">Select Plaform</option>
							<option value="File">YouTube</option>
							<option value="screenshot">Instagram</option>
							<option value="Links">Twitter</option>
							<option value="Links">Telegram</option>
							<option value="Links">Twitch</option>
							<option value="Links">App Download</option>
						</select>
					</div>

					<div className={styles.formGroup}>
						<label>Instructions</label>
						<textarea
							type="text"
							placeholder="Subscribe to my YouTube channel"
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
						<label>Input Link</label>
						<input
							type="url"
							placeholder="www.youtube.com"
							required
							value={inputLink}
							onChange={(e) => {
								setinputLink(e.target.value);
								checkLink(e.target.value);
							}}
						/>
					</div>
					<div className={styles.formGroup}>
						<label>Budget</label>
						<input
							type="number"
							placeholder="10,000"
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
							placeholder="10"
							required
							value={worker}
							onChange={(e) => {
								setWorker(e.target.value);
							}}
						/>
					</div>
						<p style={{opacity: .7}}>
							<b>
								<i>Total Deducted from wallet</i>
							</b>
						</p>
					<p style={{color: "red", fontWeight:500}}>{Error}</p>

					<div className={styles.formActions}>
						<button type="button" className={`${styles.btn} ${styles.draft}`}>
							Save to Draft
						</button>
						<button
							type="submit"
							className={styles.btn}
						>
							Post Job
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
