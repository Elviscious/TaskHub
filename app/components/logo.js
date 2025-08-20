import Image from "next/image";
import styles from "@/app/homepage/page.module.css";

export default function Logo(props) {
	return (
		<div
			className={styles.logoContainer}
			style={{
				position: "absolute",
				top: "20px",
				left: "20px",
                cursor: "pointer"
			}}
			onClick={() => {
				props.route.push("/");
			}}
		>
			<Image
				src="/Money.svg"
				alt="logo"
				className={styles.logo}
				style={{
					filter: "brightness(100)",
				}}
				width={20}
				height={30}
			/>
			<p
				style={{
					color: "#fff",
					fontSize: 30,
					fontWeight: 600,
					margin: 0,
				}}
			>
				Logo
			</p>
		</div>
	);
}
