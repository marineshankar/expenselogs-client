import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UpdateBill } from "./UpdateBill";
import { useHistory } from "react-router-dom";

export function EditBill() {
  
  const { id } = useParams();
  const [bill, setBill] = useState("");

  const history = useHistory();

  const billData = () => {

    const token = localStorage.getItem("x-auth-token");

    if (!token) {
      history.push("/user/login")
    }

    fetch("https://petty-cash-manager-server.herokuapp.com/bills/" + id, {
      method: "GET",
      headers: {
        "x-auth-token": token
      }
    })
      .then((data) => data.json())
      .then((bl) => {
        console.log(bl);
        setBill(bl)
      });
  };

  useEffect(billData, [id]);

  return <div>{bill ? <UpdateBill bill={bill} /> : ""}</div>;
}
