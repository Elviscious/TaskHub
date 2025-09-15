"use client";
import {useState, useEffect, useContext} from "react";
import { getTasks } from "./api/getTasks";
import styles from "./page.module.css"
import { AppContext } from "@/app/context/context";

export default function SubmittedTask() {
  const [filter, setFilter] = useState("All");
  const { baseUrl } = useContext(AppContext);
  const [ data, setData] = useState([]);


    useEffect(() => {
	  const fetchData = async () => {
		const data = await getTasks(baseUrl);
		setData(data);
	  };
	  fetchData();
	}, []);
  
   const filteredData = 
   filter === "All" ? data : data.filter((task) => task.Status === Number(filter));
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
                    <option value="1">Approved</option>
                    <option value="0">Pending</option>
                    <option value="2">Declined</option>
                  </select>
                </span>
					</th>
				</tr>
			</thead>
			<tbody>
				{filteredData.map((task, index) => (
					<tr key={task.Id}>
						<td>{index + 1}</td>
						<td>{task.JobTitle}</td>
						<td>
							{task.Status === 1 && (
							<button className={styles.approved}>Approved</button>
						    )}
							{task.Status === 2 && (
							<button className={styles.declined}>Declined</button>
						    )}
							{task.Status === 0 && (
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
