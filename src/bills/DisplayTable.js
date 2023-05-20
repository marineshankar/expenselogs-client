import { useHistory } from "react-router-dom";

export function DisplayTable({ date, billNumber, category, payee, amount, comments, id, getBills }) {

    const deleteBill = (id) => {

        const token = localStorage.getItem("x-auth-token");

        if (!token) {
            history.push("/user/login");
        }

        fetch("https://petty-cash-manager-server.herokuapp.com/bills/" + id, {
            method: "DELETE",
            headers: {
                "x-auth-token": token
            }
        }).then(getBills);
    };

    const history = useHistory();

    return (
        <tr>
            <td>{date}</td>
            <td>{billNumber}</td>
            <td>{category}</td>
            <td>{payee}</td>
            <td>{amount}</td>
            <td>{comments}</td>
            <td className="modify" onClick={() => history.push("/bills/" + id)}>✍</td>
            <td className="modify" onClick={() => deleteBill(id)}>❌</td>
        </tr>
    );
}
