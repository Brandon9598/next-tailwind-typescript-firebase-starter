import { useState, useEffect, createContext, useContext } from "react";
import { createFirebaseApp } from "../firebase/clientApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from "../types/User";

export interface IUserContext {
  user: User;
  setUser: (value) => void;
  loadingUser: boolean;
}

export const UserContext = createContext<IUserContext>(null);

export default function UserContextComponent({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const app = createFirebaseApp();
    const auth = getAuth(app);
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = user;
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser({ uid, displayName, email });
        } else setUser(null);
      } catch (error) {
        setUser(null);
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);
