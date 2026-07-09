import React, { useState, useEffect } from 'react'
import { RxPencil2 } from "react-icons/rx";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa";
import TransactionsModal from './TransactionsModal'
import { VscSearchFuzzy } from "react-icons/vsc";

function EntryForm() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [date, setDate] = useState('')

  const formatDateValue = (value) => {
    if (!value) return ''
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return ''
    return parsed.toISOString().slice(0, 10)
  }

  useEffect(() => {
    if (selectedTransaction) {
      setDate(formatDateValue(selectedTransaction.transactionDate))
    } else {
      setDate('')
    }
  }, [selectedTransaction])

  return (
    <>
      <form className="row g-3 entry-form">
        <div className="col-md-6">
          <label htmlFor="partyName" className="form-label">Party Name</label>
          <input type="text" className="form-control" id="partyName" placeholder="Party name.." value={selectedTransaction?.party?.name} required/>
        </div>
        <div className="col-md-6">
          <label htmlFor="partyCode" className="form-label">Party Code</label>
          <div className="input-group">
            <span className="input-group-text" id="inputGroupPrepend2">#</span>
            <input type="text" className="form-control" id="partyCode" placeholder="XYZ123" aria-describedby="inputGroupPrepend2" value={selectedTransaction?.party?.partyCode} required />
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="area" className="form-label">Area</label>
          <input type="text" className="form-control" id="area" placeholder="Area.." value={selectedTransaction?.party?.area} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" placeholder="Bill / Cash" value={selectedTransaction?.description} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="debitCredit" className="form-label">Debit / Credit</label>
          <select className="form-select" id="debitCredit" defaultValue="" required>
            <option disabled value="">Choose...</option>
            <option>Debit</option>
            <option>Credit</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input type="number" className="form-control" id="amount" placeholder="Amount" value={selectedTransaction?.balance} required />
        </div>
            <div className="col-12" style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{display:'flex', gap:'7%', width:'fit-content'}}>
                <button type="button" className="btn btn-info icon-button"><RxPencil2 />New</button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  style={{display:'flex', alignItems:'center'}}
                  onClick={() => setIsTransactionModalOpen(true)}
                ><FaRegFolderOpen />Open</button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  style={{display:'flex', alignItems:'center'}}
                ><VscSearchFuzzy />Find</button>
                <button type="button" className="btn btn-danger icon-button"><RiDeleteBin5Fill /></button>
                </div>
                <button className="btn btn-dark icon-button" type="submit"><MdOutlineLibraryAddCheck />Save</button>
            </div>
        </form>
        <TransactionsModal
          visible={isTransactionModalOpen}
          selectedTransaction={selectedTransaction}
          onClose={() => setIsTransactionModalOpen(false)}
          onSelectTransaction={(txn) => {
            setSelectedTransaction(txn)
            setIsTransactionModalOpen(false)
          }}
        />
    </>
  )
}

export default EntryForm