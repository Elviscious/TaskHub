import Navbar from "../components/navbar";
import styles from "./page.module.css"

export default function DashboardLayout({ children }) {
	return (
		<div className={styles.container}>
			<Navbar
				list1="Dashboard"
				list2="Post New Task"
				list3="My Tasks"
				list4="Submissions"
				list5="Wallet"
				src1="/Home.png"
				src2="/plus.png"
				src3="/book.png"
				src4="/folder.png"
				src5="/Wallet.png"
                link1="/ownerdashboard"
                link2="/ownerdashboard/PostJob"
                link3="/ownerdashboard/MyTask"
                link4="/ownerdashboard/submissions"
                link5="/ownerdashboard/wallet"
                link6="/ownerdashboard/settings"
			/>
			<main className={styles.mainContent}>
				{children} {/* This changes when you navigate */}
			</main>
		</div>
	);
}
