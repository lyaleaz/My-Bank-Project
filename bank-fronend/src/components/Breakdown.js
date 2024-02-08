import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Breakdown.css";
export default function Breakdown() {
  const [breakdown, setBreakdown] = useState([]);
  function getTransactions() {
    return axios
      .get("http://localhost:8181/transactions/breakdown")
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
  }, []);

  return (
    <div className="BreakdownClass">
      <h2>Breakdown of Transactions</h2>
      <ul>
        {breakdown.map((item, index) => (
          <li key={index}>
            Category: {item._id}, Total Amount: {item.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
}
