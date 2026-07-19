import React, { useEffect, useState } from 'react'
import { RiResetLeftFill } from "react-icons/ri";
import DateRangeFilter from '../common/DateRangeFilter';

function Transactions({ transactions = [], onSelectTransaction, resetDate }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const tableHeaders = ['Txn Number', 'Date', 'Credit', 'Debit', 'Balance'];
  const [resetDateFilter, setResetDateFilter] = useState(0);

  useEffect(() => {
    setResetDateFilter(prev => prev + 1);
  }, [transactions, resetDate]);

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return '-'
    return date.toLocaleDateString()
  }
  const filteredTransactions = transactions.filter((txn) => {

    const txnDate = new Date(txn.transactionDate);

    if (fromDate && txnDate < new Date(fromDate))
      return false;

    if (toDate && txnDate > new Date(toDate))
      return false;

    return true;

  });

  return (
    <div className="bd-example-snippet bd-code-snippet transaction-table">
      <DateRangeFilter
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        resetTrigger={resetDateFilter}
      />
      <div className="bd-example m-0 border-0">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} scope="col">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={tableHeaders.length} className="text-center text-muted">
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTransactions.map((txn, idx) => (
                <tr
                  key={txn._id || idx}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSelectTransaction && onSelectTransaction(txn)}
                >
                  <td>{txn.transactionNumber}</td>
                  <td>{formatDate(txn.transactionDate || txn.createdAt)}</td>
                  <td>{txn.credit ?? '-'}</td>
                  <td>{txn.debit ?? '-'}</td>
                  <td>{txn.balance ?? '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transactions
