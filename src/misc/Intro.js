import { Link } from 'react-router-dom';

function Intro() {
    return (
      <div className="home">
        <h2>Expenses Log App</h2>
        <p>
          Welcome to the petty cash manager.
          <br></br>
          Now you can easily manage your petty cash expenses.
        </p>
        <br></br>
        <h3>
          Now sign up for free.{" "}
          <Link to="user/signup">
            <button>Signup</button>
          </Link>
        </h3>
        <h3>
          If you are already a member, please login here.{" "}
          <Link to="user/login">
            <button> Login</button>
          </Link>
        </h3>
      </div>
    );
  }

  export { Intro };