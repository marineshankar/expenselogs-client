import Nav from "../../components/nav/nav";
import "./home.css";

export function Home() {

  const navItems = ["Bills", "Settings", "Contact", "Logout"];

  return (
    <div>
      <Nav items={navItems} />
      <div className="home-container">
        <div className="home-inner-container">
          <div>
            <img
              className="developer"
              src={require("../../images/developer.jpg")}
              alt="developer"
            />
          </div>
          <div>
            <h2 className="home-container-group">
              India's Smartest Expense Managing Software
            </h2>
            <p className="home-container-group">Online Accounting</p>
            <h4 className="home-container-group home-container-group-h4">
              Smart Accounting Solutions For Indian Businesses
            </h4>
            <p className="home-container-group">
              We understand the issues and challenges faced by business owners
              and their accountants so we designed our software with you in
              mind. With its abundance of features and easy navigation, Petty
              Cash Manager is the smartest Petty Cash Accounting software
              around. From large scale operations to the one man band, Petty
              Cash Manager provides a solution for all business accounting
              needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
