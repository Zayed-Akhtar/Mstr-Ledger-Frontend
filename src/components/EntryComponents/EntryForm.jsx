import React, { useState } from 'react'
import { RxPencil2 } from "react-icons/rx";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa";
import PartyModal from './PartyModal'

function EntryForm() {
  const [isPartyModalOpen, setIsPartyModalOpen] = useState(false)
  const [selectedParty, setSelectedParty] = useState(null)

  return (
    <>
      <form className="row g-3 entry-form">
        <div className="col-md-6">
          <label htmlFor="partyName" className="form-label">Party Name</label>
          <input type="text" className="form-control" id="partyName" placeholder="Party name.." value={selectedParty?.name || ''} readOnly />
        </div>
        <div className="col-md-6">
          <label htmlFor="partyCode" className="form-label">Party Code</label>
          <div className="input-group">
            <span className="input-group-text" id="inputGroupPrepend2">#</span>
            <input type="text" className="form-control" id="partyCode" placeholder="XYZ123" aria-describedby="inputGroupPrepend2" value={selectedParty?.code || ''} readOnly />
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="area" className="form-label">Area</label>
          <input type="text" className="form-control" id="area" placeholder="Area.." value={selectedParty?.area || ''} readOnly />
        </div>
        <div className="col-md-6">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" placeholder="Bill / Cash" required />
        </div>
        <div className="col-md-6">
          <label htmlFor="date" className="form-label">Date</label>
          <input type="date" className="form-control" id="date" required />
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
          <input type="number" className="form-control" id="amount" placeholder="Amount" required />
        </div>
            {/* <div className="mb-2" style={{display:'flex', gap:'2%'}}>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div> */}
            <div className="col-12" style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{display:'flex', gap:'7%', width:'fit-content'}}>
                <button type="button" className="btn btn-info icon-button"><RxPencil2 />New</button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  style={{display:'flex', alignItems:'center'}}
                  onClick={() => setIsPartyModalOpen(true)}
                ><FaRegFolderOpen />Open</button>
                <button type="button" className="btn btn-danger icon-button"><RiDeleteBin5Fill />Delete</button>
                </div>
                <button className="btn btn-dark icon-button" type="submit"><MdOutlineLibraryAddCheck />Save</button>
            </div>
        </form>
        <PartyModal
          visible={isPartyModalOpen}
          selectedParty={selectedParty}
          onClose={() => setIsPartyModalOpen(false)}
          onSelectParty={(party) => {
            setSelectedParty(party)
            setIsPartyModalOpen(false)
          }}
        />
    </>
  )
}

export default EntryForm