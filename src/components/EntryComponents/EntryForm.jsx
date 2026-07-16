import React, { useState, useEffect } from 'react'
import { RxPencil2 } from "react-icons/rx";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa";
import TransactionsModal from './TransactionsModal'
import axios from 'axios'
import LookupField from '../LookupField';

function EntryForm({ onPartyTransactionsLoaded, selectedTransaction, onSelectedTransactionChange }) {
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
    const [date, setDate] = useState('')
    const [partyNameInput, setPartyNameInput] = useState('')
    const [partyCodeInput, setPartyCodeInput] = useState('')
     const [isCreditandDebitSelected, setIsCreditandDebitSelected] = useState(false)
    const [debitCredit, setDebitCredit] = useState('')
    const [currentParty, setCurrentParty] = useState(null)
    const [description, setDescription] = useState('')
    const [credit, setCredit] = useState('')
    const [debit, setDebit] = useState('')
    const [balance, setBalance] = useState('')
    const [saveError, setSaveError] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false);
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

    const formatDateValue = (value) => {
        if (!value) return ''
        const parsed = new Date(value)
        if (Number.isNaN(parsed.getTime())) return ''
        return parsed.toISOString().slice(0, 10)
    }

    useEffect(() => {
        if (selectedTransaction) {
            setDate(formatDateValue(selectedTransaction.transactionDate))

            const credit = Number(selectedTransaction.credit ?? 0)
            const debit = Number(selectedTransaction.debit ?? 0)

            if (credit > 0 && debit > 0) {
                setDebitCredit('Credit & Debit')
                setIsCreditandDebitSelected(true)
            } else if (credit > 0) {
                setDebitCredit('Credit')
                setIsCreditandDebitSelected(false)
            } else if (debit > 0) {
                setDebitCredit('Debit')
                setIsCreditandDebitSelected(false)
            } else {
                setDebitCredit('')
                setIsCreditandDebitSelected(false)
            }

            if (selectedTransaction.party) {
                setCurrentParty((prev) => ({
                    name: selectedTransaction.party.name ?? prev?.name ?? '',
                    partyCode: selectedTransaction.party.partyCode ?? prev?.partyCode ?? '',
                    area: selectedTransaction.party.area ?? prev?.area ?? '',
                    phoneNumber: selectedTransaction.party.phoneNumber ?? prev?.phoneNumber ?? '',
                    _id: selectedTransaction.party._id ?? prev?._id ?? ''
                }))

                if (selectedTransaction.party.name) {
                    setPartyNameInput(selectedTransaction.party.name)
                }
                if (selectedTransaction.party.partyCode) {
                    setPartyCodeInput(selectedTransaction.party.partyCode)
                }
            }

            setDescription(selectedTransaction.description ?? '')
            setCredit(selectedTransaction.credit ?? '')
            setDebit(selectedTransaction.debit ?? '')
            setBalance(selectedTransaction.balance ?? '')
        } else {
            setDate('')
            setDebitCredit('')
            setIsCreditandDebitSelected(false)
            setDescription('')
            setCredit('')
            setDebit('')
            setBalance('')
        }
    }, [selectedTransaction])


    const clearCurrentEntry = () => {
        setDate('')
        setPartyNameInput('')
        setPartyCodeInput('')
        setCurrentParty(null)
        setDescription('')
        setDebitCredit('')
        setIsCreditandDebitSelected(false)
        setCredit('')
        setDebit('')
        setBalance('')
        if (onSelectedTransactionChange) onSelectedTransactionChange(null)
        onPartyTransactionsLoaded?.([])
    }

    const handleSave = async (event) => {
        event.preventDefault()
        setSaveError('')

        if (!currentParty?._id) {
            setSaveError('Please select a party before saving.')
            return
        }

        if (!selectedTransaction) {
            setSaveError('No transaction selected to save.')
            return
        }

        setIsSaving(true)

        const payload = {
            credit: Number(credit ?? 0),
            debit: Number(debit ?? 0),
            description: description.trim(),
            balance: Number(balance || selectedTransaction?.balance || 0),
            transactionDate: date,
            partyId: currentParty._id
        }

        try {
            const response = await axios.post(`${serverEndpoint}/transaction/add-transaction`, payload)
            const items = response.data?.items
            const transactions = items?.transactions

            if (Array.isArray(transactions)) {
                onPartyTransactionsLoaded?.(transactions)
            } else {
                setSaveError('Save completed but server returned no transactions.')
            }
        } catch (error) {
            setSaveError(error.response?.data?.message || error.message || 'Failed to save transaction')
        } finally {
            setIsSaving(false)
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault();

        setSaveError("");

        if (!selectedTransaction?._id) {
            setSaveError("Please select a transaction to update.");
            return;
        }

        if (!currentParty?._id) {
            setSaveError("Please select a party.");
            return;
        }

        setIsSaving(true);

        const payload = {
            credit: Number(credit ?? 0),
            debit: Number(debit ?? 0),
            description: description.trim(),
            transactionDate: date,
            party: currentParty._id
        };

        try {

            const response = await axios.put(
                `${serverEndpoint}/transaction/update-transaction/${selectedTransaction._id}`,
                payload
            );

            const party = response.data?.items;

            if (party?.transactions) {

                onPartyTransactionsLoaded(party.transactions);

                const updatedTxn = party.transactions.find(
                    t => t._id === selectedTransaction._id
                );

                if (updatedTxn) {
                    onSelectedTransactionChange(updatedTxn);
                }

            }
            setIsUpdate(false);

        } catch (error) {

            setSaveError(
                error.response?.data?.message ||
                error.message ||
                "Failed to update transaction"
            );

        } finally {

            setIsSaving(false);

        }
    };

    const handleDelete = async () => {
        if (!selectedTransaction?._id) {
            setSaveError("Please select a transaction to delete.");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmed) return;

        setIsSaving(true);
        setSaveError("");

        try {
            const response = await axios.delete(
                `${serverEndpoint}/transaction/delete-transaction/${selectedTransaction._id}`
            );

            const transactions = response.data?.items?.transactions || [];

            onPartyTransactionsLoaded(transactions);

            // Populate form with last transaction
            if (transactions.length > 0) {
                onSelectedTransactionChange(
                    transactions[transactions.length - 1]
                );
            } else {
                onSelectedTransactionChange(null);
            }

        } catch (error) {
            setSaveError(
                error.response?.data?.message ||
                error.message ||
                "Failed to delete transaction"
            );
        } finally {
            setIsSaving(false);
        }
    };

    const populatePartyData = (party, transactions = []) => {
        setPartyNameInput(party.name || '')
        setPartyCodeInput(party.partyCode || '');
        setCurrentParty({
            name: party.name,
            partyCode: party.partyCode,
            area: party.area,
            phoneNumber: party.phoneNumber,
            _id: party._id
        })
        // Create a transaction-like object with party data
        const partyData = {
            party: {
                name: party.name,
                partyCode: party.partyCode,
                area: party.area,
                phoneNumber: party.phoneNumber,
                _id: party._id
            },
            transactions: transactions
        }
        if (onSelectedTransactionChange && !isUpdate) onSelectedTransactionChange(partyData)
        // Pass transactions to parent component
        if (onPartyTransactionsLoaded) {
            onPartyTransactionsLoaded(transactions)
        }
    }

    const handleSelectPartyFromDropdown = (party) => {
        populatePartyData(party, party.transactions || [])
    }

    // validation: enable Save only when required fields are populated
    const isSaveValid = (() => {
        const hasParty = Boolean(currentParty?._id)
        const hasDate = Boolean(date)
        const hasDesc = Boolean(description && description.trim())
        const numCredit = Number(credit || 0)
        const numDebit = Number(debit || 0)
        let amountsValid = false
        if (debitCredit === 'Credit') amountsValid = numCredit > 0
        else if (debitCredit === 'Debit') amountsValid = numDebit > 0
        else if (debitCredit === 'Credit & Debit') amountsValid = numCredit > 0 && numDebit > 0
        else amountsValid = numCredit > 0 || numDebit > 0

        return hasParty && hasDate && hasDesc && amountsValid
    })()

    return (
        <>
            <form className="row g-3 entry-form" onSubmit={isUpdate ? handleUpdate : handleSave}>
                <LookupField
                    className="col-md-6"
                    id="partyName"
                    label="Party Name"
                    placeholder="Party name..."
                    value={partyNameInput}
                    onChange={setPartyNameInput}
                    searchUrl={`${serverEndpoint}/party/party-transactions`}
                    showDropdown={true}
                    onPartySelected={populatePartyData}
                />

                <LookupField
                    className="col-md-6"
                    id="partyCode"
                    label="Party Code"
                    placeholder="XYZ123"
                    value={partyCodeInput}
                    onChange={setPartyCodeInput}
                    searchUrl={`${serverEndpoint}/party/party-by-code`}
                    showDropdown={false}
                    onPartySelected={populatePartyData}
                />
                <div className="col-md-6">
                    <label htmlFor="area" className="form-label">Area</label>
                    <input type="text" className="form-control" id="area" placeholder="Area.." value={currentParty?.area || ''} readOnly required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Bill / Cash"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
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
                    <select
                        className="form-select"
                        id="debitCredit"
                        value={debitCredit}
                        onChange={(e) => {
                            const v = e.target.value
                            setDebitCredit(v)
                            setIsCreditandDebitSelected(v === 'Credit & Debit')
                        }}
                        required
                    >
                        <option disabled value="">Choose...</option>
                        <option value="Debit">Debit</option>
                        <option value="Credit">Credit</option>
                        <option value="Credit & Debit">Credit & Debit</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="amountCredit" className="form-label">
                        {debitCredit === 'Debit' ? 'Debit' : debitCredit === 'Credit' ? 'Credit' : isCreditandDebitSelected ? 'Credit' : 'Amount'}
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="amountCredit"
                        placeholder="Amount"
                        value={debitCredit === 'Debit' ? debit : credit}
                        onChange={(e) => {
                            const value = e.target.value
                            if (debitCredit === 'Debit') {
                                setDebit(value)
                            } else {
                                setCredit(value)
                            }
                        }}
                        required
                    />
                </div>
                {isCreditandDebitSelected &&
                    <div className="col-md-6" >
                        <label htmlFor="amountDebit" className="form-label">Debit</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amountDebit"
                            placeholder="Amount"
                            value={debit}
                            onChange={(e) => setDebit(e.target.value)}
                            required
                        />
                    </div>
                }

                <div className="col-12" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '7%', width: 'fit-content' }}>
                        <button type="button" onClick={clearCurrentEntry} className="btn btn-info icon-button"><RxPencil2 />New</button>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            style={{ display: 'flex', alignItems: 'center' }}
                            onClick={() => {
                                setIsTransactionModalOpen(true)
                                setIsUpdate(true)
                            }}
                        ><FaRegFolderOpen />Open</button>
                        <button
                            type="button"
                            className="btn btn-danger icon-button"
                            onClick={handleDelete}
                            disabled={!selectedTransaction?._id || isSaving}
                        >
                            <RiDeleteBin5Fill />
                            Delete
                        </button>
                    </div>
                    <button className="btn btn-dark icon-button" type="submit" disabled={isSaving || !isSaveValid}>
                        <MdOutlineLibraryAddCheck />
                        {isSaving
                            ? (isUpdate ? "Updating..." : "Saving...")
                            : (isUpdate ? "Update" : "Save")}
                    </button>
                    {saveError && (
                        <div className="text-danger" style={{ marginTop: '0.75rem' }}>{saveError}</div>
                    )}
                </div>
            </form>
            <TransactionsModal
                visible={isTransactionModalOpen}
                selectedTransaction={selectedTransaction}
                onClose={() => {
                    setIsTransactionModalOpen(false)
                    setIsUpdate(false)
                }}
                onSelectTransaction={(txn) => {
                    if (onSelectedTransactionChange) {
                        onSelectedTransactionChange(txn)
                    }
                    setIsTransactionModalOpen(false)
                }}
            />
        </>
    )
}

export default EntryForm