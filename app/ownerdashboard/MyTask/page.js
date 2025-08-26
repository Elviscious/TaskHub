 import styles from './page.module.css';
export default function MyTask(){
 const data = ([
    { id:1, title: "Subscribe to my Youtube Channel", status:"Active" },
    { id:2, title: "Subscribe to my Youtube Channel", status:"Paused" },
    { id:3, title: "Subscribe to my Youtube Channel", status:"Finished" },
    { id:4, title: "Subscribe to my Youtube Channel", status:"Paused" },
    { id:5, title: "Subscribe to my Youtube Channel", status:"Finished" },
    { id:6, title: "Subscribe to my Youtube Channel", status:"Finished" },
     { id: 7, title: "Join my newsletter", status: "Active" },
  { id: 8, title: "Retweet my tweet", status: "Finished" },
  { id: 9, title: "Check out my blog post", status: "Pending" },
  { id: 10, title: "Download my app", status: "Active" },
  { id: 11, title: "Rate my app", status: "Finished" },
  { id: 12, title: "Give feedback on my website", status: "Pending" },
  { id: 13, title: "Watch my tutorial video", status: "Active" },
  { id: 14, title: "Complete the survey", status: "Pending" },
  { id: 15, title: "Follow me on Twitter", status: "Finished" },
  { id: 16, title: "Tag a friend on Instagram", status: "Active" },
  { id: 17, title: "Share my TikTok video", status: "Pending" },
  { id: 18, title: "Post a story about my brand", status: "Finished" },
  { id: 19, title: "Save my Pinterest pin", status: "Active" },
  { id: 20, title: "Like my LinkedIn post", status: "Pending" },
  { id: 21, title: "Subscribe to my podcast", status: "Finished" },
  { id: 22, title: "Check my GitHub repo", status: "Active" },
  { id: 23, title: "Star my project on GitHub", status: "Finished" },
  { id: 24, title: "Read my Medium article", status: "Pending" },
  { id: 25, title: "Join my Telegram group", status: "Active" },
  { id: 26, title: "Support me on Patreon", status: "Pending" },
  { id: 27, title: "Share my YouTube Shorts", status: "Finished" },
  { id: 28, title: "Follow my Spotify playlist", status: "Active" },
  { id: 29, title: "Listen to my new song", status: "Pending" },
  { id: 30, title: "Add my song to your playlist", status: "Finished" },
  { id: 31, title: "Buy my merch", status: "Active" },
  { id: 32, title: "Join my Discord server", status: "Pending" },
  { id: 33, title: "Follow me on TikTok", status: "Finished" },
  { id: 34, title: "Share my Instagram reel", status: "Active" },
  { id: 35, title: "Reply to my tweet", status: "Pending" },
  { id: 36, title: "DM me your feedback", status: "Finished" },

 ]);

  return(
  <div >
    <h1>My Tasks</h1>

      {/* <p style={{color: 'green'}}>my name</p> */}
    <div className={styles.tableContainer}>
      <table className={styles.tableHeader}>
          <thead>
              <tr>
                <th>S/N</th>
                <th>Titles</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
          </thead>
          <tbody>
              {data.map((task) => (
                  <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>{task.title}</td>
                      <td>{task.status}</td>
                      <td className={styles.actBtn}>
                          <button className={styles.imgBtn}>
                              <img src="/book.png" alt="Folder" className={styles.imgIcon} />
                          </button>
                          <button className={styles.imgBtn}>
                              <img src="/pen.png" alt="Edit" className={styles.imgIcon} />
                          </button>
                          </td>
                  </tr>
              ))}
          </tbody>
      </table>
    </div>
  </div>
        
  );




}