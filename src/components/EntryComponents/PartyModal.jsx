import React, { useState, useMemo } from 'react'
import { createPortal } from 'react-dom'

const partyList = [
  { name: 'Alpha Traders', code: 'AT001', area: 'Downtown', bill: '$12,540', phone: '555-1234' },
  { name: 'Beta Industries', code: 'BI102', area: 'Uptown', bill: '$8,220', phone: '555-5678' },
  { name: 'Gamma Supplies', code: 'GS203', area: 'Midtown', bill: '$4,310', phone: '555-9012' },
  { name: 'Delta Wholesale', code: 'DW304', area: 'Westside', bill: '$18,400', phone: '555-3456' },
]

function PartyModal({ visible, selectedParty, onClose, onSelectParty }) {
  if (!visible) return null

  const [query, setQuery] = useState('')

  const filteredParties = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return partyList
    return partyList.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q)
      )
    })
  }, [query])

  const modal = (
    <div className="party-modal-backdrop">
      <div className="party-modal">
        <div className="party-modal-header">
          <h5>Choose Party</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
        </div>
        <div className="party-modal-body">
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or code..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <table className="table table-hover table-bordered mb-0">
            <thead>
              <tr>
                <th>Party Name</th>
                <th>Party Code</th>
                <th>Area</th>
                <th>Bill</th>
                <th>Ph number</th>
              </tr>
            </thead>
            <tbody>
              {filteredParties.map((party) => {
                const isSelected = selectedParty?.code === party.code
                return (
                  <tr
                    key={party.code}
                    className={isSelected ? 'table-primary' : ''}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelectParty(party)}
                  >
                    <td>{party.name}</td>
                    <td>{party.code}</td>
                    <td>{party.area}</td>
                    <td>{party.bill}</td>
                    <td>{party.phone}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="party-modal-footer">
          <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

export default PartyModal
