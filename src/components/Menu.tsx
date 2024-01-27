import { useNavigate } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

export default function MenuList() {
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
        <button type="button" onClick={() => navigate("/")}>
          <IoIosLogOut className="footer__icon" />
          Logout
        </button>
      </div>
    </div>
  );
}
