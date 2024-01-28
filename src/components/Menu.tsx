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
        <button type="button" onClick={() => navigate("/")}>
          <CiHome className="footer__icon" />
          Home
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <CiUser className="footer__icon" /> Profile
        </button>

        {/* user의 로그인 유무 */}
        {user === null ? (
          // 로그인 되어있지 않을 때
          <button type="button" onClick={() => navigate("/users/login")}>
            <IoLogInSharp className="footer__icon" />
            Login
          </button>
        ) : (
          // 로그인 되어있을 때
          <button type="button" onClick={() => navigate("/")}>
            <IoIosLogOut className="footer__icon" />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
