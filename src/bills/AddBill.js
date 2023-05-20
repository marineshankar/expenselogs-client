import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export function AddBill() {

  const history = useHistory();

  const [date, setDate] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [category, setCategory] = useState("");
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [comments, setComments] = useState("");

  const addBill = () => {

    const token = localStorage.getItem("x-auth-token");

    if (!token) {
      history.push("/user/login")
    }

    const newBill = {
      date: date,
      billNumber: billNumber,
      category: category,
      payee: payee,
      amount: amount,
      comments: comments,
    };

    fetch("https://petty-cash-manager-server.herokuapp.com/bills", {
      method: "POST",
      body: JSON.stringify(newBill),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      },
    }).then(() => history.push("/bills"));
  };

  return (
    <div className="body-container">
      <header className="header">
        <p>Petty Cash Manager</p>
        <div className="div-header">
          <Link to="/home">Home</Link>
          <Link to="/bills">Bills</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </header>
      <div className="addbill-container">
        <h2> Bill </h2>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="date">Date : </label>
            <input name="date" type="date" className="form-control" value={date} onChange={(event) => setDate(event.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="bnum">Bill Number : </label>
            <input name="bnum" className="form-control" value={billNumber} onChange={(event) => setBillNumber(event.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category : </label>
            <input name="category" className="form-control" value={category} onChange={(event) => setCategory(event.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="payee">Payee : </label>
            <input name="payee" className="form-control" value={payee} onChange={(event) => setPayee(event.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount : </label>
            <input name="amount" className="form-control" value={amount} onChange={(event) => setAmount(event.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="comments">Comment : </label>
            <input name="comments" className="form-control" value={comments} onChange={(event) => setComments(event.target.value)}></input>
          </div>
          <button className="submit" onClick={() => { addBill(); }}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}
