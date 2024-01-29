import { useNavigate } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoLogInSharp } from "react-icons/io5";
import { useContext } from "react";
import AuthContext from "context/AuthContext";

export default function MenuList() {
  const { user } = useContext(AuthContext); // 🟡  useContext로 user받아 쓰기
  console.log("user: ", user);

  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="footer__grid">
        {/* 1. 홈 */}
        <button type="button" onClick={() => navigate("/")}>
          <CiHome className="footer__icon" />
          Home
        </button>

        {/* 2. 프로필 */}
        <button type="button" onClick={() => navigate("/profile")}>
          <CiUser className="footer__icon" /> Profile
        </button>

        {/* 3. 로그인 상태 : user의 유무에 따른 메뉴 로그인 버튼 상태 처리 */}
        {user === null ? (
          // 3.1. 로그인 되어있지 않을 때
          <button type="button" onClick={() => navigate("/users/login")}>
            <IoLogInSharp className="footer__icon" />
            Login
          </button>
        ) : (
          // 3.2. 로그인 되어있을 때
          <button type="button" onClick={() => navigate("/")}>
            <IoIosLogOut className="footer__icon" />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
