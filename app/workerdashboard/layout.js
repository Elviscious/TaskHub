import Navbar from "../components/navbar";
import styles from "./page.module.css"

export default function DashboardLayout({ children }) {
    const task = [1,2,3,4]
	return (
		<div className={styles.container}>
			<Navbar
				name="worker"
				list1="Dashboard"
				list2="My Task"
				list3="Submitted Tasks"
				list4="Earning History"
				list5="Wallet"
				src1="/Home.png"
				src2="/book.png"
				src3="/upload.png"
				src4="/Folders_line.png"
				src5="/Wallet.png"
				link1="/workerdashboard"
				link2="/workerdashboard/mytask"
				link3="/workerdashboard/submittedtask"
				link4="/workerdashboard/earninghistory"
				link5="/workerdashboard/wallet"
				link6="/workerdashboard/settings"
			/>
			<main className={styles.mainContent}>
				{children} {/* This changes when you navigate */}
			</main>
		</div>
	);
}
