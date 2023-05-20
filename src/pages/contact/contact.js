import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "../../components/form/form";
import Nav from "../../components/nav/nav";
import "./contact.css";

export function Contact() {

  const navItems = ["Home", "Bills", "Settings", "Logout"];
  const initialContact = { name: "", email: "", subject: "", message: "" };
  const [contact, setContact] = useState(initialContact);
  const [message, setMessage] = useState({ status: "", message: "" });
  const contactsData = [
    { type: "input", label: "Name", inputType: "text", id: "name", value: contact.name },
    { type: "input", label: "Email", inputType: "text", id: "email", value: contact.email },
    { type: "input", label: "Subject", inputType: "text", id: "subject", value: contact.subject },
    { type: "textarea", rows: "6", label: "Message", inputType: "text", id: "message", value: contact.message },
    { type: "submit", label: "Send Message", inputType: "submit" },
  ];
  const history = useHistory();

  const handleContact = (event) => {

    event.preventDefault();

    // fetch(`http://localhost:4000/contact/${localStorage.getItem("USERNAME")}`, {
    fetch(`https://expensemanager.onrender.com/contact/${localStorage.getItem("USERNAME")}`, {
      method: "POST",
      body: JSON.stringify(contact),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token")
      }
    })
      .then((data) => data.json())
      .then((dt) => {
        if (dt.status === "Success") {
          setMessage(dt.message);
          setContact(initialContact)
        }
        else setMessage(dt.message);
      });
  };



  return (
    <div>
      <Nav items={navItems} />
      <div className="contact-container">
        <h1>Contact Form</h1>
        <p className="apiMessage">{message.message ? message.message : ""}</p>
        <div className="contact-inner-container">
          <div className="contact-details" style={{ borderRight: "none", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" }}>
            <h4 style={{ backgroundColor: "white" }}>Get in touch</h4>
            <div className="contact-form-container">
              <Form
                list={contactsData}
                data={contact}
                setData={setContact}
                edit={true}
                handleSubmit={handleContact} />
            </div>
          </div>
          <div className="contact-details" style={{ borderTopRightRadius: "8px", borderBottomRightRadius: "8px" }}>
            <h4 style={{ backgroundColor: "white" }}>Contact us</h4>
            <div className="contact-form-container">
              <label>Address: No 72, Falcon Street, New York NY 10016</label>
              <label>Phone: 1234567890</label>
              <label>Email: xyz@gmail.com</label>
              <label>Website: xyz.com</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
