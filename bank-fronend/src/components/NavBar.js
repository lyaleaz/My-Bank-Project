import React from "react";
import { Link } from "react-router-dom";
import { Switch } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import "./NavBar.css";

function NavBar({ balance, darkMode, toggleDarkTheme }) {
  return (
    <nav className={darkMode ? "navbar-dark" : "navbar-light"}>
      <Link to="/transactions" className="Transactions-link">
        Transactions
      </Link>
      <Link to="/operations" className="Operations-link">
        Operations
      </Link>
      <Link to="/breakdown" className="Breakdown-link">
        Breakdown
      </Link>
      <div className="dark-mode-switch">
        {darkMode ? <WbSunnyIcon /> : <Brightness4Icon />}
        <Switch checked={darkMode} onChange={toggleDarkTheme} />
      </div>
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
