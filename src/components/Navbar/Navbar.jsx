import {useEffect} from "react";
// Firebase hooks
import { useAuthState } from "react-firebase-hooks/auth";
// Firebase library
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
// React toastify
import { toast } from "react-toastify";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  //  Auth hook
  const [user] = useAuthState(auth);
  
  // Navigator
  const navigate = useNavigate();

  // useEffect to navigate to dashboard page
  useEffect(()=>{
    if(user)
    {
      navigate("/private/dashboard");
    }
  },[user]);
  


  async function logOut() {
    try {
      await signOut(auth);
      toast.success("logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="Navbar">
      <p className="app-name">Financly.</p>
      {user ? <p onClick={logOut} className="logout-button">Logout</p> : <p>Dashboard</p>}
    </div>
  );
}

export default Navbar;
