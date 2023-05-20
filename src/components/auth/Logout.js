import { useHistory } from "react-router-dom";

export function Logout() {

    const history = useHistory();
    const logoutFunction = () => {
        localStorage.setItem("x-auth-token", "");
        history.push("/user/login")
    }
    logoutFunction();

    return (<></>);
}