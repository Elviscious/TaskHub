"use client";
import React, {useContext, useEffect, useState} from "react";
import styles from "@/app/workerdashboard/mytask/page.module.css";
import Link from "next/link";
import { getTasks } from "./lib/getTasks";
import { AppContext } from "@/app/context/context";

export default function MyTask() {
  const { baseUrl } = useContext(AppContext);
  const [availableTask, setAvailableTask] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTasks(baseUrl);
      setAvailableTask(data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 style={{ margin: 0 }}>Available Tasks</h1>

      <div style={{ justifySelf: "right" }}>
        <Link href={`/workerdashboard/mytask/pendingtask`}>
          <button className={styles.button}>View Pending</button>
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th>S/N</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {availableTask.map((task, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableData}>{index + 1}</td>
                <td className={styles.tableTitle}>{task.JobTitle}</td>
                <td className={styles.tableData}>New</td>
                <td className={styles.tableData}>
                  <Link href={`/workerdashboard/mytask/${task.Id}`}>
                    <button className={styles.buttonData}>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
