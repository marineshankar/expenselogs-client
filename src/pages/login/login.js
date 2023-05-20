import { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "../../components/form/form";
import styles from "./login.module.css";

export function Login() {

  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const history = useHistory();
  const loginData = [
    { type: "input", label: "Email address", inputType: "text", id: "email", value: login.userName },
    { type: "input", label: "Password", inputType: "password", id: "password", value: login.password },
    { type: "submit", label: "Login", inputType: "submit" }
  ];

  const postLoginData = (event) => {

    event.preventDefault();

    const loginData = {
      email: login.email,
      password: login.password
    }

    fetch("https://expensemanager.onrender.com/user/login", {
      // fetch("http://localhost:4000/user/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then(tok => {

        if (tok.status === "success") {
          localStorage.setItem("x-auth-token", tok.token);
          localStorage.setItem("USERNAME", tok.userName);
          history.push("/")
        }
        else {
          setError(tok.message);
        }
      })

  }

  return (
    <div>
      <h1>Expense Logs</h1>
      <div className={styles.loginContainer}>
        <h3 className={styles.loginHeader}>Login with your credentials to explore...</h3>
        <div className={styles.formContainer}>
          <p className={styles.loginError}>{error ? error : ""}</p>
          <Form
            list={loginData}
            data={login}
            setData={setLogin}
            edit={true}
            handleSubmit={postLoginData}
            setError={setError} />
          <p className={styles.forgotPassword}>Forgot Password ?</p>
        </div>
        <p>Create your own account? <b className={styles.register} onClick={() => history.push("/signup")}>Register here</b></p>
      </div>
    </div>
  );
}