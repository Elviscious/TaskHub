"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "@/app/ownerdashboard/settings/profileinfo/page.module.css";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/context/context";

export default function ProfileInfo() {
  const { baseUrl } = useContext(AppContext);
  const router = useRouter();
  const [preview, setPreview] = useState("");
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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

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
        console.log(data);
        setEmail(data.Email);
        setUsername(data.Username);
        setFullName(data.FullName);
        setLocation(data.Location);
        setNumber(data.PhoneNumber);
        setPreview(data.ProfilePictureUrl);
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

  return (
    <div className={styles.container}>
      <h1 style={{ margin: 0 }}>Profile Information</h1>
      <span
        onClick={() => {
          router.push("/workerdashboard/settings");
        }}
        style={{ cursor: "pointer", color: "black" }}
      >
        Go Back
      </span>

      <div className={styles.profileContainer}>
        <div className={styles.header}>
          <h2>Personal Information</h2>

          <button
            className={styles.button}
            onClick={() => {
              router.push("/workerdashboard/settings/profileform");
            }}
          >
            Edit
          </button>
        </div>

        <div className={styles.imageContainer}>
          <label className={styles.image}>
            {!preview && <span className={styles.imageText}>No photo</span>}
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

        <div className={styles.detailContainer}>
          <div>
            <div className={styles.detailInfo}>
              <h3>Full name</h3>
              <p>{fullName}</p>
            </div>
            <div className={styles.detailInfo}>
              <h3>Email Address</h3>
              <p>{email}</p>
            </div>
            <div className={styles.detailInfo}>
              <h3>Username</h3>
              <p>{username === null ? "Nill" : username}</p>
            </div>
          </div>
          <div>
            <div className={styles.detailInfo}>
              <h3>Location</h3>
              <p>{location === null ? "Nill" : location}</p>
            </div>
            <div className={styles.detailInfo}>
              <h3>Phone Number</h3>
              <p>{number === null ? "Nill" : number}</p>
            </div>
          </div>
        </div>

        <div className={styles.businessContainer}>
          <h2>Business Information</h2>
          <div className={styles.detailContainer}>
            <div>
              <div className={styles.detailInfo}>
                <h3>Facebook</h3>
                <p>{facebook === null ? "Nill" : facebook}</p>
              </div>
              <div className={styles.detailInfo}>
                <h3>Twitter</h3>
                <p>{twitter === null ? "Nill" : twitter}</p>
              </div>
              <div className={styles.detailInfo}>
                <h3>LinkedIn</h3>
                <p>{linkedin === null ? "Nill" : linkedin}</p>
              </div>
            </div>
            <div>
              <div className={styles.detailInfo}>
                <h3>YouTube</h3>
                <p>{youtube === null ? "Nill" : youtube}</p>
              </div>
              <div className={styles.detailInfo}>
                <h3>Instagram</h3>
                <p>{instagram === null ? "Nill" : instagram}</p>
              </div>
              <div className={styles.detailInfo}>
                <h3>TikTok</h3>
                <p>{tiktok === null ? "Nill" : tiktok}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
