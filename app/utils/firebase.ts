import { initializeApp, getApps } from "firebase/app";
import { getFirestore, CollectionReference, collection, DocumentData } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const clientCredentials = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
let firebaseApp;
if (getApps().length === 0) {
	firebaseApp = initializeApp(clientCredentials);
	if (typeof window !== "undefined") {
		// Enable analytics. https://firebase.google.com/docs/analytics/get-started
		if ("measurementId" in clientCredentials) {
			getAnalytics();
		}
	}
}

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const signInWithGoogle = () => {
	return signInWithPopup(auth, provider)
		.then(() => {
			return { loginSucces: true, message: "Logged in successfully" };
		})
		.catch((error) => {
			return { loginSucces: false, message: error.message };
		});
};

// To access firstore directly ->  SOURCE: https://javascript.plainenglish.io/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099

export { auth, signInWithGoogle, onAuthStateChanged };
