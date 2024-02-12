import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Breakdown.css";

export default function Breakdown() {
  const [breakdown, setBreakdown] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:8181/transactions/breakdown"
        );
        setBreakdown(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="breakdown-container">
      <h2>Breakdown of Transactions</h2>
      <table className="breakdown-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {breakdown.map((item, index) => (
            <tr key={index} className="breakdown-item">
              <td>{item._id}</td>
              <td>{item.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
