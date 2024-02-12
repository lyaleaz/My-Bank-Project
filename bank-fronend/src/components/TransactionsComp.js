import React, { useState, useEffect } from "react";
import axios from "axios";
import Transaction from "./Transaction";
import { Link } from "react-router-dom";
import "./Transactions.css";
import image from "../images/bank.jpg";
export default function Transactions(props) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8181/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8181/transactions/${id}`);
      setTransactions(
        transactions.filter((transaction) => transaction._id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="transactions-container">
      <h2>All Transactions</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.vendor}</td>
              <td>{transaction.category}</td>
              <td style={{ color: transaction.amount < 0 ? "red" : "green" }}>
                {transaction.amount}
              </td>
              <td>
                <button onClick={() => handleDelete(transaction._id)}>
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
