import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "../../components/form/form";
import Nav from "../../components/nav/nav.js";
import "./settings.css";
import styles from "./settings.module.css";

export function Settings() {

  const [setting, setSetting] = useState({});
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  const settingsData = [
    { type: "input", label: "Opening Balance", inputType: "text", id: "opBal", value: setting.opBal },
    { type: "input", label: "Company Name", inputType: "text", id: "cname", value: setting.cname },
    { type: "input", label: "Address", inputType: "text", id: "address", value: setting.address },
    { type: "input", label: "City", inputType: "text", id: "city", value: setting.city },
    { type: "input", label: "Country", inputType: "text", id: "country", value: setting.country },
    { type: "input", label: "Telephone", inputType: "number", id: "telephone", value: setting.telephone },
    { type: "input", label: "Currency", inputType: "text", id: "currency", value: setting.currency },
    { type: "submit", label: !edit ? "EDIT" : "SAVE", inputType: "submit" },
  ];
  const navItems = ["Home", "Bills", "Contact", "Logout"];

  const getSetting = () => {

    // fetch("https://expensemanager.onrender.com/settings", {
    fetch(`https://expensemanager.onrender.com/settings/${localStorage.getItem("USERNAME")}`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token")
      }
    })
      .then((data) => data.json())
      .then((sett) => {
        setSetting(sett);
      })
  };

  useEffect(getSetting, []);

  const putSettings = () => {

    const data = {
      opBal: setting.opBal,
      cname: setting.cname,
      address: setting.address,
      city: setting.city,
      country: setting.country,
      telephone: setting.telephone,
      currency: setting.currency
    };

    // fetch("https://expensemanager.onrender.com/settings/0", {
    fetch(`https://expensemanager.onrender.com/settings/${setting.userName}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token")
      },
    }).then((response) => response.json())
      .then((data) => {
        
        if (data.status === "Success") history.push("/settings");
      })
  }

  const handleEditSubmit = (event) => {
    event.preventDefault();
    if (edit === false) {
      setEdit(true);

    }
    else {
      setEdit(false);
      putSettings();
    }
  }

  const handleCancel = () => setEdit(false);

  return (
    <div>
      <Nav items={navItems} />
      <div className={styles.container}>
        <h3 className={styles.header}>Account Settings</h3>
        <div className={styles.formContainer}>
          <Form
            list={settingsData}
            data={setting}
            setData={setSetting}
            edit={edit}
            setEdit={setEdit}
            handleSubmit={handleEditSubmit}
            handleCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}


