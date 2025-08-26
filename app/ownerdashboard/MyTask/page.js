
"use client";
import { useState } from 'react';
 import styles from './page.module.css';
export default function MyTask(){
  const [selectedTask, setSelectedTask] = useState(null);


 const data = ([
  {
    id: 1,
    title: "Follow my YouTube channel",
    platform: "YouTube",
    instructions: "Click follow on my channel to stay updated with new videos.",
    requiredProof: "screenshot",
    link: "https://youtube.com/mychannel",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 2,
    title: "Like my Instagram post",
    platform: "Instagram",
    instructions: "Open my latest Instagram post and hit the like button.",
    requiredProof: "screenshot",
    link: "https://instagram.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 3,
    title: "Retweet my tweet",
    platform: "Twitter",
    instructions: "Go to my Twitter profile and retweet the pinned tweet.",
    requiredProof: "link",
    link: "https://twitter.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 4,
    title: "Comment on my Facebook post",
    platform: "Facebook",
    instructions: "Write a positive comment under my recent Facebook post.",
    requiredProof: "screenshot",
    link: "https://facebook.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 5,
    title: "Subscribe to my YouTube channel",
    platform: "YouTube",
    instructions: "Click subscribe on my channel and turn on notifications.",
    requiredProof: "screenshot",
    link: "https://youtube.com/mychannel",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 6,
    title: "Follow my TikTok account",
    platform: "TikTok",
    instructions: "Go to my TikTok profile and hit the follow button.",
    requiredProof: "screenshot",
    link: "https://tiktok.com/@myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 7,
    title: "Share my LinkedIn post",
    platform: "LinkedIn",
    instructions: "Repost my latest LinkedIn article to your feed.",
    requiredProof: "link",
    link: "https://linkedin.com/in/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 8,
    title: "Join my Discord server",
    platform: "Discord",
    instructions: "Accept the invite link and join my Discord server.",
    requiredProof: "link",
    link: "https://discord.gg/myserver",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 9,
    title: "Pin my Pinterest pin",
    platform: "Pinterest",
    instructions: "Save my pin to your board on Pinterest.",
    requiredProof: "screenshot",
    link: "https://pinterest.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 10,
    title: "Follow my Reddit account",
    platform: "Reddit",
    instructions: "Follow me on Reddit to see my latest posts.",
    requiredProof: "link",
    link: "https://reddit.com/user/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 11,
    title: "Like my TikTok video",
    platform: "TikTok",
    instructions: "Go to my latest TikTok video and hit like.",
    requiredProof: "screenshot",
    link: "https://tiktok.com/@myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 12,
    title: "Comment on my Instagram post",
    platform: "Instagram",
    instructions: "Leave a nice comment under my most recent post.",
    requiredProof: "screenshot",
    link: "https://instagram.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 13,
    title: "Follow my Twitch channel",
    platform: "Twitch",
    instructions: "Go to my Twitch profile and click follow.",
    requiredProof: "screenshot",
    link: "https://twitch.tv/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 14,
    title: "Share my Facebook post",
    platform: "Facebook",
    instructions: "Click share on my latest Facebook post.",
    requiredProof: "screenshot",
    link: "https://facebook.com/myprofile",
    budget: 5,
    noOfWorkers: 100,
  },
  {
    id: 15,
    title: "Subscribe to my newsletter",
    platform: "Email",
    instructions: "Enter your email and subscribe to my newsletter.",
    requiredProof: "link",
    link: "https://mywebsite.com/newsletter",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 16,
    title: "Like my YouTube video",
    platform: "YouTube",
    instructions: "Open my video and click the thumbs-up button.",
    requiredProof: "screenshot",
    link: "https://youtube.com/mychannel",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 17,
    title: "Join my Telegram group",
    platform: "Telegram",
    instructions: "Click join to become a member of my Telegram group.",
    requiredProof: "link",
    link: "https://t.me/mygroup",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 18,
    title: "Follow my Snapchat",
    platform: "Snapchat",
    instructions: "Add my Snapchat username to follow me.",
    requiredProof: "screenshot",
    link: "https://snapchat.com/add/myusername",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 19,
    title: "Like my Reddit post",
    platform: "Reddit",
    instructions: "Upvote my latest Reddit submission.",
    requiredProof: "screenshot",
    link: "https://reddit.com/user/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 20,
    title: "Share my TikTok video",
    platform: "TikTok",
    instructions: "Click share on my recent TikTok video.",
    requiredProof: "screenshot",
    link: "https://tiktok.com/@myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 21,
    title: "Follow my LinkedIn profile",
    platform: "LinkedIn",
    instructions: "Go to my LinkedIn page and click follow.",
    requiredProof: "screenshot",
    link: "https://linkedin.com/in/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 22,
    title: "Comment on my YouTube video",
    platform: "YouTube",
    instructions: "Leave a comment under my latest video.",
    requiredProof: "screenshot",
    link: "https://youtube.com/mychannel",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 23,
    title: "Follow my Twitter account",
    platform: "Twitter",
    instructions: "Click follow on my Twitter profile.",
    requiredProof: "screenshot",
    link: "https://twitter.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 24,
    title: "Repost my Instagram story",
    platform: "Instagram",
    instructions: "Share my story to your own story feed.",
    requiredProof: "screenshot",
    link: "https://instagram.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 25,
    title: "Join my WhatsApp group",
    platform: "WhatsApp",
    instructions: "Accept the invitation link and join my WhatsApp group.",
    requiredProof: "link",
    link: "https://chat.whatsapp.com/mygroup",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 26,
    title: "Like my LinkedIn post",
    platform: "LinkedIn",
    instructions: "Hit the like button on my recent LinkedIn post.",
    requiredProof: "screenshot",
    link: "https://linkedin.com/in/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 27,
    title: "Follow my Quora profile",
    platform: "Quora",
    instructions: "Go to my Quora profile and follow me.",
    requiredProof: "screenshot",
    link: "https://quora.com/profile/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 28,
    title: "Answer my Quora question",
    platform: "Quora",
    instructions: "Submit an answer to the question I posted.",
    requiredProof: "link",
    link: "https://quora.com/profile/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 29,
    title: "Follow my Medium blog",
    platform: "Medium",
    instructions: "Click follow on my Medium blog to get updates.",
    requiredProof: "screenshot",
    link: "https://medium.com/@myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 30,
    title: "Clap for my Medium article",
    platform: "Medium",
    instructions: "Give claps to my latest Medium story.",
    requiredProof: "screenshot",
    link: "https://medium.com/@myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 31,
    title: "Like my Facebook page",
    platform: "Facebook",
    instructions: "Click like on my official Facebook page.",
    requiredProof: "screenshot",
    link: "https://facebook.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 32,
    title: "Share my Reddit post",
    platform: "Reddit",
    instructions: "Crosspost my content to another subreddit.",
    requiredProof: "link",
    link: "https://reddit.com/user/myprofile",
    budget: 5,
    numberofWorkers: 100,
  },
  {
    id: 33,
    title: "Like my TikTok comment",
    platform: "TikTok",
    instructions: "Like the top comment I made on my TikTok video.",
    requiredProof: "screenshot",
    link: "https://tiktok.com/@myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 34,
    title: "Subscribe to my Twitch channel",
    platform: "Twitch",
    instructions: "Subscribe to my Twitch channel for exclusive content.",
    requiredProof: "screenshot",
    link: "https://twitch.tv/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 35,
    title: "Follow my GitHub account",
    platform: "GitHub",
    instructions: "Click follow on my GitHub profile.",
    requiredProof: "screenshot",
    link: "https://github.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 36,
    title: "Star my GitHub repository",
    platform: "GitHub",
    instructions: "Click star on my featured repository.",
    requiredProof: "screenshot",
    link: "https://github.com/myprofile/repo",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 37,
    title: "Fork my GitHub repo",
    platform: "GitHub",
    instructions: "Fork my main project repo.",
    requiredProof: "link",
    link: "https://github.com/myprofile/repo",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 38,
    title: "Watch my GitHub repo",
    platform: "GitHub",
    instructions: "Enable notifications by watching my repository.",
    requiredProof: "screenshot",
    link: "https://github.com/myprofile/repo",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 39,
    title: "Follow my Spotify playlist",
    platform: "Spotify",
    instructions: "Open my playlist and click follow.",
    requiredProof: "screenshot",
    link: "https://spotify.com/myplaylist",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 40,
    title: "Like my Spotify song",
    platform: "Spotify",
    instructions: "Add my track to your liked songs on Spotify.",
    requiredProof: "screenshot",
    link: "https://spotify.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 41,
    title: "Join my Clubhouse room",
    platform: "Clubhouse",
    instructions: "Accept the invite and join my Clubhouse session.",
    requiredProof: "link",
    link: "https://clubhouse.com/myroom",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 42,
    title: "Follow my SoundCloud",
    platform: "SoundCloud",
    instructions: "Go to my SoundCloud profile and hit follow.",
    requiredProof: "screenshot",
    link: "https://soundcloud.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 43,
    title: "Like my SoundCloud track",
    platform: "SoundCloud",
    instructions: "Click like on my latest track.",
    requiredProof: "screenshot",
    link: "https://soundcloud.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 44,
    title: "Repost my SoundCloud track",
    platform: "SoundCloud",
    instructions: "Click repost to share my track.",
    requiredProof: "screenshot",
    link: "https://soundcloud.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 45,
    title: "Follow my Tumblr blog",
    platform: "Tumblr",
    instructions: "Click follow on my Tumblr page.",
    requiredProof: "screenshot",
    link: "https://tumblr.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 46,
    title: "Reblog my Tumblr post",
    platform: "Tumblr",
    instructions: "Click reblog on my recent Tumblr post.",
    requiredProof: "screenshot",
    link: "https://tumblr.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 47,
    title: "Like my Tumblr post",
    platform: "Tumblr",
    instructions: "Click like on my latest Tumblr entry.",
    requiredProof: "screenshot",
    link: "https://tumblr.com/myprofile",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 48,
    title: "Follow my Blogger site",
    platform: "Blogger",
    instructions: "Click follow on my Blogger profile.",
    requiredProof: "screenshot",
    link: "https://myblog.blogspot.com",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 49,
    title: "Comment on my Blogger post",
    platform: "Blogger",
    instructions: "Leave a comment on my latest blog post.",
    requiredProof: "screenshot",
    link: "https://myblog.blogspot.com",
    budget: 5,
    numberOfWorkers: 100,
  },
  {
    id: 50,
    title: "Share my Blogger article",
    platform: "Blogger",
    instructions: "Click share to distribute my blog post.",
    requiredProof: "link",
    link: "https://myblog.blogspot.com",
    budget: 5,
    numberOfWorkers: 100,
  }
]);

  return(
  <div className={styles.container}>
    <h1>My Tasks</h1>

      {/* <p style={{color: 'green'}}>my name</p> */}
    <div className={styles.tableContainer}>
      <table className={styles.tableHeader}>
          <thead>
              <tr>
                <th>S/N</th>
                <th>Titles</th>
                {/* <th>Status</th> */}
                <th>Action</th>
              </tr>
          </thead>
          <tbody>
              {data.map((task) => (
                  <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>{task.title}</td>
                      {/* <td>{task.status}</td> */}
                      <td className={styles.actBtn}>
                          <button className={styles.imgBtn}
                            onClick={() => setSelectedTask(task)}>
                              <img src="/book.png" alt="Folder" className={styles.imgIcon} />
                          </button>
                          {/* <button className={styles.imgBtn}>
                              <img src="/pen.png" alt="Edit" className={styles.imgIcon} />
                          </button> */}
                          </td>
                  </tr>
              ))}
          </tbody>
      </table>
    </div>
        

 {selectedTask && (
   <div className={styles.popupOverlay} onClick={() => setSelectedTask(null)}>
          <div className={styles.popupMenu} onClick={(e) => e.stopPropagation()}>
            <p><strong>Title:</strong> {selectedTask.title}</p>
            <p><strong>Platform:</strong> {selectedTask.platform}</p>
            <p><strong>Instructions:</strong> {selectedTask.instructions}</p>
            <p><strong>Required Proof:</strong> {selectedTask.requiredProof}</p>
            <p><strong>Link:</strong> <a href={selectedTask.link} target="_blank">Open</a></p>
            <p><strong>Budget:</strong> ${selectedTask.budget}</p>
            <p><strong>Workers:</strong> {selectedTask.numberOfWorkers}</p>

            <button className={styles.closeBtn} onClick={() => setSelectedTask(null)}>
              Close
            </button>
          </div>
        </div>
      )}
  
      </div>


  );




}