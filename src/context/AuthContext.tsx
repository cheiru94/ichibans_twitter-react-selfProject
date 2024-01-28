import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthProps {
  children: ReactNode;
}

// 🟡 createContext
const AuthContext = createContext({
  user: null as User | null,
});

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [auth]);

  return (
    //child에 있는 모든 컴포넌트 들은 useContext(AuthContext)로 user를 확인할 수 있게 된다.
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; // 🟡  createContext를 export하면 다른 컴포넌트에서 import로 사용할 수 있다.
