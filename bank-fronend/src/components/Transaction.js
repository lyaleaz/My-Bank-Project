import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Transaction.css";
export default function Transaction(props) {
  const { transaction, onDelete } = props;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8181/transactions/${transaction._id}`);
      onDelete(transaction._id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="transaction">
      <p>Vendor: {props.transaction.vendor}</p>
      <p>Category: {props.transaction.category}</p>
      <p style={{ color: props.transaction.amount < 0 ? "red" : "green" }}>
        Amount: {props.transaction.amount}
      </p>
      <button onClick={handleDelete}>DELETE</button>
    </div>
  );
}
