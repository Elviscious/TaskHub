"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "@/app/ownerdashboard/page.module.css";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { AppContext } from "../context/context";

function Navbar(props) {
  const [dropDown, setdropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const { logOut } = useContext(AppContext);
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

  const isActive = (href) => {
    if (href === "/ownerdashboard" || href === "/workerdashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLogOut = () => {
    logOut();
    router.push("/login");
  };

  return (
    <>
      <div className={`${styles.navigationBar} ${isOpen ? styles.open : ""}`}>
        <nav>
          <h1>MAIN MENU</h1>
          <ul className={styles.navUl}>
            {links.map((link, index) => {
              const shouldBeActive =
                props.name === "worker"
                  ? isActive(link.href)
                  : isActive(link.href) && index !== 1;

              const isOwnerSecondLink = props.name === "owner" && index === 1;
              const isworkerNavbar = props.name === "worker" && index === 3;

              if (isworkerNavbar) return;

              return (
                <li
                  key={index}
                  className={`${shouldBeActive ? styles.active : ""}`}
                  style={{ position: "relative" }}
                  onClick={() =>
                    isOwnerSecondLink ? setdropDown(!dropDown) : null
                  }
                >
                  <Link
                    href={isOwnerSecondLink ? "" : link.href}
                    className={styles.navItem}
                    onClick={() => {
                      if (!isOwnerSecondLink) setIsOpen(false);
                      if (isOwnerSecondLink) setdropDown(!dropDown);
                    }}
                  >
                    <Image src={link.src} alt="" width={30} height={30} />
                    <p>{link.text}</p>
                    {isOwnerSecondLink ? (
                      <Image
                        src="/down.png"
                        alt=""
                        width={15}
                        height={10}
                        style={{
                          position: "absolute",
                          right: "0%",
                          transform: dropDown
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}
                        // onClick={(e) => {
                        // 	e.preventDefault();
                        // 	setdropDown(!dropDown);
                        // }}
                      />
                    ) : null}
                  </Link>
                  {isOwnerSecondLink && dropDown ? (
                    <ul
                      className={styles.dropdown}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Link
                        href="/ownerdashboard/PostJob"
                        className={`${
                          pathname === "/ownerdashboard/PostJob"
                            ? styles.active
                            : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <li>Post Job</li>
                      </Link>
                      <Link
                        href="/ownerdashboard/draft"
                        className={`${
                          pathname === "/ownerdashboard/draft"
                            ? styles.active
                            : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <li>View Draft</li>
                      </Link>
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <div
            className={styles.logOut}
            onClick={() => {
              document.cookie = "loggedIn=false; path=/; max-age=0";
              router.push("/login");
            }}
            // onClick={handleLogOut}
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
