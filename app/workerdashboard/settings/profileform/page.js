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
  const [usernameError, setUsernameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [tiktokError, setTiktokError] = useState("");
  const [instagramError, setInstagramError] = useState("");
  const [facebookError, setFacebookError] = useState("");
  const [twitterError, setTwitterError] = useState("");
  const [linkedinError, setLinkedinError] = useState("");
  const [youtubeError, setYoutubeError] = useState("");
  const [previewError, setPreviewError] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [daysLeft, setDaysLeft] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [date, setDate] = useState("");
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
        setDate(data.LastUpdated);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const formCheck = () => {
    if (preview === null) {
      setPreviewError("Profile photo is required");
    } else {
      setPreviewError("");
    }
    if (username === null) {
      setUsernameError("This field is required");
    } else {
      setUsernameError("");
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

    if (instagram === null) {
      setInstagramError("This field is required");
    } else {
      setInstagramError("");
    }

    if (tiktok === null) {
      setTiktokError("This field is required");
    } else {
      setTiktokError("");
    }

    if (youtube === null) {
      setYoutubeError("This field is required");
    } else {
      setYoutubeError("");
    }

    if (linkedin === null) {
      setLinkedinError("This field is required");
    } else {
      setLinkedinError("");
    }

    if (twitter === null) {
      setTwitterError("This field is required");
    } else {
      setTwitterError("");
    }

    if (facebook === null) {
      setFacebookError("This field is required");
    } else {
      setFacebookError("");
    }

    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formCheck();

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
      setLoading(false);
    }
  };

  return (
    <div>
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
                required
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
                required
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
                required
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

            <h2 style={{ marginBottom: 10, marginTop: 25 }}>Social Accounts</h2>

            <div className={styles.formGroup}>
              <label>Facebook</label>
              <input
                type="text"
                required
                value={facebook === null ? "" : facebook}
                onChange={(e) => setFacebook(e.target.value)}
                style={
                  facebookError === ""
                    ? { borderColor: "#3b82f6" }
                    : { borderColor: "red" }
                }
              />
              <p style={{ color: "red" }}>{facebookError}</p>
            </div>
            <div className={styles.formGroup}>
              <label>Twitter</label>
              <input
                type="text"
                required
                value={twitter === null ? "" : twitter}
                onChange={(e) => setTwitter(e.target.value)}
                style={
                  twitterError === ""
                    ? { borderColor: "#3b82f6" }
                    : { borderColor: "red" }
                }
              />
              <p style={{ color: "red" }}>{twitterError}</p>
            </div>
            <div className={styles.formGroup}>
              <label>LinkedIn</label>
              <input
                type="text"
                required
                value={linkedin === null ? "" : linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                style={
                  linkedinError === ""
                    ? { borderColor: "#3b82f6" }
                    : { borderColor: "red" }
                }
              />
              <p style={{ color: "red" }}>{linkedinError}</p>
            </div>
            <div className={styles.formGroup}>
              <label>YouTube</label>
              <input
                type="text"
                required
                value={youtube === null ? "" : youtube}
                onChange={(e) => setYoutube(e.target.value)}
                style={
                  youtubeError === ""
                    ? { borderColor: "#3b82f6" }
                    : { borderColor: "red" }
                }
              />
              <p style={{ color: "red" }}>{youtubeError}</p>
            </div>
            <div className={styles.formGroup}>
              <label>Instagram</label>
              <input
                type="text"
                required
                value={instagram === null ? "" : instagram}
                onChange={(e) => setInstagram(e.target.value)}
                style={
                  instagramError === ""
                    ? { borderColor: "#3b82f6" }
                    : { borderColor: "red" }
                }
              />
              <p style={{ color: "red" }}>{instagramError}</p>
            </div>
            <div className={styles.formGroup}>
              <label>Tiktok</label>
              <input
                type="text"
                required
                value={tiktok === null ? "" : tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                style={
                  tiktokError === ""
                    ? { borderColor: "#3b82f6" }
                    : { borderColor: "red" }
                }
              />
              <p style={{ color: "red" }}>{tiktokError}</p>
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
              style={{
                display: "flex",
                justifySelf: "center",
              }}
            />

            <p
              style={{
                color: "black",
                fontSize: 24,
                textAlign: "center",
                maxWidth: 400,
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
