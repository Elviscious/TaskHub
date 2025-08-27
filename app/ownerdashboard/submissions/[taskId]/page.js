"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/app/ownerdashboard/submissions/[taskId]/page.module.css";

// If u don't want to type it manually
// const submissions = Array.from({ length: 40 }, (_, i) => ({
//   id: i + 1,
//   username: "@chemistry",
//   proof: "file.pdf",
//   time: "1 hour ago",
// }));

const submissionsData = {
  1: [
    {
      id: 1,
      username: "@YoungProf",
      proof: "Screenshot.JPEG",
      time: "20 min ago",
    },
    { id: 2, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 3, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 4, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 5, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 6, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 7, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 8, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 9, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 10, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 11, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 12, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 13, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 14, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 15, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 16, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 17, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 18, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 19, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 20, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 21, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 22, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 23, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 24, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 25, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 26, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 27, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 28, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 29, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 30, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 31, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 32, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 33, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 34, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 35, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 36, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 37, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 38, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 39, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 40, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 41, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 42, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
    { id: 43, username: "@YoungProf", proof: "File.pdf", time: "20 min ago" },
  ],
  2: [
    { id: 1, username: "@Bisi", proof: "Proof1.png", time: "2min ago" },
    { id: 2, username: "@Kunle", proof: "Report1.jpg", time: "5min ago" },
    { id: 3, username: "@Salma", proof: "Screenshot1.png", time: "9min ago" },
    { id: 4, username: "@Peter", proof: "Shot1.png", time: "11min ago" },
    { id: 5, username: "@Yusuf", proof: "Img1.png", time: "13min ago" },
    { id: 6, username: "@Deborah", proof: "Upload1.pdf", time: "16min ago" },
    { id: 7, username: "@Chidi", proof: "Work1.png", time: "19min ago" },
    { id: 8, username: "@Rasheed", proof: "Task1.png", time: "21min ago" },
    { id: 9, username: "@Tola", proof: "Result1.jpg", time: "25min ago" },
    { id: 10, username: "@Samson", proof: "Proof2.png", time: "28min ago" },
    { id: 11, username: "@Amina", proof: "Evidence1.png", time: "31min ago" },
    { id: 12, username: "@Victor", proof: "Doc1.docx", time: "34min ago" },
    { id: 13, username: "@Adaeze", proof: "Shot2.png", time: "36min ago" },
    { id: 14, username: "@Kelvin", proof: "Upload2.pdf", time: "38min ago" },
    { id: 15, username: "@Glory", proof: "Result2.png", time: "41min ago" },
    { id: 16, username: "@Micheal", proof: "Img2.png", time: "44min ago" },
    { id: 17, username: "@Peace", proof: "Screenshot2.png", time: "46min ago" },
    { id: 18, username: "@John", proof: "Task2.png", time: "48min ago" },
    { id: 19, username: "@Khadija", proof: "Proof3.png", time: "51min ago" },
    { id: 20, username: "@Opeyemi", proof: "Work2.png", time: "54min ago" },
    { id: 21, username: "@Chiamaka", proof: "Shot3.png", time: "57min ago" },
    { id: 22, username: "@Segun", proof: "Upload3.pdf", time: "59min ago" },
    { id: 23, username: "@Ijeoma", proof: "Doc2.docx", time: "1hr 2min ago" },
    { id: 24, username: "@Habib", proof: "Img3.png", time: "1hr 4min ago" },
    { id: 25, username: "@Stella", proof: "Result3.jpg", time: "1hr 7min ago" },
    {
      id: 26,
      username: "@Olamide",
      proof: "Proof4.png",
      time: "1hr 10min ago",
    },
    { id: 27, username: "@Mercy", proof: "Work3.png", time: "1hr 12min ago" },
    { id: 28, username: "@Tari", proof: "Upload4.pdf", time: "1hr 14min ago" },
    {
      id: 29,
      username: "@Ibrahim",
      proof: "Screenshot3.png",
      time: "1hr 17min ago",
    },
    { id: 30, username: "@Gift", proof: "Doc3.docx", time: "1hr 19min ago" },
    { id: 31, username: "@Ozioma", proof: "Img4.png", time: "1hr 22min ago" },
    { id: 32, username: "@Haruna", proof: "Proof5.png", time: "1hr 24min ago" },
    { id: 33, username: "@Sarah", proof: "Work4.png", time: "1hr 27min ago" },
    { id: 34, username: "@Ovie", proof: "Shot4.png", time: "1hr 29min ago" },
    { id: 35, username: "@Aliyu", proof: "Result4.jpg", time: "1hr 31min ago" },
    { id: 36, username: "@Eunice", proof: "Task3.png", time: "1hr 33min ago" },
    {
      id: 37,
      username: "@Collins",
      proof: "Upload5.pdf",
      time: "1hr 36min ago",
    },
    { id: 38, username: "@Zara", proof: "Img5.png", time: "1hr 38min ago" },
    { id: 39, username: "@Henry", proof: "Proof6.png", time: "1hr 40min ago" },
    { id: 40, username: "@Esther", proof: "Work5.png", time: "1hr 42min ago" },
    {
      id: 41,
      username: "@Gideon",
      proof: "Result5.jpg",
      time: "1hr 45min ago",
    },
    {
      id: 42,
      username: "@Rebecca",
      proof: "Screenshot4.png",
      time: "1hr 48min ago",
    },
    { id: 43, username: "@Adenike", proof: "Doc4.docx", time: "1hr 50min ago" },
    { id: 44, username: "@Mustapha", proof: "Img6.png", time: "1hr 52min ago" },
    { id: 45, username: "@Janet", proof: "Proof7.png", time: "1hr 54min ago" },
    {
      id: 46,
      username: "@Mathew",
      proof: "Upload6.pdf",
      time: "1hr 56min ago",
    },
    { id: 47, username: "@Rose", proof: "Shot5.png", time: "1hr 58min ago" },
    { id: 48, username: "@Farouk", proof: "Work6.png", time: "2hr ago" },
    {
      id: 49,
      username: "@Juliana",
      proof: "Result6.jpg",
      time: "2hr 3min ago",
    },
    { id: 50, username: "@Tope", proof: "Task4.png", time: "2hr 5min ago" },
  ],
  3: [
    {
      id: 1,
      username: "@Ada",
      proof: "Proof1.png",
      time: "3min ago",
    },
    {
      id: 2,
      username: "@Chinedu",
      proof: "Report2.jpg",
      time: "6min ago",
    },
    {
      id: 3,
      username: "@Bola",
      proof: "Screenshot2.png",
      time: "8min ago",
    },
    {
      id: 4,
      username: "@Ngozi",
      proof: "Shot3.png",
      time: "12min ago",
    },
    {
      id: 5,
      username: "@Emeka",
      proof: "Img7.png",
      time: "15min ago",
    },
    {
      id: 6,
      username: "@Fatima",
      proof: "Upload1.pdf",
      time: "18min ago",
    },
    {
      id: 7,
      username: "@Ibrahim",
      proof: "Work.png",
      time: "22min ago",
    },
    {
      id: 8,
      username: "@Seyi",
      proof: "Task.png",
      time: "24min ago",
    },
    {
      id: 9,
      username: "@Grace",
      proof: "Result.jpg",
      time: "27min ago",
    },
    {
      id: 10,
      username: "@Uche",
      proof: "Proof2.png",
      time: "30min ago",
    },
    {
      id: 11,
      username: "@Efe",
      proof: "Evidence.png",
      time: "32min ago",
    },
    {
      id: 12,
      username: "@Amara",
      proof: "Doc5.docx",
      time: "35min ago",
    },
    {
      id: 13,
      username: "@Kelechi",
      proof: "Shot9.png",
      time: "37min ago",
    },
    {
      id: 14,
      username: "@David",
      proof: "Upload3.pdf",
      time: "39min ago",
    },
    {
      id: 15,
      username: "@Ruth",
      proof: "Result2.png",
      time: "42min ago",
    },
    {
      id: 16,
      username: "@Femi",
      proof: "Img11.png",
      time: "45min ago",
    },
    {
      id: 17,
      username: "@Joy",
      proof: "Screenshot3.png",
      time: "47min ago",
    },
    {
      id: 18,
      username: "@Chika",
      proof: "Task2.png",
      time: "50min ago",
    },
    {
      id: 19,
      username: "@Tunde",
      proof: "Proof6.png",
      time: "52min ago",
    },
    {
      id: 20,
      username: "@Zainab",
      proof: "Work2.png",
      time: "55min ago",
    },
    {
      id: 21,
      username: "@Olu",
      proof: "Shot4.png",
      time: "58min ago",
    },
    {
      id: 22,
      username: "@Kemi",
      proof: "Upload7.pdf",
      time: "1hr ago",
    },
    {
      id: 23,
      username: "@Chisom",
      proof: "Doc6.docx",
      time: "1hr 5min ago",
    },
    {
      id: 24,
      username: "@Hassan",
      proof: "Img13.png",
      time: "1hr 8min ago",
    },
    {
      id: 25,
      username: "@Mary",
      proof: "Result3.jpg",
      time: "1hr 10min ago",
    },
    {
      id: 26,
      username: "@Ahmed",
      proof: "Proof7.png",
      time: "1hr 12min ago",
    },
    {
      id: 27,
      username: "@Chinedu",
      proof: "Work3.png",
      time: "1hr 14min ago",
    },
    {
      id: 28,
      username: "@Esther",
      proof: "Upload8.pdf",
      time: "1hr 16min ago",
    },
    {
      id: 29,
      username: "@Joseph",
      proof: "Screenshot4.png",
      time: "1hr 18min ago",
    },
    {
      id: 30,
      username: "@Gloria",
      proof: "Doc7.docx",
      time: "1hr 20min ago",
    },
    {
      id: 31,
      username: "@Daniel",
      proof: "Img14.png",
      time: "1hr 22min ago",
    },
    {
      id: 32,
      username: "@Sarah",
      proof: "Proof8.png",
      time: "1hr 24min ago",
    },
    {
      id: 33,
      username: "@Musa",
      proof: "Work4.png",
      time: "1hr 26min ago",
    },
    {
      id: 34,
      username: "@Precious",
      proof: "Shot6.png",
      time: "1hr 28min ago",
    },
    {
      id: 35,
      username: "@Umar",
      proof: "Result4.jpg",
      time: "1hr 30min ago",
    },
    {
      id: 36,
      username: "@Lilian",
      proof: "Task3.png",
      time: "1hr 32min ago",
    },
    {
      id: 37,
      username: "@Ayo",
      proof: "Upload9.pdf",
      time: "1hr 34min ago",
    },
    {
      id: 38,
      username: "@Ngozi",
      proof: "Img15.png",
      time: "1hr 36min ago",
    },
    {
      id: 39,
      username: "@Collins",
      proof: "Proof9.png",
      time: "1hr 38min ago",
    },
    {
      id: 40,
      username: "@Halima",
      proof: "Work5.png",
      time: "1hr 40min ago",
    },
    {
      id: 41,
      username: "@Emmanuel",
      proof: "Result5.jpg",
      time: "1hr 42min ago",
    },
    {
      id: 42,
      username: "@Juliet",
      proof: "Screenshot5.png",
      time: "1hr 44min ago",
    },
    {
      id: 43,
      username: "@Okon",
      proof: "Doc8.docx",
      time: "1hr 46min ago",
    },
    {
      id: 44,
      username: "@Blessing",
      proof: "Img16.png",
      time: "1hr 48min ago",
    },
    {
      id: 45,
      username: "@Ifeanyi",
      proof: "Proof10.png",
      time: "1hr 50min ago",
    },
    {
      id: 46,
      username: "@Shola",
      proof: "Upload10.pdf",
      time: "1hr 52min ago",
    },
    {
      id: 47,
      username: "@Maryam",
      proof: "Shot7.png",
      time: "1hr 54min ago",
    },
    {
      id: 48,
      username: "@Gbenga",
      proof: "Work6.png",
      time: "1hr 56min ago",
    },
    {
      id: 49,
      username: "@Patience",
      proof: "Result6.jpg",
      time: "1hr 58min ago",
    },
    {
      id: 50,
      username: "@Ola",
      proof: "Task4.png",
      time: "2hr ago",
    },
  ],
  4: [
    { id: 1, username: "@Ekene", proof: "screenshot1.png", time: "5min ago" },
    { id: 2, username: "@Ada", proof: "upload2.jpg", time: "12min ago" },
    { id: 3, username: "@John", proof: "doc3.pdf", time: "20min ago" },
    { id: 4, username: "@Mary", proof: "shot4.png", time: "30min ago" },
    { id: 5, username: "@Chika", proof: "evidence5.png", time: "1hr ago" },
    { id: 6, username: "@Victor", proof: "proof6.jpg", time: "2hr ago" },
    { id: 7, username: "@Grace", proof: "file7.png", time: "3hr ago" },
    { id: 8, username: "@Daniel", proof: "img8.jpg", time: "yesterday" },
    { id: 9, username: "@Amina", proof: "work9.png", time: "2 days ago" },
    { id: 10, username: "@Ifeanyi", proof: "task10.pdf", time: "3 days ago" },
    { id: 11, username: "@Emeka", proof: "file11.png", time: "15min ago" },
    { id: 12, username: "@Sarah", proof: "proof12.jpg", time: "1hr ago" },
    { id: 13, username: "@Paul", proof: "img13.png", time: "2hr ago" },
    { id: 14, username: "@Kemi", proof: "upload14.pdf", time: "yesterday" },
    { id: 15, username: "@Joseph", proof: "work15.jpg", time: "4hr ago" },
    { id: 16, username: "@Ngozi", proof: "doc16.png", time: "30min ago" },
    { id: 17, username: "@David", proof: "evidence17.png", time: "45min ago" },
    { id: 18, username: "@Tunde", proof: "proof18.jpg", time: "10min ago" },
    { id: 19, username: "@Bola", proof: "screenshot19.png", time: "3hr ago" },
    { id: 20, username: "@Helen", proof: "task20.pdf", time: "1hr ago" },
    { id: 21, username: "@Ola", proof: "shot21.png", time: "yesterday" },
    { id: 22, username: "@Femi", proof: "upload22.jpg", time: "2 days ago" },
    { id: 23, username: "@Amaka", proof: "doc23.pdf", time: "1hr ago" },
    { id: 24, username: "@Zainab", proof: "proof24.png", time: "50min ago" },
    { id: 25, username: "@Kunle", proof: "evidence25.png", time: "25min ago" },
    { id: 26, username: "@Chinedu", proof: "img26.jpg", time: "today" },
    { id: 27, username: "@Lola", proof: "work27.png", time: "15min ago" },
    { id: 28, username: "@Moses", proof: "task28.pdf", time: "2hr ago" },
    { id: 29, username: "@Precious", proof: "proof29.png", time: "yesterday" },
    { id: 30, username: "@Henry", proof: "doc30.jpg", time: "3 days ago" },
    { id: 31, username: "@Ruth", proof: "upload31.png", time: "5min ago" },
    { id: 32, username: "@Peter", proof: "file32.jpg", time: "10min ago" },
    { id: 33, username: "@Joy", proof: "screenshot33.png", time: "3hr ago" },
    { id: 34, username: "@Samuel", proof: "img34.png", time: "yesterday" },
    { id: 35, username: "@Blessing", proof: "task35.pdf", time: "40min ago" },
    { id: 36, username: "@Chukwu", proof: "proof36.jpg", time: "12min ago" },
    { id: 37, username: "@Kelvin", proof: "doc37.png", time: "today" },
    { id: 38, username: "@Esther", proof: "upload38.jpg", time: "2 days ago" },
    { id: 39, username: "@Collins", proof: "shot39.png", time: "3hr ago" },
    { id: 40, username: "@Deborah", proof: "proof40.png", time: "30min ago" },
    { id: 41, username: "@Sola", proof: "work41.jpg", time: "yesterday" },
    { id: 42, username: "@Tochi", proof: "task42.pdf", time: "20min ago" },
    { id: 43, username: "@Glory", proof: "screenshot43.png", time: "1hr ago" },
    { id: 44, username: "@Ibrahim", proof: "img44.png", time: "yesterday" },
    { id: 45, username: "@Damilola", proof: "upload45.jpg", time: "2hr ago" },
    { id: 46, username: "@Nkechi", proof: "doc46.png", time: "today" },
    { id: 47, username: "@Raphael", proof: "file47.jpg", time: "3hr ago" },
    { id: 48, username: "@Janet", proof: "evidence48.png", time: "2 days ago" },
    { id: 49, username: "@Chris", proof: "proof49.png", time: "45min ago" },
    { id: 50, username: "@Hope", proof: "task50.pdf", time: "5hr ago" },
  ],
};

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  //   const submissions = submissionsData[taskId] || [];
  const [submissions, setSubmissions] = useState(
    (submissionsData[taskId] || []).map((s) => ({ ...s, status: "pending" }))
  );

  const [openMenuId, setOpenMenuId] = useState(null);
  const [accepted, setAccepted] = useState([]);
  const [declined, setDeclined] = useState([]);

  const toggleMenuId = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleAccept = (taskId, submission) => {
    setAccepted((prev) => [
      ...prev,
      { ...submission, taskId, status: "accepted" },
    ]);
    setSubmissions((prev) => prev.filter((s) => s.id !== submission.id));
  };

  const handleDecline = (taskId, submission) => {
    setDeclined((prev) => [
      ...prev,
      { ...submission, taskId, status: "declined" },
    ]);
    setSubmissions((prev) => prev.filter((s) => s.id !== submission.id));
  };

  useEffect(() => {
    console.log("Accepted updated:", accepted);
  }, [accepted]);
  useEffect(() => {
    console.log("Declined updated:", declined);
  }, [declined]);

  return (
    <div className={styles.container}>
      <h2>Task ID: {taskId}</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeader}>Username</th>
              <th className={styles.tableHeader}>Proof</th>
              <th className={styles.tableHeader}>Submitted</th>
              <th className={styles.tableHeader}>Status</th>
              <th className={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {submissions.map((item) => (
              <tr key={`${taskId}-${item.id}`} className={styles.tableRow}>
                <td className={styles.tableData}>{item.username}</td>
                <td className={styles.tableData}>{item.proof}</td>
                <td className={styles.tableData}>{item.time}</td>
                <td className={styles.tableData}>{item.status}</td>
                <td className={styles.buttonData}>
                  <div style={{ position: "relative" }}>
                    {/* Dots Button */}

                    <Image
                      src="/dots.png"
                      alt="dots"
                      width={20}
                      height={20}
                      onClick={() => toggleMenuId(`${taskId}-${item.id}`)}
                      style={{ cursor: "pointer" }}
                    />

                    {/* Dropdown Menu */}
                    {openMenuId === `${taskId}-${item.id}` && (
                      <div className={styles.menu}>
                        <button
                          className={styles.accept}
                          onClick={() => {
                            handleAccept(taskId, item);
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className={styles.decline}
                          onClick={() => {
                            handleDecline(taskId, item);
                          }}
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3>Accepted</h3>
          {accepted.map((item) => (
            <ul key={`accepted-${item.taskId}-${item.id}`}>
              <li>{item.username}</li>
              <li>{item.proof}</li>
              <li>{item.time}</li>
              <li>{item.status}</li>
            </ul>
          ))}
        </div>
        <div>
          <h3>Declined</h3>
          {declined.map((item) => (
            <ul key={`declined-${item.taskId}-${item.id}`}>
              <li>{item.username}</li>
              <li>{item.proof}</li>
              <li>{item.time}</li>
              <li>{item.status}</li>
            </ul>
          ))}
        </div>
      </div> */}
    </div>
  );
}
