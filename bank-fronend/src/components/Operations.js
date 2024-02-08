import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Operations.css";
import { TextField } from "@mui/material";

export default function Operations(props) {
  const [amount, setAmount] = useState(0);
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");
  // const [trans,setTrans] = useState([])
  const navigate = useNavigate();

  const handleDeposit = async (e) => {
    // const moneyAmount = e === "deposit" ? amount : -amount;

    try {
      await axios.post("http://localhost:8181/transactions", {
        amount: amount,
        vendor: vendor,
        category: category,
      });
    } catch (error) {
      console.error("Error depositing:", error);
    }
    setAmount("");
    setVendor("");
    setCategory("");
    navigate("/");
  };

  const handleWithdraw = async (e) => {
    try {
      await axios.post("http://localhost:8181/transactions", {
        amount: -amount,
        vendor: vendor,
        category: category,
      });
      navigate("/");
    } catch (error) {
      console.error("Error withdrawing:", error);
    }
    setAmount("");
    setVendor("");
    setCategory("");
    navigate("/");
  };

  return (
    <form>
      <div className="Operations">
        <h2>Insert Transaction</h2>
        <TextField
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="Vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <div>
          <button onClick={handleDeposit}>Deposit</button>
          <button onClick={handleWithdraw}>Withdraw</button>
        </div>
      </div>
    </form>
  );
}
