import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Transactions from "./components/TransactionsComp";
import Operations from "./components/Operations";
import Breakdown from "./components/Breakdown";
import "./App.css";

const App = () => {
  const [transactions, setTransactions] = useState([
    { amount: -10, vendor: "Elevation", category: "Salary" },
    { amount: -100, vendor: "Runescape", category: "Entertainment" },
    { amount: -200, vendor: "Subway", category: "Food" },
    { amount: 1700, vendor: "La Baguetterie", category: "Food" },
  ]);

  /*   const calculateBalance = (transactions) => {
    return transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  };

  const [balance, setBalance] = useState(calculateBalance(transactions));/
  const [depositAmount, setDepositAmount] = useState(0);
  const handleDeposit = (depositAmount) => {
    setBalance(balance + depositAmount);
  };*/
  return (
    <div>
      <Router>
        <div style={{ backgroundColor: "white" }}>
          <NavBar />
          <Routes>
            <Route
              path="/transactions"
              element={
                <Transactions
                  transaction={transactions}
                  transactions={transactions}
                  onDelete={setTransactions}
                />
              }
            />
            <Route path="/operations" element={<Operations />} />
            <Route path="/breakdown" element={<Breakdown />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
