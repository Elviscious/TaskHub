"use client";

import styles from "@/app/workerdashboard/settings/page.module.css";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Settings</h1>

      <div className={styles.settingContent}>
        <div className={styles.content}>
          <h2>Account</h2>
          <p
            onClick={() => router.push("/workerdashboard/settings/profileinfo")}
          >
            Profile information
          </p>
          <p>Password & Security</p>
        </div>
        <div className={styles.content}>
          <h2>Notifications</h2>
          <p>General</p>
        </div>
        <div className={styles.content}>
          <h2>Appearance</h2>
          <p>Font size</p>
        </div>
      </div>
    </div>
  );
}
