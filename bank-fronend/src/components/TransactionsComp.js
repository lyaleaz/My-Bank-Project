import React, { useState, useEffect } from "react";
import axios from "axios";
import Transaction from "./Transaction";
import { Link } from "react-router-dom";
import "./Transactions.css";
import image from "../images/bank.jpg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "react-select";

export default function Transactions(props) {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState({});
  const [year, setYear] = useState({});
  const [transactionMonthYear, setTransactionMonthYear] = useState([]);
  var months = [
    {},
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  var years = [
    {},
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
    { value: "2017", label: "2017" },
    { value: "2016", label: "2016" },
    { value: "2015", label: "2015" },
    { value: "2014", label: "2014" },
    { value: "2013", label: "2013" },
    { value: "2012", label: "2012" },
    { value: "2011", label: "2011" },
    { value: "2010", label: "2010" },
    { value: "2009", label: "2009" },
    { value: "2008", label: "2008" },
    { value: "2007", label: "2007" },
    { value: "2006", label: "2006" },
    { value: "2005", label: "2005" },
    { value: "2004", label: "2004" },
    { value: "2003", label: "2003" },
    { value: "2002", label: "2002" },
    { value: "2001", label: "2001" },
    { value: "2000", label: "2000" },
    { value: "1999", label: "1999" },
    { value: "1998", label: "1998" },
    { value: "1997", label: "1997" },
    { value: "1996", label: "1996" },
  ];
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

  const FilterByMonthAndYear = async (month, year) => {
    try {
      const response = await axios.get(
        `http://localhost:8181/transactions/${year}/${month}`
      );
      setTransactionMonthYear(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
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
  useEffect(() => {
    async function yearsM() {
      if (!month.value || !year.value) {
        return;
      }

      let transactionMonthYear = await FilterByMonthAndYear(
        month.value,
        year.value
      );
      //if (transactionMonthYear) {
      //  setTransactionMonthYear(transactionMonthYear);
      // }
      // console.log(transactionMonthYear);
    }
    yearsM();
  }, [month, year]);
  return (
    <div className="transactions-container">
      <h2>All Transactions</h2>
      <div className="topping">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            options={months}
            value={month}
            onChange={(e) => setMonth(e)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select options={years} value={year} onChange={(e) => setYear(e)} />
        </FormControl>
      </div>
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
          {(!month.value || !year.value) &&
            transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.vendor}</td>
                <td>{transaction.category}</td>
                <td style={{ color: transaction.amount < 0 ? "red" : "green" }}>
                  {transaction.amount}
                </td>
                <td>
                  <button
                    className="DelButton"
                    onClick={() => handleDelete(transaction._id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          {month.value &&
            year.value &&
            transactionMonthYear.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.vendor}</td>
                <td>{transaction.category}</td>
                <td style={{ color: transaction.amount < 0 ? "red" : "green" }}>
                  {transaction.amount}
                </td>
                <td>
                  <button
                    className="DelButton"
                    onClick={() => handleDelete(transaction._id)}
                  >
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
