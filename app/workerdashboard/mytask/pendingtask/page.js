import React from "react";
import styles from "@/app/workerdashboard/mytask/pendingtask/page.module.css";
// import Link from "next/link";
import { getPendingTask } from "../lib/getTasks";

export default async function MyTask() {
  const pendingTask = await getPendingTask();
  return (
    <div className={styles.container}>
      <h1 style={{ margin: 0 }}>Pending Tasks</h1>

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
            {pendingTask.map((task) => (
              <tr key={task.id} className={styles.tableRow}>
                <td className={styles.tableData}>{task.id}</td>
                <td className={styles.tableTitle}>{task.title}</td>
                <td className={styles.tableData}>{task.status}</td>
                <td className={styles.tableData}>
                  <button className={styles.buttonData}>Complete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
