import Router from "components/Router";
import { Layout } from "components/Layout";
import { useState, useEffect } from "react";

/* firebase =>  Firebase 인증 서비스의 인증 상태가 변경될 때마다 호출되는 리스너 */
//  onAuthStateChanged() : Firebase 인증 서비스의 인스턴스와 콜백 함수를 인자로 받
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";

/* react-toastify */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/loader/Loader";

function App() {
  // app 인스턴스에 연결된 Firebase 인증 서비스의 인스턴스를 가져와 auth 변수에 저장 : app 변수는 Firebase 앱의 인스턴스를 참조
  const auth = getAuth(app); // 🟡 getAuth () : Firebase 인증 서비스에 접근하기 위한 함수
  console.log("auth: ", auth);

  const [init, setInit] = useState<boolean>(false); // 인증 상태의 변경 유무를 알 수 있음
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser // 현재 사용자의 로그인 상태
  );

  useEffect(() => {
    //user 객체는 현재 로그인한 사용자의 정보
    // -> Firebase 인증 서비스는 이 사용자의 정보를 user 객체에 저장하고, 이를 서버와 브라우저의 로컬 스토리지에도 저장
    onAuthStateChanged(auth, (user) => {
      // 상태 변경을 감지하고 새로운 인증 상태를 처리
      // 인증 상태가 변경될 때마다 실행되는 콜백함수 : 이 콜백 함수는 인자로 현재 로그인한 사용자의 정보를 받습니다
      // onAuthStateChanged 콜백 함수 내에서 auth.currentUser의 상태는 변화한다 -> 유저가 로그인 했냐 안했냐에 따라서
      console.log("현재 로그인한 유저 : ", user?.email);

      if (user) {
        // 유저가 들어있으면
        setIsAuthenticated(true);
      } else {
        // 유저가 없으면
        setIsAuthenticated(false);
      }
      setInit(true); // Firebase 인증 상태 변경 리스너가 최초로 호출되었는지 여부 확인
    });
  }, [auth]);

  return (
    /* Layout으로 Router를 감싸면서 모든 페이지에 적용 */
    <Layout>
      <ToastContainer
        theme="dark" // 테마
        autoClose={1000} // 실행 시간
        hideProgressBar // 진행바 숨기기
        newestOnTop // 가장 최신게 위로
      />

      {/* init이 되었을 경우에만 Router 표시 , isAuthenticated에는 사용자 로그인 유무에 따라 라우터에서 보여주는 내용이 다르다. */}
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </Layout>
  );
}

export default App;
