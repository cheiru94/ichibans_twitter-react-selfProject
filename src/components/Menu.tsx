import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
export default function MenuList() {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer__grid">
        <button type="button" onClick={() => navigate("/")}>
          <FaHome />
          Home
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <FaRegUserCircle /> Profile
        </button>
        <button type="button" onClick={() => navigate("/")}>
          <AiOutlineLogout />
          Logout
        </button>
      </div>
    </div>
  );
}
