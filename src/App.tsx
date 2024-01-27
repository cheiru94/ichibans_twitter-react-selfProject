import Router from "components/Router";
import { Layout } from "components/Layout";
import { useState, useEffect } from "react";

/* firebase */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";

/* react-toastify */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // app 인스턴스에 연결된 Firebase 인증 서비스의 인스턴스를 가져와 auth 변수에 저장 : app 변수는 Firebase 앱의 인스턴스를 참조
  const auth = getAuth(app); // 🟡 getAuth () : Firebase 인증 서비스에 접근하기 위한 함수
  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser // currentUser가 있으면 true 없으면 false
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  console.log(auth, isAuthenticated);
  return (
    /* Layout으로 Router를 감싸면서 모든 페이지에 적용 */
    <Layout>
      <ToastContainer />
      {/* 경로 설정 */}
      {init ? <Router isAuthenticated={isAuthenticated} /> : "ロディング"}
    </Layout>
  );
}

export default App;
