import React from 'react'
import { RxPencil2 } from "react-icons/rx";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
function EntryForm() {
  return (
     <form class="row g-3 entry-form">
            <div class="col-md-6">
                <label for="validationDefault01" class="form-label">Party Name</label>
                <input type="text" class="form-control" id="validationDefault01" placeholder='Party name..' required />
            </div>
            <div class="col-md-6">
                <label for="validationDefault02" class="form-label">Party Code</label>
                <div class="input-group">
                    <span class="input-group-text" id="inputGroupPrepend2">#</span>
                    <input type="text" class="form-control" id="validationDefaultUsername" placeholder='XYZ123' aria-describedby="inputGroupPrepend2" required />
                </div>
            </div>
            <div class="col-md-6">
                <label for="validationDefault03" class="form-label">Area</label>
                <input type="text" class="form-control" id="validationDefault03" placeholder='Area..' required />
            </div>
            <div class="col-md-6">
                <label for="validationDefault03" class="form-label">Description</label>
                <input type="text" class="form-control" id="validationDefault03" placeholder='Bill / Cash' required />
            </div>
            <div class="col-md-4">
                <label for="validationDefault04" class="form-label">Debit / Credit</label>
                <select class="form-select" id="validationDefault04" required>
                    <option selected disabled value="">Choose...</option>
                    <option>Debit</option>
                    <option>Credit</option>
                </select>
            </div>
            <div class="col-md-6">
                <label for="validationDefault03" class="form-label">Amount</label>
                <input type="number" class="form-control" id="validationDefault03" placeholder='Amount' required />
            </div>
            <div class="mb-2" style={{display:'flex', gap:'2%'}}>
            <label for="exampleFormControlTextarea1" className="form-label">Address</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div class="col-12" style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{display:'flex', gap:'7%', width:'fit-content'}}>
                <button type="button" className="btn btn-info icon-button"><RxPencil2 />New</button>
                <button type="button" className="btn btn-danger icon-button"><RiDeleteBin5Fill />Delete</button>
                </div>
                <button className="btn btn-dark icon-button" type="submit"><MdOutlineLibraryAddCheck />Submit</button>
            </div>
        </form>
  )
}

export default EntryForm