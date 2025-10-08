"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "@/app/ownerdashboard/settings/profileform/page.module.css";
import { AppContext } from "@/app/context/context";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const [industry, setIndustry] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [previewError, setPreviewError] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [daysLeft, setDaysLeft] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { baseUrl } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/ProfileSetup/GetOwnerProfile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Profile data:", data);
        setUserId(data.Id);
        setEmail(data.Email);
        setFullName(data.FullName);
        setCompany(data.CompanyName);
        setUsername(data.Username);
        setWebsite(data.Website);
        setLocation(data.Location);
        setNumber(data.PhoneNumber);
        setIndustry(data.Industry);
        setPreview(data.ProfilePictureUrl);
        setSelectedFile(data.ProfilePictureUrl);
        setDate(data.LastUpdated);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // display the image on the screen
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const formCheck = () => {
    if (username === null) {
      setUsernameError("This field is required");
    } else {
      setUsernameError("");
    }

    if (preview === null) {
      setPreviewError("Profile photo is required");
    } else {
      setPreviewError("");
    }

    if (location === null) {
      setLocationError("This field is required");
    } else {
      setLocationError("");
    }
    if (number === null) {
      setNumberError("This field is required");
    } else {
      setNumberError("");
    }

    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formCheck();

    // Check if user clicked before
    if (date) {
      const now = new Date();
      const lastDate = new Date(date);

      if (lastDate.toISOString().startsWith("0001-01-01")) {
        console.log("First time updating profile");
      } else {
        const diffDays = (now - lastDate) / (1000 * 60 * 60 * 24);
        console.log(lastDate, diffDays);
        if (diffDays < 21) {
          const daysLeft = Math.ceil(21 - diffDays);
          setDaysLeft(daysLeft);
          setSuccessful(true);
          return;
        }
      }
    }

    const token = localStorage.getItem("token");

    let fileUrl = "";

    setLoading(true);

    try {
      const newFormData = new FormData();
      newFormData.append("file", selectedFile);
      newFormData.append("upload_preset", "proof_upload");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/doki6huld/auto/upload",
        {
          method: "POST",
          body: newFormData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to convert image");
      }

      const image = await response.json();
      console.log("Cloudinary response:", image);
      fileUrl = image.secure_url;
      console.log("File URL:", fileUrl);

      const res = await fetch(`${baseUrl}/api/ProfileSetup/Update/Owner`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Id: userId,
          FullName: fullName,
          Email: email,
          Username: username,
          ProfilePictureUrl: fileUrl,
          Location: location,
          PhoneNumber: number,
          CompanyName: company,
          Website: website,
          Industry: industry,
          LastUpdated: new Date(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      console.log(data);
      const time = new Date().toISOString();
      console.log("Time of edit:", time);

      setUsername("");
      setLocation("");
      setNumber("");
      setCompany("");
      setWebsite("");
      setIndustry("");

      router.push("/ownerdashboard/settings/profileinfo");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 style={{ margin: 0 }}>Profile Information</h1>
        <span
          onClick={() => {
            router.push("/ownerdashboard/settings/profileinfo");
          }}
          style={{ cursor: "pointer", color: "black" }}
        >
          Go Back
        </span>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Personal information</h2>

            <div className={styles.uploadContainer}>
              <label className={styles.uploadBtn}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {!preview && (
                  <span className={styles.uploadText}>Upload photo</span>
                )}
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 10,
                    }}
                  />
                )}
              </label>
            </div>
            <p style={{ color: "red" }}>{previewError}</p>

            <div className={styles.signupInfo}>
              <h2>Full name</h2>
              <p>{fullName}</p>
            </div>
            <div className={styles.signupInfo}>
              <h2>Email Address</h2>
              <p>{email}</p>
            </div>

            <div className={styles.formGroup}>
              <label>Username</label>
              <input
                type="text"
                value={username === null ? "" : username}
                onChange={(e) => setUsername(e.target.value)}
                style={
                  usernameError === ""
                    ? { borderColor: "#3b82f6" }
                    : { borderColor: "red" }
                }
              />
              <p style={{ color: "red" }}>{usernameError}</p>
            </div>
            <div className={styles.formGroup}>
              <label>Location</label>
              <input
                type="text"
                value={location === null ? "" : location}
                onChange={(e) => setLocation(e.target.value)}
                style={
                  locationError === ""
                    ? { borderColor: "#3b82f6" }
                    : { borderColor: "red" }
                }
              />
              <p style={{ color: "red" }}>{locationError}</p>
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input
                type="number"
                value={number === null ? "" : number}
                onChange={(e) => setNumber(e.target.value)}
                style={
                  numberError === ""
                    ? { borderColor: "#3b82f6" }
                    : { borderColor: "red" }
                }
              />
              <p style={{ color: "red" }}>{numberError}</p>
            </div>

            <h2 style={{ marginBottom: 10, marginTop: 25 }}>
              Business Information
            </h2>

            <div className={styles.formGroup}>
              <label>Company Name</label>
              <input
                type="text"
                value={company === null ? "" : company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Website</label>
              <input
                type="url"
                value={website === null ? "" : website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Industry</label>
              <select
                id="Industry"
                value={industry === null ? "" : industry}
                name="Industy"
                onChange={(e) => setIndustry(Number(e.target.value))}
                className={styles.dropDown}
              >
                <option value="">Select Industry</option>
                <option value={0}>None</option>
                <option value={1}>Technology</option>
                <option value={2}>Healthcare</option>
                <option value={3}>Finance</option>
                <option value={4}>Education</option>
                <option value={5}>Retail</option>
                <option value={6}>Manufacturing</option>
                <option value={7}>Hospitality</option>
                <option value={8}>Construction</option>
                <option value={9}>Transportation</option>
                <option value={10}>Entertainment</option>
                <option value={11}>RealEstate</option>
                <option value={12}>Agriculture</option>
                <option value={13}>Energy</option>
                <option value={14}>Telecommunications</option>
                <option value={15}>Government</option>
                <option value={16}>NonProfit</option>
              </select>
            </div>
            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              style={{
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>

      {successful && (
        <div className={styles.successful}>
          <div
            className={styles.successfulContent}
            onClick={() => setSuccessful(false)}
          >
            <img
              src="/attention-circle.svg"
              alt="check"
              className={styles.checkImage}
            />

            <p
              style={{
                color: "black",
                fontSize: 24,
                maxWidth: 400,
                textAlign: "center",
              }}
            >
              You cannot update your profile until after 21 days. You have{" "}
              {daysLeft} day(s) left.
            </p>
            {/* <p style={{ textAlign: "center", fontSize: 24 }}>
              View in{" "}
              <span
                onClick={() => {
                  router.push("/ownerdashboard/MyTask");
                }}
                style={{ color: "#3b82f6" }}
              >
                My Task
              </span>
            </p> */}
          </div>
        </div>
      )}
    </div>
  );
}
