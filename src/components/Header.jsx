import "./Header.css";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";
function Header() {
  const { user } = useContext(AppContext);
  return (
    <div className="header">
      <h1>My Store</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        {user?.email ? (
          <>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
export default Header;
