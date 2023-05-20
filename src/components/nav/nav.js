import { Link, useHistory } from "react-router-dom";
import styles from "./nav.module.css";

export default function Nav(props) {

    const { items } = props;
    const history = useHistory();

    const logout = () => {
        localStorage.setItem("x-auth-token", "");
        localStorage.setItem("username", "");
        history.push("/login")
    }

    return (
        <header className={styles.header}>
            <h3 className={styles.headerName}>Expense Logs</h3>
            <div className={styles.headerItems}>
                {items.map((i, index) => {
                    if (i === "Logout") {
                        return (<Link className={styles.headerLinks} key={index} onClick={() => logout()} to={"/login"}>{i}</Link>);
                    }
                    else if (i === "Home") {
                        return (<Link className={styles.headerLinks} key={index} to={`/`}>{i}</Link>)
                    }
                    else {
                        return (<Link key={index} className={styles.headerLinks} to={`/${i.toLowerCase()}`}>{i}</Link>);
                    }
                })}
            </div>
        </header>
    )
}