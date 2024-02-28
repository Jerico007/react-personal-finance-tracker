import { useState, useRef } from "react";

import "./SignUpLogin.css";

// react-router-dom library
// import { useNavigate } from "react-router-dom";

// Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Auth utils
import verifyCredentials from "../../utils/creadentialutils";

// Firbase library
import { auth, provider,doc,db ,setDoc} from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";


// components
import Input from "../Input/Input";
import Button from "../Button/Button";

// React toastify library
import { toast } from "react-toastify";

function SignUpLogin() {
  // login State
  const [login, setLogin] = useState(false);

  const initial = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Loading state
  const [loading, setLoading] = useState(false);

  // // Navigator
  // const navigate = useNavigate();

  // form state
  const [formData, setFormData] = useState(initial);

  // show Password eye
  const [showPass, setShowPass] = useState(false);
  // useRef to store time interval
  const timerRef = useRef("");

  // Function for showing password
  function handlePasswordShow() {
    if (timerRef.current) {
      setShowPass(false);
      clearTimeout(timerRef.current);
      timerRef.current = "";
      return;
    }

    setShowPass(true);
    timerRef.current = setTimeout(() => {
      setShowPass(false);
      clearInterval(timerRef.current);
      timerRef.current = "";
    }, 2000);
  }

  

  // Function to login with Email
  async function logInWithEmail() {
    if (loading) {
      toast.warn("Please wait!");
      return;
    }
    try {
      setLoading(true);
      await verifyCredentials(formData, login);
    } catch (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      // console.log(userCredential.user);
      setLoading(false);
      setFormData(initial);
      toast.success("Logged in successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }

  // Function to sign Up with email
  async function signUpWithEmail() {
    if (loading) {
      toast.warn("Please wait!");
      return;
    }

    try {
      setLoading(true);
      await verifyCredentials(formData, login);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
     const user = userCredential.user;

     await setDoc(doc(db,"user",user.uid),{
      uid:user.uid,
      name:user.displayName ? user.displayName : formData.name,
      email:user.email,
      photoURL: user.photoURL ? user.photoURL : null,
      createdAt: user.metadata.createdAt
     })

      toast.success("User created successfully");
      setLoading(false);
      setFormData(initial);
      setLogin(!login);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }

  // Function to singup with google
  async function singUpGoogle() {
    if (loading) {
      toast.warn("Please wait!");
      return;
    }
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      await setDoc(doc(db,"user",user.uid),{
       uid:user.uid,
       name:user.displayName ? user.displayName : formData.name,
       email:user.email,
       photoURL: user.photoURL ? user.photoURL : null,
       createdAt: user.metadata.createdAt
      })
      toast.success("User signed in successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Function to handle form submit
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="form-wrapper">
      <form className="main-form" onSubmit={handleSubmit}>
        <p>
          {!login ? "Signup On" : "Login On"}{" "}
          <span style={{ color: "var(--theame)" }}>Financely.</span>
        </p>
        {!login ? (
          <Input
            label={"Full Name"}
            id={"name"}
            type={"text"}
            value={formData.name}
            onInput={(e) => {
              setFormData((prev) => ({ ...prev, name: e.target.value }));
            }}
            placeholder={"Enter Full Name"}
          />
        ) : (
          <></>
        )}
        <Input
          label={"Email"}
          id={"email"}
          type={"email"}
          placeholder={"xyz@gmail.com"}
          value={formData.email}
          onInput={(e) => {
            setFormData((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <div className="password-box">
          <Input
            label={"Password"}
            id={"password"}
            type={showPass ? "text" : "password"}
            placeholder={"Your Password"}
            value={formData.password}
            onInput={(e) => {
              setFormData((prev) => ({ ...prev, password: e.target.value }));
            }}
            minLength={6}
          ></Input>
          <FontAwesomeIcon
            onClick={handlePasswordShow}
            cursor={"pointer"}
            icon={showPass ? faEye : faEyeSlash}
            color="grey"
            className="eyes"
          />
        </div>

        {!login ? (
          <Input
            label={"Confirm Password"}
            id={"confirmPassword"}
            type={showPass ? "text" : "password"}
            placeholder={"Confirm Password"}
            value={formData.confirmPassword}
            onInput={(e) => {
              setFormData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }));
            }}
            minLength={6}
          />
        ) : (
          <></>
        )}

        <Button
          onClick={!login ? signUpWithEmail : logInWithEmail}
          text={
            !login
              ? loading
                ? "L O A D I N G . . ."
                : "Signup With Email"
              : loading
              ? "L O A D I N G . . ."
              : "Login With Email"
          }
          backgroundColor={"var(--white)"}
          color={"var(--theame)"}
          borderColor={"var(--theame)"}
        />
        <p style={{ textAlign: "center" }}>or</p>
        <Button
          onClick={singUpGoogle}
          text={!login ? "Signup With Google" : "Login With Google"}
          backgroundColor={"var(--theame)"}
          color={"var(--white)"}
          borderColor={"var(--theame)"}
        />
        <p style={{ textAlign: "center" }}>
          {!login ? "Already have an account?" : "Don't have an account"}{" "}
          <span
            onClick={() => {
              setLogin(!login);
            }}
            style={{
              color: "var(--theame)",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            {!login ? "Login" : "Signup"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUpLogin;
