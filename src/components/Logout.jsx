import { AppContext } from "../App";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Logout() {
  const { logoutUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser();
    toast.success("Logged out");
    navigate("/");
  }, []);

  return null;
}
