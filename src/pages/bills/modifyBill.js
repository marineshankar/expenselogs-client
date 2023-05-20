import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../../components/nav/nav";
import Form from "../../components/form/form";
import "./bills.css";
import styles from "./bills.module.css";


export function ModifyBill() {

  const { id } = useParams();
  const [initialBill, setInitialBill] = useState({ date: "", billNumber: "", category: "", payee: "", amount: "", comments: "" });
  const [bill, setBill] = useState(initialBill);
  const [disable, setDisable] = useState(false);
  const history = useHistory();
  const [editError, setEditError] = useState({ date: "", number: "", category: "", payee: "", amount: "", comments: "" });
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

  const getBill = () => {

    // fetch("https://expensemanager.onrender.com/bills/" + id, {
    fetch(`https://expensemanager.onrender.com/bills/${localStorage.getItem("USERNAME")}/${id}`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token")
      }
    })
      .then((data) => data.json())
      .then((bl) => {
        
        setInitialBill(bl);
        setBill(bl);
      });
  };

  useEffect(getBill, [id]);

  const handleValidation = (value, id) => {
    if (id === "date") {
      if (value === "") setEditError({ ...editError, date: "Field is required!" })
      else setEditError({ ...editError, date: "" })
    }
    else if (id === "category") {
      if (value === "") setEditError({ ...editError, category: "Field is required!" })
      else setEditError({ ...editError, category: "" })
    }
    else if (id === "payee") {
      if (value === "") setEditError({ ...editError, payee: "Field is required!" })
      else setEditError({ ...editError, payee: "" })
    }
    else if (id === "amount") {
      if (value === "") setEditError({ ...editError, amount: "Field is required!" })
      else setEditError({ ...editError, amount: "" })
    }
  }

  const updateBill = (event) => {
    
    event.preventDefault();

    let _error = "";
    if (bill.date === "") _error = { ..._error, date: "Field is required!" }
    if (bill.category === "") _error = { ..._error, category: "Field is required!" }
    if (bill.payee === "") _error = { ..._error, payee: "Field is required!" }
    if (bill.amount === "") _error = { ..._error, amount: "Field is required!" }

    if (_error !== "") {
      setEditError(_error);
      return null;
    }
    if (editError?.date !== "" || editError?.category !== "" || editError?.payee !== "" || editError?.amount !== "") return null;

    const updatedBill = {
      date: bill.date,
      billNumber: bill.billNumber,
      category: bill.category,
      payee: bill.payee,
      amount: bill.amount,
      comments: bill.comments
    };

    // fetch("https://expensemanager.onrender.com/bills/" + bill._id, {
    fetch(`https://expensemanager.onrender.com/bills/${localStorage.getItem("USERNAME")}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedBill),
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

  useEffect(() => {
    let disable = "";
    if (initialBill.date == bill.date && initialBill.billNumber == bill.billNumber &&
      initialBill.category == bill.category && initialBill.payee == bill.payee &&
      initialBill.amount == bill.amount && initialBill.comments == bill.comments) disable = true;
    else disable = false;
    setDisable(disable);
  }, [bill])

  return (<div>
    <Nav items={navItems} />
    <div className={styles.modifyContainer}>
      <h3> Edit Bill </h3>
      <div className={styles.formContainer}>
        <Form
          list={billData}
          data={bill}
          setData={setBill}
          edit={true}
          handleValidation={handleValidation}
          handleSubmit={updateBill}
          handleCancel={handleCancel}
          errorData={editError}
          disable={disable}
        />
      </div>
    </div>
  </div>);
}
