"use client";
import {useState} from "react";
import { data } from "./data/tasks";
import styles from "./page.module.css"
export default function SubmittedTask() {
  const [filter, setFilter] = useState("All");

   const filteredData = 
   filter === "All" ? data : data.filter((task) => task.status === filter);
	return (
	<div className={styles.container}>
      <h1>Tasks Table</h1>
       
       <div className={styles.tableContainer}>
        <table className={styles.table}>
			<thead>
				<tr>
					<th>S/N</th>
					<th>Title</th>
					<th>
						Status{" "}
                {/* Dropdown arrow image */}
                <span className={styles.dropdownWrapper}>
                  <img
                    src="/arrow-drop.png"
                    alt="filter"
                    className={styles.arrowIcon}
                  />
                  <select
                    className={styles.dropdown}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Declined">Declined</option>
                  </select>
                </span>
					</th>
				</tr>
			</thead>
			<tbody>
				{filteredData.map((task, index) => (
					<tr key={task.id}>
						<td>{index + 1}</td>
						<td>{task.title}</td>
						<td>
							{task.status ==="Approved" && (
							<button className={styles.approved}>Approved</button>
						    )}
							{task.status ==="Declined" && (
							<button className={styles.declined}>Declined</button>
						    )}
							{task.status ==="Pending" && (
							<button className={styles.pending}>Pending</button>
						    )}
						</td>
					</tr>
				))}
			</tbody>
		</table>
						</div>
	</div>
);
}
