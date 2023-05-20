import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../../components/nav/nav";
import "./bills.css";
import EditIcon from "../../images/icons8-edit.svg";
import DeleteIcon from "../../images/icons8-delete.svg";

export function Bills() {

    const navItems = ["Home", "Settings", "Contact", "Logout"];
    const tableHeader = ["Date", "Bill Number", "Category", "Payee", "Amount", "Comments", "", ""];
    const [opBal, setOpBal] = useState(0);
    const [bills, setBills] = useState([]);
    const [cloBal, setCloBal] = useState(0);
    const history = useHistory();
    const token = localStorage.getItem("x-auth-token");

    const getClosingBalance = () => {
        let tempClosingBalance = 0;
        let closingBalance = 0;
        for (let i = 0; i < bills.length; i++) {
            tempClosingBalance += +bills[i].amount;
        }
        closingBalance = opBal - tempClosingBalance;
        setCloBal(closingBalance);
    };

    const getBills = () => {
        // fetch("http://localhost:4000/bills", {
        fetch(`https://expensemanager.onrender.com/bills/${localStorage.getItem("USERNAME")}`, {
            method: "GET",
            headers: {
                "x-auth-token": token
            }
        })
            .then((data) => data.json())
            .then((bl) => setBills(bl))
    };

    const getOpeningBalance = () => {
        // fetch("http://localhost:4000/settings", {
        fetch(`https://expensemanager.onrender.com/settings/${localStorage.getItem("USERNAME")}`, {
            method: "GET",
            headers: {
                "x-auth-token": token
            }
        })
            .then((data) => data.json())
            .then((op) => setOpBal(op.opBal || 0))
            .then(() => getBills())
    };

    useEffect(() => {
        getOpeningBalance();
    }, []);

    useEffect(() => {
        getClosingBalance();
    }, [bills])

    const deleteBill = (event, bl) => {
        event.stopPropagation();

        // fetch(`http://localhost:4000/bills/${localStorage.getItem("USERNAME")}`, {
        fetch(`https://expensemanager.onrender.com/bills/${localStorage.getItem("USERNAME")}/${bl.billNumber}`, {
            method: "DELETE",
            headers: {
                "x-auth-token": token
            }
        }).then(getBills);
    };

    return (
        <div>
            <Nav items={navItems} />
            <div className="bills-container">
                <div className="bills-inner-container">
                    <button className="addButton" onClick={() => history.push("/bills/add/")}>Add New Bill</button>
                    <div className="balance-container">
                        <h2>Opening Balance : {opBal} </h2>
                        <h2>Closing Balance : {cloBal} </h2>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    {tableHeader.map((th, index) => <th key={index}>{th}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {bills.map(
                                    (bl) => (
                                        <tr key={bl._id}>
                                            <td>{bl.date}</td>
                                            <td>{bl.billNumber}</td>
                                            <td>{bl.category}</td>
                                            <td>{bl.payee}</td>
                                            <td>{bl.amount}</td>
                                            <td>{bl.comments}</td>
                                            <td className="modify" onClick={() => history.push("/bills/edit/" + bl.billNumber)}>
                                                <img style={{ cursor: "pointer" }} src={EditIcon} alt="edit" />
                                            </td>
                                            <td className="modify" onClick={(event) => deleteBill(event, bl)}>
                                                <img style={{ cursor: "pointer" }} src={DeleteIcon} alt="delete" />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}


