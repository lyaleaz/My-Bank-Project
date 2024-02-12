import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Operations.css";

export default function Operations(props) {
  const [amount, setAmount] = useState(0);
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8181/transactions", {
        amount: amount * 1,
        vendor: vendor,
        category: category,
      });
      setAmount("");
      setVendor("");
      setCategory("");
      navigate("/");
      props.updateBalance(amount * 1);
    } catch (error) {
      console.error("Error depositing:", error);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8181/transactions", {
        amount: amount * -1,
        vendor: vendor,
        category: category,
      });
      setAmount("");
      setVendor("");
      setCategory("");
      navigate("/");

      props.updateBalance(amount * -1);
    } catch (error) {
      console.error("Error withdrawing:", error);
    }
    await axios.put("http://localhost:8181/transactions/balance", {});
  };

  return (
    <form>
      <div className="Operations">
        <h2>Insert Transaction</h2>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="vendor">Vendor:</label>
          <input
            type="text"
            id="vendor"
            placeholder="Enter vendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="button" className="deposit-btn" onClick={handleDeposit}>
            Deposit
          </button>
          <button
            type="button"
            className="withdraw-btn"
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>
      </div>
    </form>
  );
}
