import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Breakdown.css";

export default function Breakdown() {
  const [breakdown, setBreakdown] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(false);
  const [categoryTransactions, setCategoryTransactions] = useState([]);

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

  const handleCategoryHover = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:8181/transactions/category/${categoryId}`
      );
      setCategoryTransactions(response.data);
      setHoveredCategory(true);
    } catch (error) {
      console.error("Error fetching category transactions:", error);
    }
  };

  const handleMouseEnter = (categoryId) => {
    setHoveredCategory(categoryId);
    handleCategoryHover(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setCategoryTransactions([]);
  };

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
            <tr
              key={index}
              className="breakdown-item"
              onMouseEnter={() => handleCategoryHover(item._id)}
              onMouseLeave={handleMouseLeave}
            >
              <td>{item._id}</td>
              <td>{item.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {hoveredCategory && (
        <div className="modal">
          <h3>{hoveredCategory} Transactions</h3>
          <ul>
            {categoryTransactions.map((transaction) => (
              <li
                style={{
                  backgroundColor:
                    transaction.amount < 0 ? "#F55649" : "#7BB850",
                  borderRadius: "10px",
                }}
                key={transaction._id}
              >
                {transaction.vendor} : {transaction.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
