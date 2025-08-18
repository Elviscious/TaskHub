// context/AppContext.js
"use client";
import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
	const [email, setEmail] = useState("");
	const baseUrl = "https://fxdt20jg-7098.uks1.devtunnels.ms";

	return (
		<AppContext.Provider
			value={{
				email,
				setEmail,
				baseUrl,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
