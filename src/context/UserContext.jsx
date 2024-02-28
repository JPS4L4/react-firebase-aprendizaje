import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { auth } from "../config/firebase";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    console.log("Use effect en acción");
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
    });
    return unsuscribe;
  }, []);

  if (user === false) return <p>Loading App...</p>;

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
