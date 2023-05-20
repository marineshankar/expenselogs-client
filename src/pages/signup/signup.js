import { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "../../components/form/form";
import Nav from "../../components/nav/nav";
import styles from "./signup.module.css";


export function Signup() {

  const history = useHistory();
  const navItems = ["Home", "Bills", "Contact", "Login"];
  const [error, setError] = useState("");
  const [success, setSucess] = useState("");
  const [signup, setSignup] = useState({ userName: "", email: "", password: "", cPassword: "" });
  const [signupError, setSignupError] = useState({ userName: "", email: "", password: "", cPassword: "" });
  const signupData = [
    { type: "input", label: "User name", inputType: "text", id: "userName", value: signup.userName },
    { type: "input", label: "Email Address", inputType: "text", id: "email", value: signup.email },
    { type: "input", label: "Password", inputType: "password", id: "password", value: signup.password },
    { type: "input", label: "Confirm Password", inputType: "password", id: "cPassword", value: signup.cPassword },
    { type: "submit", label: "Signup", inputType: "submit" }
  ];

  const handleValidation = (value, id) => {
    setError("");
    setSucess("");
    if (id === "userName") {
      if (value === "") setSignupError({ ...signupError, userName: "Field is required!" })
      else if (value.length <= 7) setSignupError({ ...signupError, userName: "Minimum 8 characters required!" });
      else if (value.length >= 20) setSignupError({ ...signupError, userName: "Maximum 20 characters allowed!" })
      else setSignupError({ ...signupError, userName: "" })
    }
    else if (id === "email") {
      if (value === "") setSignupError({ ...signupError, email: "Field is required!" });
      else setSignupError({ ...signupError, email: "" });
    }
    else if (id === "password") {
      if (value.length <= 7) {
        if (signup.cPassword !== value) setSignupError({ ...signupError, password: "Minimum 8 characters required!", cPassword: "Password does not match!" });
        else setSignupError({ ...signupError, password: "Minimum 8 characters required!", cPassword: "" })
      } else if (value.length >= 20) {
        if (signup.cPassword !== value) setSignupError({ ...signupError, password: "Maximum 20 characters allowed!", cPassword: "Password does not match!" });
        else setSignupError({ ...signupError, password: "Maximum 20 characters allowed!", cPassword: "" });
      } else {
        if (signup.cPassword !== value) setSignupError({ ...signupError, password: "", cPassword: "Password does not match!" });
        else setSignupError({ ...signupError, password: "", cPassword: "" })
      }
    }
    else if (id === "cPassword") {
      if (value === "") setSignupError({ ...signupError, cPassword: "Field is required!" });
      else if (signup.password !== value) setSignupError({ ...signupError, cPassword: "Password does not match!" })
      else setSignupError({ ...signupError, cPassword: "" })
    }
  }

  const postSignUpData = (event) => {

    event.preventDefault();
    setError("");
    setSucess("");

    let _error = "";
    if (signup.userName === "") _error = { ..._error, userName: "Field is required!" }
    if (signup.email === "") _error = { ..._error, email: "Field is required!" }
    if (signup.password === "") _error = { ..._error, password: "Field is required!" }
    if (signup.cPassword === "") _error = { ..._error, cPassword: "Field is required!" }
    if (_error !== "") {
      setSignupError(_error);
      return null;
    }
    if (signupError?.userName !== "" || signupError?.email !== "" || signupError?.password !== "" || signupError?.cPassword !== "") return null;

    const postData = {
      userName: signup.userName.toLowerCase(),
      email: signup.email.toLowerCase(),
      password: signup.password,
      cPassword: signup.cPassword
    }

    fetch("https://expensemanager.onrender.com/user/signup", {
      // fetch("http://localhost:4000/user/signup", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((dt) => {
        if (dt.status === "success") {
          setSignup({ userName: "", email: "", password: "", cPassword: "" });
          setSucess(dt.message);
          history.push("/login");
        }
        else setError(dt.message);
      })
  }

  return (
    <div>
      <h1>Expense Logs</h1>
      <div className={styles.loginContainer}>
        <h3 className={styles.loginHeader}>Register here...</h3>
        <p className={styles.signupError}>{error ? error : " "}</p>
        <p className={styles.signupSuccess}>{success ? success : " "}</p>
        <div className={styles.formContainer}>
          <Form
            list={signupData}
            data={signup}
            setData={setSignup}
            edit={true}
            handleSubmit={postSignUpData}
            handleValidation={handleValidation}
            errorData={signupError} />
        </div>
        <p className={styles.loginText}>Already have an account? <b className={styles.login} onClick={() => history.push("/login")}>Login here</b></p>
      </div>
    </div>
  );
}