"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "@/app/ownerdashboard/PostJob/page.module.css";
import { AppContext } from "@/app/context/context";
import { useRouter } from "next/navigation";

export default function PostJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [jobType, setJobType] = useState("");
  const [instructions, setInstructions] = useState("");
  const [budget, setBudget] = useState("");
  const [worker, setWorker] = useState("");
  const [proof, setProof] = useState("");
  const [inputLink, setinputLink] = useState("");
  const [linkError, setlinkError] = useState(null);
  const { baseUrl } = useContext(AppContext);
  const [successful, setSuccessful] = useState(false);
  const [draft, setDraft] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  //   useEffect(() => {
  //     console.log(PostJobData);
  //   }, [PostJob]);

  const platformPatterns = {
    0: /^https?:\/\/(www\.)?facebook\.com\//i,
    1: /^https?:\/\/(www\.)?instagram\.com\//i,
    2: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\//i,
    3: /^https?:\/\/(www\.)?linkedin\.com\//i,
    4: /^https?:\/\/(www\.)?tiktok\.com\//i,
    5: /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i,
  };

  const validatLink = (platformCode, link) => {
    const patterns = platformPatterns[platformCode];
    if (!patterns) return false;

    return patterns.test(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (linkError) {
      return;
    }

    setLoading(true);

    if (!validatLink(platform, inputLink)) {
      alert("Link does not match with selected platform");
      return;
    }

    const PostJobData = {
      JobTitle: jobTitle,
      Platform: platform,
      Type: jobType,
      Instructions: instructions,
      Budget: budget,
      NumberOfWorkers: worker,
      Link: inputLink,
      RequiredProof: proof,
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/api/MainServices/CreateTaskPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(PostJobData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setSuccessful(true);
      console.log("This is ur message", data);

      setJobTitle("");
      setPlatform("");
      setJobType("");
      setInstructions("");
      setBudget("");
      setWorker("");
      setinputLink("");
      setlinkError(null);
      setProof("");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDraft = async () => {
    setSaving(true);

    const DraftData = {
      JobTitle: jobTitle,
      Platform: platform,
      Type: jobType,
      Instructions: instructions,
      Budget: budget,
      NumberOfWorkers: worker,
      Link: inputLink,
      RequiredProof: proof,
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/api/MainServices/CreateTaskDraft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(DraftData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setDraft(true);
      console.log("This is ur message", data);

      setJobTitle("");
      setPlatform("");
      setJobType("");
      setInstructions("");
      setBudget("");
      setWorker("");
      setinputLink("");
      setlinkError(null);
      setProof("");
    } catch (error) {
      console.log(error.message);
    } finally {
      setSaving(false);
    }
  };

  const checkLink = (value) => {
    if (value.includes(" ") || value.includes("\n")) {
      setlinkError("No space allowed in links");
    } else {
      setlinkError(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Post Job</h1>

      <div className={styles.formContainer}>
        <form className={styles.jobForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Job Title</label>
            <input
              type="text"
              placeholder="e.g Subscribe to my channel"
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
              value={platform}
              name="requiredProof"
              onChange={(e) => setPlatform(Number(e.target.value))}
              className={styles.dropDown}
            >
              <option value="">Select Plaform</option>
              <option value={0}>Facebook</option>
              <option value={1}>Instagram</option>
              <option value={2}>Twitter</option>
              <option value={3}>LinkedIn</option>
              <option value={4}>TikTok</option>
              <option value={5}>YouTube</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Job Type</label>
            <select
              id="jobType"
              value={jobType}
              name="jobType"
              onChange={(e) => setJobType(Number(e.target.value))}
              className={styles.dropDown}
            >
              <option value="">Select Job type</option>
              <option value={0}>Like</option>
              <option value={1}>Share</option>
              <option value={2}>Comment</option>
              <option value={3}>Follow</option>
              <option value={4}>Subscribe</option>
              <option value={5}>Post</option>
              <option value={6}>Repost</option>
              <option value={7}>Like and Comment</option>
              <option value={8}>Like and Share</option>
              <option value={9}>Like, Comment and Share</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Instructions</label>
            <textarea
              type="text"
              placeholder="e.g Subscribe to my YouTube channel"
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
              value={proof}
              onChange={(e) => setProof(Number(e.target.value))}
              className={styles.dropDown}
            >
              <option value="">Select a Proof</option>
              <option value={0}>Image</option>
              <option value={1}>Link</option>
              <option value={2}>Document</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Input Link</label>
            <input
              type="url"
              placeholder="input your link here"
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
          <p style={{ opacity: 0.7 }}>
            <b>
              <i>Total Deducted from wallet</i>
            </b>
          </p>
          <p style={{ color: "red", fontWeight: 500 }}>{linkError}</p>

          <div className={styles.formActions}>
            <button
              type="button"
              className={`${styles.btn} ${styles.draft}`}
              onClick={() => handleDraft()}
              style={{
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Saving..." : "Save to Draft"}
            </button>
            <button
              type="submit"
              className={styles.btn}
              style={{
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>

      {successful && (
        <div className={styles.successful}>
          <div
            className={styles.successfulContent}
            onClick={() => setSuccessful(false)}
          >
            <img
              src="/Check_ring_light.png"
              alt="check"
              className={styles.checkImage}
            />

            <p
              style={{
                color: "black",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Task post was successful!
            </p>
            <p style={{ textAlign: "center", fontSize: 24 }}>
              View in{" "}
              <span
                onClick={() => {
                  router.push("/ownerdashboard/MyTask");
                }}
                style={{ color: "#3b82f6" }}
              >
                My Task
              </span>
            </p>
          </div>
        </div>
      )}

      {draft && (
        <div className={styles.successful}>
          <div
            className={styles.successfulContent}
            onClick={() => setDraft(false)}
          >
            <img
              src="/Check_ring_light.png"
              alt="check"
              className={styles.checkImage}
            />

            <p
              style={{
                color: "black",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Task successfully saved!
            </p>
            <p style={{ textAlign: "center", fontSize: 24 }}>
              View in{" "}
              <span
                onClick={() => {
                  router.push("/ownerdashboard/draft");
                }}
                style={{ color: "#3b82f6" }}
              >
                Drafts
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
