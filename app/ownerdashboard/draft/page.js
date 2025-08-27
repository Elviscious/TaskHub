"use client";
import { useState } from "react";
import styles from "@/app/ownerdashboard/draft/page.module.css";
export default 
function DraftsTable() {
  const [drafts,setDrafts] = useState([
    { id: 1, title: "Subscribe to my YouTube channel" },
    { id: 2, title: "Subscribe to my YouTube channel" },
    { id: 3, title: "Subscribe to my YouTube channel" },
    { id: 4, title: "Subscribe to my YouTube channel" },
    { id: 5, title: "Subscribe to my YouTube channel" },
    { id: 6, title: "Subscribe to my YouTube channel" },
    { id: 7, title: "Subscribe to my YouTube channel" },
    { id: 8, title: "Subscribe to my YouTube channel" },
    { id: 9, title: "Subscribe to my YouTube channel" },
    { id: 10, title: "Subscribe to my YouTube channel" },
    { id: 11, title: "Subscribe to my YouTube channel" },
    { id: 12, title: "Subscribe to my YouTube channel" },
    { id: 13, title: "Subscribe to my YouTube channel" },
    { id: 14, title: "Subscribe to my YouTube channel" },
  ]);
 const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setDeleteId(id); // show modal
  };

  const handleDeleteConfirmed = () => {
    setDrafts((prev) => prev.filter((draft) => draft.id !== deleteId));
    setDeleteId(null); // close modal
  };
  const handleEdit = () => {
  router.push("/ownerdashboard/PostJob"); 
};


  const handleCancelDelete = () => {
    setDeleteId(null); // close modal without deleting
  };


  
return (
    <div className={styles.draftsContainer}>
      <h2>Drafts</h2>
      <a href="#" className={styles.backIcon}>←Back</a>
                 
    <div className={styles.tableContainer}>
       <table className={styles.draftsTable}>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.draftBody}>
          {drafts.map((draft, index) => (
            <tr key={draft.id}>
              <td>{index + 1}</td>
              <td>{draft.title}</td>
              
              <td className={styles.actionsBtn}>     
         <button className={styles.imgBtn} onClick={() => handleEdit(draft.id)} >
  <img src="/pen.png" alt="edit" className={styles.iconBtn} />
</button>

              <button className={styles.imgBtn} onClick={() => handleDelete(draft.id)}><img src="\waste.png" alt="delete" className={styles.iconBtn}/> </button>
              </td>
            </tr>
          ))}
        </tbody>
    
        </table>
          </div>
    {/* 🔥 Confirmation Modal */}
      {deleteId !== null && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <p>Are you sure you want to delete this task?</p>
            <div className={styles.modalActions}>
              <button onClick={handleDeleteConfirmed} className={styles.deleteBtn}>
                Yes, Delete
              </button>
              <button onClick={handleCancelDelete} className={styles.cancelBtn}>
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

