import { useNavigate } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoLogInSharp } from "react-icons/io5";
import { MdOutlineSearch } from "react-icons/md";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth"; // 로그아웃
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import { IoMdNotificationsOutline } from "react-icons/io";
import useTranslation from "hooks/useTranslation";

export default function MenuList() {
  const { user } = useContext(AuthContext); // 🟡  useContext로 user받아 쓰기
  const navigate = useNavigate();
  const t = useTranslation();

  return (
    <div className="footer">
      <div className="footer__grid">
        {/* 1. 홈 */}
        <button type="button" onClick={() => navigate("/")}>
          <CiHome className="footer__icon" />
          {t("MENU_HOME")}
        </button>

        {/* 2. 프로필 */}
        <button type="button" onClick={() => navigate("/profile")}>
          <CiUser className="footer__icon" /> {t("MENU_PROFILE")}
        </button>

        {/* 3. 찾기 */}
        <button type="button" onClick={() => navigate("/search")}>
          <MdOutlineSearch className="footer__icon" /> {t("MENU_SEARCH")}
        </button>

        {/* 알림기능 */}
        <button type="button" onClick={() => navigate("/notifications")}>
          <IoMdNotificationsOutline className="footer__icon" /> {t("MENU_NOTI")}
        </button>

        {/* 4. 로그인 상태 : user의 유무에 따른 메뉴 로그인 버튼 상태 처리 */}
        {user === null ? (
          // 4.1. Login 표시
          <button type="button" onClick={() => navigate("/users/login")}>
            <IoLogInSharp className="footer__icon" />
            {t("MENU_LOGIN")}
          </button>
        ) : (
          // 4.2. Logout 표시　 : 로그 아웃처리
          <button
            type="button"
            onClick={async () => {
              const auth = getAuth(app);
              await signOut(auth);
              toast.success("ログアウトされました！");
            }}
          >
            <IoIosLogOut className="footer__icon" />
            {t("MENU_LOGOUT")}
          </button>
        )}
      </div>
    </div>
  );
}
