import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { DisplayTable } from "./DisplayTable";

export function Bills() {
    const [opBal, setOpBal] = useState([]);
    const [bills, setBills] = useState([]);
    const [cloBal, setCloBal] = useState(0);

    const history = useHistory();

    const token = localStorage.getItem("x-auth-token");

    const getOpeningBalance = () => {
        fetch("https://petty-cash-manager-server.herokuapp.com/settings", {
            method: "GET",
            headers: {
                "x-auth-token": token
            }
        })
            .then((data) => data.json())
            .then((op) => {
                console.log(op)
                setOpBal(op[0].opBal);
            });
    };

    const getClosingBalance = async () => {

        const billData = await fetch("https://petty-cash-manager-server.herokuapp.com/bills", {
            method: "GET",
            headers: {
                "x-auth-token": token
            }
        });
        const bls = await billData.json();
        console.log(bls);

        const settingsData = await fetch("https://petty-cash-manager-server.herokuapp.com/settings", {
            method: "GET",
            headers: {
                "x-auth-token": token,
            }
        });

        const op = await settingsData.json();
        const openBalance = op[0].opBal;

        const amount = await bls.filter((bl) => bl.amount);
        let balanceAmount = [];
        for (var index of amount) {
            balanceAmount.push(index.amount);
        }

        let closingAmount = 0;
        for (var i = 0; i < balanceAmount.length; i++) {
            closingAmount += parseInt(balanceAmount[i]);
        }
        const closingBalance = openBalance - closingAmount;
        setCloBal(closingBalance);
    };

    const getBills = () => {

        if (!token) {
            history.push("/user/login");
        }

        fetch("https://petty-cash-manager-server.herokuapp.com/bills", {
            headers: {
                "x-auth-token": token
            }
        })
            .then((data) => data.json())
            .then((bl) => {
                setBills(bl);
                getOpeningBalance();
                getClosingBalance();
            });
    };

    useEffect(getBills, []);

    return (
        <div>
            <header className="header">
                <p>Petty Cash Manager</p>
                <div className="div-header">
                    <Link to="/home">Home</Link>
                    <Link to="/bills/add">Add Bill</Link>
                    <Link to="/settings">Settings</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/logout">Logout</Link>
                </div>
            </header>
            <div className="history-container">
                <h2>Opening Balance : {opBal} </h2>
                <div className="display-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Bill Number</th>
                                <th>Category</th>
                                <th>Payee</th>
                                <th>Amount</th>
                                <th>Comments</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map(
                                (bl) => (<DisplayTable
                                    key={bl._id}
                                    date={bl.date}
                                    billNumber={bl.billNumber}
                                    category={bl.category}
                                    payee={bl.payee}
                                    amount={bl.amount}
                                    comments={bl.comments}
                                    id={bl._id}
                                    getBills={getBills} />))}
                        </tbody>
                    </table>
                </div>
                <h2>Closing Balance :{cloBal} </h2>
            </div>
        </div>
    );
}


