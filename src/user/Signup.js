import { useState } from "react";
import { useHistory } from "react-router-dom";


export function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const postUserData = () => {

    const postData = {
      email: email,
      password: password
    }

    fetch("https://petty-cash-manager-server.herokuapp.com/user/signup", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        console.log(postData);
        history.push("/user/login")
      })
  }

  return (
    <div className="settings-container">
      <h3 className="settings-header">Sign Up for Free</h3>
      <div className="form-container">

        <div className="form-group">
          <label htmlFor="email">Email Address : </label>
          <input name="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email"></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password : </label>
          <input name="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="password"></input>
        </div>
        <button className="signup" onClick={() => postUserData()}>GET STARTED</button>
      </div>
    </div>
  );
}