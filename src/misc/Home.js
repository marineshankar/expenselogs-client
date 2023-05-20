import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export function Home() {

  const history = useHistory();

  const logout = () => {
    localStorage.setItem("x-auth-token", "");
    history.push("/user/login")
  }
  return (
    <div>
      <header className="header">
        <p>Expense Logs</p>
        <div className="div-header">
          <Link to="/settings"><p>Settings</p></Link>
          <Link to="/contact"><p>Contact</p></Link>
          <p onClick={() => logout()}>Logout</p>
        </div>
      </header>
      <div className="home-container">
        <div className="home-inner-container">
          <div>
            <img
              className="developer"
              src={require("../images/developer.jpg")}
              alt="developer"
            />
          </div>
          <div>
            <h2 className="home-container-group">
              India's Smartest Petty Cash Managing Software
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
        <div className="home-bills-container">
          <div>
            <Link to="/bills/add">
              <h2>Add New Bill</h2>
            </Link>
            <Link to="/bills">
              <h2>Bills</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
