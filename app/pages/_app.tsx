import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Navbar from "../components/Navbar";
import UserProvider from "../context/userContext";
import axios from "axios";

// Axios
axios.defaults.baseURL = process.env.NEXT_PUBLIC_FIREBASE_API_URL;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<Navbar />
			<Component {...pageProps} />
		</UserProvider>
	);
}

export default MyApp;
