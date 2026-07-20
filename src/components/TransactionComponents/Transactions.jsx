import React, { useEffect, useState } from 'react'
import DateRangeFilter from '../common/DateRangeFilter';
import { GrDocumentPdf } from "react-icons/gr";
import axios from 'axios';

function Transactions({ transactions = [], onSelectTransaction, resetDate, currentParty }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const tableHeaders = ['Txn Number', 'Date', 'Credit', 'Debit', 'Balance', 'Description'];
  const [resetDateFilter, setResetDateFilter] = useState(0);
  const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;


  useEffect(() => {
    setResetDateFilter(prev => prev + 1);
  }, [transactions, resetDate]);

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return '-'
    return date.toLocaleDateString()
  }

 const handlePdfDownload = async () => {

    if (!currentParty?._id) {
        alert("Please select a party first.");
        return;
    }
    console.log('Date selected', fromDate);
    console.log('to date', toDate);
    
    
    try {
        const response = await axios.get(
            `${serverEndpoint}/transaction/export-pdf`,
            {
                params: {
                    partyId: currentParty._id,
                    fromDate,
                    toDate
                },
                responseType: "blob"
            }
        );

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );

        const link = document.createElement("a");

        link.href = url;

        link.download = "transactions.pdf";

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error(error);
    }
};

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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DateRangeFilter
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          resetTrigger={resetDateFilter}
        />
        <button
          type="button"
          className="btn btn-success"
          disabled={transactions.length === 0}
          onClick={handlePdfDownload}
          style={{fontSize:'small'}}
        >
          Export As <GrDocumentPdf />
        </button>      
        </div>

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
                  <td>{txn.description}</td>
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
