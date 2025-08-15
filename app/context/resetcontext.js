// context/AppContext.js
"use client";
import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
	const [email, setEmail] = useState("");

	return (
		<AppContext.Provider
			value={{
				email,
				setEmail,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
