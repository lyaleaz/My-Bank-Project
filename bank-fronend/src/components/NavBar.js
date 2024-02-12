import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function NavBar({ balance }) {
  return (
    <nav>
      <Link to="/transactions" className="Transactions-link">
        Transactions
      </Link>

      <Link to="/Operations" className="Operations-link">
        Operations
      </Link>
      <Link to="/breakdown" className="Breakdown-link">
        Breakdown
      </Link>
      <h2 className="navbar-BALANCE">
        BALANCE:{" "}
        <span style={{ color: balance < 500 ? "red" : "green" }}>
          {balance}$
        </span>
      </h2>
    </nav>
  );
}

export default NavBar;
