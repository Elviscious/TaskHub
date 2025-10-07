// context/AppContext.js
"use client";
import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("worker");
  const [profile, setProfile] = useState(false);
  // Base URL for API requests, can be changed based on environment
  const baseUrl = "https://fxdt20jg-7098.uks1.devtunnels.ms";

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
