import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Transactions from "./components/TransactionsComp";
import Operations from "./components/Operations";
import Breakdown from "./components/Breakdown";
import "./App.css";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(100);
  const updateBalanceF = (transactionAmount) => {
    const updateBalance = balance + transactionAmount;
    setBalance(updateBalance);
  };
  function getBalance() {
    return axios
      .get("http://localhost:8181/transactions/balance")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const updateBalance = (value) => {
    const updatedBalance = balance + value;
    setBalance(updatedBalance);
    console.log(balance, value);
  };
  return (
    <div>
      <Router>
        <div>
          <NavBar balance={balance} />
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
            <Route
              path="/operations"
              element={<Operations updateBalance={updateBalance} />}
            />
            <Route path="/breakdown" element={<Breakdown />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
