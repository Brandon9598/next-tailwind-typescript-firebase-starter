import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<React.Fragment>
			<Navbar />
			<Component {...pageProps} />
		</React.Fragment>
	);
}

export default MyApp;
