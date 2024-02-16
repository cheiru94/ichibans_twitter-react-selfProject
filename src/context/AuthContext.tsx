import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { ReactNode, createContext, useEffect, useState } from "react";

/* 🟡 Interface */
interface AuthProps {
  children: ReactNode;
}

/* 🟡 createContext */
const AuthContext = createContext({
  user: null as User | null, // 기본 값은 null , user의 속성은 User | null
});

/* 🟡 AuthContextProvider  -> index.tsx에서 전체를 감싸준다 : 전역적을 관리하기 위함*/
export const AuthContextProvider = ({ children }: AuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null); // User: 현재 로그인한 유저
  const auth = getAuth(app);

  useEffect(() => {
    // onAuthStateChanged(옵저버) : 사용자의 인증 상태가 변경될 때 호출되며, 사용자가 로그인하거나 로그아웃할 때마다 호출
    onAuthStateChanged(auth, (user) => {
      //  이 함수의 인자로 전달되는 user 값은 현재 인증된 사용자에 대한 정보를 담고 있는 객체
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
