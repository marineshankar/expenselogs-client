import { Link } from "react-router-dom";

export function Contact() {
  return (
    <div>
      <header className="header">
        <p>Petty Cash Manager</p>
        <div className="div-header">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/settings">
            <p>Settings</p>
          </Link>
          <Link to="/logout">
            <p>Logout</p>
          </Link>
        </div>
      </header>
      <div className="contact-container">
        <h1>Contact Form</h1>
        <div className="contact-inner-container">
          <div className="contact-fill-details">
            <h4>Get in touch</h4>
            <div className="contact-input-group">
              <input className="contact-input" placeholder="Name"></input>
              <input className="contact-input" placeholder="Email"></input>
              <input className="contact-input" placeholder="Subject"></input>
              <input className="contact-input" placeholder="Message"></input>
              <button className="submit">Send Message</button>
            </div>
          </div>
          <div className="contact-check-details">
            <h4>Contact us</h4>
            <div className="contact-label-group">
              <label className="contact-label">
                Address: No 72, Falcon Street, New York NY 10016
              </label>
              <label className="contact-label">Phone: 1234567890</label>
              <label className="contact-label">Email: xyz@gmail.com</label>
              <label className="contact-label">Website: xyz.com</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
