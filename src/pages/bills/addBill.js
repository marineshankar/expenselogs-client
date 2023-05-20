import { useState } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../../components/nav/nav";
import Form from "../../components/form/form";
import "./bills.css";
import styles from "./bills.module.css";


export function AddBill() {

  const [bill, setBill] = useState({ date: "", billNumber: "", category: "", payee: "", amount: "", comments: "" });
  const [addError, setAddError] = useState({ date: "", number: "", category: "", payee: "", amount: "", comments: "" });
  const history = useHistory();
  const navItems = ["Home", "Settings", "Bills", "Logout"];
  const billData = [
    { type: "input", label: "Date :", inputType: "date", id: "date", value: bill.date },
    { type: "input", label: "Bill Number :", inputType: "number", id: "billNumber", value: bill.billNumber },
    { type: "input", label: "Category", inputType: "text", id: "category", value: bill.category },
    { type: "input", label: "Payee", inputType: "text", id: "payee", value: bill.payee },
    { type: "input", label: "Amount", inputType: "number", id: "amount", value: bill.amount },
    { type: "input", label: "Comments", inputType: "text", id: "comments", value: bill.comments },
    { type: "submit", label: "SUBMIT", inputType: "submit" },
    { type: "submit", label: "CANCEL", inputType: "submit" }
  ];

  const handleValidation = (value, id) => {
    if (id === "date") {
      if (value === "") setAddError({ ...addError, date: "Field is required!" })
      else setAddError({ ...addError, date: "" })
    }
    else if (id === "category") {
      if (value === "") setAddError({ ...addError, category: "Field is required!" })
      else setAddError({ ...addError, category: "" })
    }
    else if (id === "payee") {
      if (value === "") setAddError({ ...addError, payee: "Field is required!" })
      else setAddError({ ...addError, payee: "" })
    }
    else if (id === "amount") {
      if (value === "") setAddError({ ...addError, amount: "Field is required!" })
      else setAddError({ ...addError, amount: "" })
    }
  }

  const postBill = (event) => {

    event.preventDefault();

    let _error = "";
    if (bill.date === "") _error = { ..._error, date: "Field is required!" }
    if (bill.category === "") _error = { ..._error, category: "Field is required!" }
    if (bill.payee === "") _error = { ..._error, payee: "Field is required!" }
    if (bill.amount === "") _error = { ..._error, amount: "Field is required!" }

    if (_error !== "") {
      setAddError(_error);
      return null;
    }
    if (addError?.date !== "" || addError?.category !== "" || addError?.payee !== "" || addError?.amount !== "") return null;

    const newBill = {
      date: bill.date,
      billNumber: bill.billNumber,
      category: bill.category,
      payee: bill.payee,
      amount: bill.amount,
      comments: bill.comments
    };

    // fetch("https://expensemanager.onrender.com/bills/", {
    fetch(`https://expensemanager.onrender.com/bills/${localStorage.getItem("USERNAME")}`, {
      method: "POST",
      body: JSON.stringify(newBill),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token")
      }
    }).then((response) => response.json())
      .then((data) => {
        
        if (data.status === "Success") history.push("/bills");
      })
  };

  const handleCancel = () => {
    history.push("/bills")
  }

  return (<div>
    <Nav items={navItems} />
    <div className={styles.modifyContainer}>
      <h3> Add Bill </h3>
      <div className={styles.formContainer}>
        <Form
          list={billData}
          data={bill}
          setData={setBill}
          edit={true}
          handleValidation={handleValidation}
          handleSubmit={postBill}
          errorData={addError}
          handleCancel={handleCancel}
        />
      </div>
    </div>
  </div>);
}
