import { AppContext } from "../App";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Logout() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUser({});
    toast.success("Logged out");
    navigate("/");
  }, []);

  return null;
}
