import React from 'react'

function Transactions({ transactions = [], onSelectTransaction }) {
  const tableHeaders = ['Date', 'Credit', 'Debit', 'Balance', 'Description'];

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return '-'
    return date.toLocaleDateString()
  }

  return (
    <div className="bd-example-snippet bd-code-snippet transaction-table" style={{width:'61%'}}>
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
              transactions.map((txn, idx) => (
                <tr
                  key={txn._id || idx}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSelectTransaction && onSelectTransaction(txn)}
                >
                  <td>{formatDate(txn.transactionDate || txn.createdAt)}</td>
                  <td>{txn.credit ?? '-'}</td>
                  <td>{txn.debit ?? '-'}</td>
                  <td>{txn.balance ?? '-'}</td>
                  <td>{txn.description || '-'}</td>
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
