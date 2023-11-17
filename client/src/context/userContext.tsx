import { FC, ReactNode, createContext, useEffect, useState } from "react";

interface UserContextType {
  user: { accessToken: string } | null;
  setUser: (user: { accessToken: string } | null) => void;
}

interface Props {
  children: ReactNode;
  initial?: { accessToken: string } | null;
}

export const UserContext = createContext<UserContextType>({
  setUser: () => {},
  user: null,
});

export const UserContextProvider: FC<Props> = ({ children, initial = null }) => {
  const [user, setUser] = useState<{ accessToken: string } | null>(initial);

  // Load user data from local storage when the component renders
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    const storageChangeHandler = (event: StorageEvent) => {
      if (event.key === "user" && event.newValue) {
        const parsedUser = JSON.parse(event.newValue);
        setUser(parsedUser);
      }
    };

    window.addEventListener("storage", storageChangeHandler);

    return () => {
      window.removeEventListener("storage", storageChangeHandler);
    };
  }, [setUser]);

  // Save user data to local storage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // Remove the user data from local storage when the user logs out
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};