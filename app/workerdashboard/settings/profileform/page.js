"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "@/app/ownerdashboard/settings/profileform/page.module.css";
import { AppContext } from "@/app/context/context";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const [preview, setPreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const { baseUrl } = useContext(AppContext);
  const { setProfile } = useContext(AppContext);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // display the image on the screen
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/ProfileSetup/GetWorkerProfile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("Profile data:", data);
        setUserId(data.Id);
        setEmail(data.Email);
        setFullName(data.FullName);
        setUsername(data.Username);
        setLocation(data.Location);
        setNumber(data.PhoneNumber);
        setPreview(data.ProfilePictureUrl);
        setSelectedFile(data.ProfilePictureUrl);
        setTiktok(data.TikTokHandle);
        setYoutube(data.YouTubeHandle);
        setLinkedin(data.LinkedInHandle);
        setTwitter(data.TwitterHandle);
        setFacebook(data.FacebookHandle);
        setInstagram(data.InstagramHandle);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const res = await fetch(`${baseUrl}/api/ProfileSetup/Update/Worker`, {
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
          TikTokHandle: tiktok,
          InstagramHandle: instagram,
          FacebookHandle: facebook,
          LinkedInHandle: linkedin,
          YouTubeHandle: youtube,
          TwitterHandle: twitter,
          LastUpdated: new Date(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      console.log(data);

      setUsername("");
      setLocation("");
      setNumber("");
      setFacebook("");
      setInstagram("");
      setTiktok("");
      setLinkedin("");
      setYoutube("");
      setTwitter("");

      router.push("/workerdashboard/settings/profileinfo");
    } catch (error) {
      console.log(error.message);
    } finally {
      setProfile(true);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 style={{ margin: 0 }}>Profile Information</h1>
      <span
        onClick={() => {
          router.push("/workerdashboard/settings/profileinfo");
        }}
        style={{ cursor: "pointer", color: "black" }}
      >
        Go Back
      </span>

      <div className={styles.formContainer}>
        <form>
          <h2>Personal information</h2>

          <div className={styles.uploadContainer}>
            <label className={styles.uploadBtn}>
              <input type="file" accept="image/*" onChange={handleFileChange} />
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
            />
          </div>
          <div className={styles.formGroup}>
            <label>Location</label>
            <input
              type="text"
              value={location === null ? "" : location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input
              type="number"
              value={number === null ? "" : number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <h2 style={{ marginBottom: 10, marginTop: 25 }}>Social Accounts</h2>

          <div className={styles.formGroup}>
            <label>Facebook</label>
            <input
              type="text"
              value={facebook === null ? "" : facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Twitter</label>
            <input
              type="text"
              value={twitter === null ? "" : twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>LinkedIn</label>
            <input
              type="text"
              value={linkedin === null ? "" : linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>YouTube</label>
            <input
              type="text"
              value={youtube === null ? "" : youtube}
              onChange={(e) => setYoutube(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Instagram</label>
            <input
              type="text"
              value={instagram === null ? "" : instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Tiktok</label>
            <input
              type="text"
              value={tiktok === null ? "" : tiktok}
              onChange={(e) => setTiktok(e.target.value)}
            />
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
  );
}
