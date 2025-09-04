"use client";

import { getTasksId } from "../lib/getTasks";
import React from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/app/workerdashboard/mytask/[id]/page.module.css";
import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { AppContext } from "@/app/context/context";
import { getTasks } from "../lib/getTasks";

export default function TaskDetails() {
	const [detailTasks, setDetailTasks] = useState(null);
	const params = useParams();
	const { id } = params;
	const { baseUrl } = useContext(AppContext);
	const [proof, setProof] = useState(null);

	useEffect(() => {
		async function fetchTask() {
			if (!id) return;
			const task = await getTasksId(id, baseUrl);
			console.log("fetched task:", task);
			setDetailTasks(task);
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

	const handleSubmit = async () => {
		if (!proof) return;

		const formData = new FormData();
		formData.append("file", proof);
		formData.append("upload_preset", "proof_upload");

		try {
			// const res = await fetch(
			// 	"https://api.cloudinary.com/v1_1/doki6huld/auto/upload",
			// 	{
			// 		method: "POST",
			// 		body: formData,
			// 	}
			// );
			// const data = await res.json();
			// console.log("Cloudinary response:", data);
			const fileUrl = "data.secure_url";
			console.log("File URL:", fileUrl);

			// Send URL to your backend
			const response = await fetch(`${baseUrl}/api/TaskSubmission`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
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

		} catch (error) {
			console.error("Error uploading proof:", error);
		}

		setProof(null);
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
						{detailTasks.RequiredProof === 0 ||
						detailTasks.RequiredProof === 2 ? (
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
							<input
								type="text"
								placeholder="Paste proof link"
								className={styles.inputLink}
								value={proof}
								onChange={(e) => setProof(e.target.value)}
							/>
						)}
					</div>

					<button className={styles.startBtn} onClick={handleSubmit}>
						Submit
					</button>
				</div>
			)}
		</div>
	);
}
