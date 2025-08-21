"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/ownerdashboard/page.module.css";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

function Navbar(props) {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
    const pathname = usePathname();

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("navOpen");
		} else {
			document.body.classList.remove("navOpen");
		}
	}, [isOpen]);

	const links = [
		{ href: props.link1, src: props.src1, text: props.list1 },
		{ href: props.link2, src: props.src2, text: props.list2 },
		{ href: props.link3, src: props.src3, text: props.list3 },
		{ href: props.link4, src: props.src4, text: props.list4 },
		{ href: props.link5, src: props.src5, text: props.list5 },
		{
			href: props.link6 || "/dashboard/settings",
			src: "/Setting_alt_line.png",
			text: "Settings",
		},
	];

	return (
		<>
			<div className={`${styles.navigationBar} ${isOpen ? styles.open : ""}`}>
				<nav>
					<h1>MAIN MENU</h1>
					<ul className={styles.navUl}>
						{links.map((link, index) => (
							<li
								key={index}
								className={`${
									pathname === link.href ? styles.active : ""
								}`}
							>
								<Link href={link.href} className={styles.navItem}>
									<Image src={link.src} alt="" width={30} height={30} />
									<p>{link.text}</p>
								</Link>
							</li>
						))}
					</ul>
					<div
						className={styles.logOut}
						onClick={() => {
							document.cookie = "loggedIn=false; path=/; max-age=0";
							router.push("/login");
						}}
					>
						<Image src="/Sign_out_squre.png" alt="" width={30} height={30} />
						<p>Log Out</p>
					</div>
				</nav>
			</div>
			<button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
				<Image
					src={isOpen ? "/Close_round.png" : "/Menu.png"}
					alt="menu toggle"
					width={44}
					height={44}
				/>
			</button>
		</>
	);
}

export default Navbar;
