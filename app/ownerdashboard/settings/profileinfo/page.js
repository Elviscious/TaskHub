"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "@/app/ownerdashboard/settings/profileinfo/page.module.css";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/context/context";

export default function ProfileInfo() {
  const { baseUrl } = useContext(AppContext);
  const router = useRouter();
  const [preview, setPreview] = useState("");
  const [industry, setIndustry] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const industryName = {
    0: "None",
    1: "Technology",
    2: "Healthcare",
    3: "Finance",
    4: "Education",
    5: "Retail",
    6: "Manufacturing",
    7: "Hospitality",
    8: "Costruction",
    9: "Transportation",
    10: "Entertainment",
    11: "RealEstate",
    12: "Agriculture",
    13: "Energy",
    14: "Telecommunications",
    15: "Government",
    16: "NonProfit",
  };

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
        console.log(data);
        setCompany(data.CompanyName);
        setEmail(data.Email);
        setUsername(data.Username);
        setWebsite(data.Website);
        setFullName(data.FullName);
        setLocation(data.Location);
        setNumber(data.PhoneNumber);
        setIndustry(data.Industry);
        setPreview(data.ProfilePictureUrl);
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
          router.push("/ownerdashboard/settings");
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
              router.push("/ownerdashboard/settings/profileform");
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
          <div className={styles.businessInfo}>
            <h3>Company</h3>
            <p>{company === null ? "Nill" : company}</p>
          </div>
          <div className={styles.businessInfo}>
            <h3>Website</h3>
            <p>{website === null ? "Nill" : website}</p>
          </div>
          <div className={styles.businessInfo}>
            <h3>Industry</h3>
            <p>{industry === null ? "Nill" : industryName[industry]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
