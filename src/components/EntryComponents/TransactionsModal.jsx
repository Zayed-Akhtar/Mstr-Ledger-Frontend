import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import axios from 'axios'

function TransactionsModal({ visible, selectedTransaction, onClose, onSelectTransaction }) {
  if (!visible) return null

  const [query, setQuery] = useState('')
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

  useEffect(() => {
    let active = true
    const controller = new AbortController()

    const fetchTransactions = async () => {
      setLoading(true)
      setError(null)
      try {
        const params = {}
        if (query.trim()) {
          const q = query.trim()
          params.partyCode = q
          params.name = q
          params.phoneNumber = q
        }
        const url = `${serverEndpoint}/transaction/transactions`
        const res = await axios.get(url, { params, signal: controller.signal })
        if (!active) return
        const data = res.data || {}
        console.log('transactions from TransactionModal', data);
        setTransactions(Array.isArray(data.items) ? data.items : [])
      } catch (err) {
        if (!active) return
        setError(err.message || 'Failed to load transactions')
        setTransactions([])
      } finally {
        if (active) setLoading(false)
      }
    }

    // debounce user input a bit
    const handle = setTimeout(fetchTransactions, 300)
    return () => {
      active = false
      controller.abort()
      clearTimeout(handle)
    }
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
              placeholder="Search by party name, code or phone..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {loading && <div>Loading...</div>}
          {error && <div className="text-danger">{error}</div>}

          <table className="table table-hover table-bordered mb-0">
            <thead>
              <tr>
                <th>Party Name</th>
                <th>Party Code</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Credit</th>
                <th>Debit</th>
                <th>Balance</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 && !loading && (
                <tr>
                  <td colSpan={8} className="text-center">No transactions found</td>
                </tr>
              )}
              {transactions.map((tx, idx) => {
                const party = tx.party || null
                const partyName = party?.name || ''
                const partyCode = party?.partyCode || ''
                const partyPhone = party?.phoneNumber || ''
                const isSelected = selectedTransaction && (selectedTransaction.partyCode === partyCode || selectedTransaction.code === partyCode)
                return (
                  <tr
                    key={tx._id || idx}
                    className={isSelected ? 'table-primary' : ''}
                    style={{ cursor: party ? 'pointer' : 'default' }}
                    onClick={() => tx && onSelectTransaction(tx)}
                  >
                    <td>{partyName}</td>
                    <td>{partyCode}</td>
                    <td>{partyPhone}</td>
                    <td>{new Date(tx.transactionDate || tx.createdAt || '').toLocaleDateString()}</td>
                    <td>{tx.credit ?? '-'}</td>
                    <td>{tx.debit ?? '-'}</td>
                    <td>{tx.balance ?? '-'}</td>
                    <td>{tx.description || '-'}</td>
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

export default TransactionsModal
