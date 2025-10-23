// context/AppContext.js
"use client";
import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("worker");
  const [profile, setProfile] = useState(false);
  const [fundWallet, setFundWallet] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [token, setToken] = useState("");
  // Base URL for API requests, can be changed based on environment
  const baseUrl = "https://fxdt20jg-7098.uks1.devtunnels.ms";
  const payStackKey = "pk_test_d92b377495b5cad6b95b209b463a988d39f89305";

  //   Restore the token on page load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        const newToken = event.newValue;
        if (newToken) {
          setToken(newToken);
          setLoggedIn(true);
        } else {
          setToken("");
          setLoggedIn(false);
        }
      }

      // if (event.key === "logout") {
      //   setToken("");
      //   setLoggedIn(false);
      // }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Save token to localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const fetchWalletBalance = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${baseUrl}/api/MainServices/Dashboard`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setWalletBalance(data.WalletBalance);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setLoggedIn(false);
    setProfile(false);
    setFundWallet(false);
    setEmail("");
  };

  return (
    <AppContext.Provider
      value={{
        email,
        setEmail,
        baseUrl,
        loggedIn,
        setLoggedIn,
        setSelectedRadio,
        selectedRadio,
        profile,
        setProfile,
        fundWallet,
        setFundWallet,
        token,
        setToken,
        logOut,
        walletBalance,
        setWalletBalance,
        fetchWalletBalance,
        payStackKey,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
