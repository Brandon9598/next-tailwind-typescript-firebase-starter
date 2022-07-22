import { initializeApp, getApps } from "firebase/app";
import { getFirestore, CollectionReference, collection, DocumentData } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
export const createFirebaseApp = () => {
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

	if (getApps().length <= 0) {
		const app = initializeApp(clientCredentials);
		// Check that `window` is in scope for the analytics module!
		if (typeof window !== "undefined") {
			// Enable analytics. https://firebase.google.com/docs/analytics/get-started
			if ("measurementId" in clientCredentials) {
				getAnalytics();
			}
		}
		return app;
	}
};

// SOURCE: https://javascript.plainenglish.io/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
// Export firestore incase we need to access it directly
export const firestore = getFirestore();

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(firestore, collectionName) as CollectionReference<T>;
};

import { User } from "../../types/User";

// export all your collections
export const usersCol = createCollection<User>("users");
