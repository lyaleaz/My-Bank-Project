import React, { useState, useEffect } from "react";
import "./Transactions.css";
import axios from "axios";
import Transaction from "./Transaction";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Transactions(props) {
  const [data, setData] = useState(null);
  const [transactions, setBreakdown] = useState([]);
  function getTransactions() {
    return axios
      .get("http://localhost:8181/transactions")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  useEffect(() => {
    const getData = async function () {
      let transactionsData = await getTransactions();
      setBreakdown(transactionsData);
    };
    getData();
  }, [transactions]);
  return (
    <div>
      <h2>All Transactions</h2>
      {transactions.map((transaction, index) => (
        <div className="trans" key={index}>
          <Transaction
            transaction={transaction}
            transactions={props.transactions}
            onDelete={props.onDelete}
          />
        </div>
      ))}
    </div>
  );
}
