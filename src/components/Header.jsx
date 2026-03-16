import "./Header.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="header">
      <h1>My Store</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
}
export default Header;
