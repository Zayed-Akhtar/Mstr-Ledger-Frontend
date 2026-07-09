import React from 'react'

function Transactions() {
  const tableHeaders = ['#', 'Date', 'Credit', 'Debit', 'Balance', 'Ph #'];
  const tableData = [
    { id: 1, Date: '1-jun', Credit: '100', Debit: '50', Balance: '50', Ph: '1234567890' },
    { id: 2, Date: '2-jun', Credit: '200', Debit: '100', Balance: '100', Ph: '0987654321' },
    { id: 3, Date: '3-jun', Credit: '300', Debit: '150', Balance: '150', Ph: '1234567890' },
    { id: 3, Date: '3-jun', Credit: '300', Debit: '150', Balance: '150', Ph: '1234567890' },
    { id: 3, Date: '3-jun', Credit: '300', Debit: '150', Balance: '150', Ph: '1234567890' },
    { id: 3, Date: '3-jun', Credit: '300', Debit: '150', Balance: '150', Ph: '1234567890' },
  ];
  return (
    <div className="bd-example-snippet bd-code-snippet transaction-table" style={{width:'50%'}}> <div class="bd-example m-0 border-0"> <table class="table table-striped table-hover">
  <thead>
    <tr>
      {tableHeaders.map((header, index) => (
        <th key={index} scope="col">{header}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {tableData.map((row) => (
      <tr key={row.id}>
        <th scope="row">{row.id}</th>
        <td>{row.Date}</td>
        <td>{row.Credit}</td>
        <td>{row.Debit}</td>
        <td>{row.Balance}</td>
        <td>{row.Ph}</td>
      </tr>
    ))}
  </tbody>
</table> </div>  </div>
  )
}

export default Transactions