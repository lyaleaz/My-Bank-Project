import React from "react";

const Modal = ({ transactions }) => {
  return (
    <div className="modal">
      <h3>Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.vendor}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Modal;
