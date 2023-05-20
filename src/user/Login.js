import { useState } from "react";
import { useHistory } from "react-router-dom";

export function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [message, setMessage] = useState("");

  const postLoginData = () => {

    const loginData = {
      email: email,
      password: password
    }

    fetch("https://petty-cash-manager-server.herokuapp.com/user/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then(tok => {
        if (tok.message === "Login Successful") {
          localStorage.setItem("x-auth-token", tok.token)
          history.push("/home")
        }
        else {
          setMessage(tok.message);
        }
      })

  }

  return (
    <div>
      <div className="settings-container">
        <h3 className="settings-header">Welcome Back!</h3>
        <h3>{message ? message : ""}</h3>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="email">Email Address : </label>
            <input name="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email"></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password : </label>
            <input name="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="password"></input>
          </div>
          <div className="form-group-forgot">
            <p className="forgot">Forgot Password?</p>
          </div>
          <button type="submit" className="signup" onClick={() => postLoginData()}>LOG IN</button>
        </div>
      </div>
    </div>
  );
}