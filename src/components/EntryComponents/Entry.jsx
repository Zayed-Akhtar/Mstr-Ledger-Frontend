import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import EntryForm from './EntryForm'
import Content from '../Content'
import Transactions from '../TransactionComponents/Transactions'
import { TbFileDatabase } from "react-icons/tb";
import { TbTransactionRupee } from "react-icons/tb";

function Entry() {
    const location = useLocation();
    const [partyTransactions, setPartyTransactions] = useState([])
    const [selectedTransaction, setSelectedTransaction] = useState(null)
    const [resetDateFilter, setResetDateFilter] = useState(0);

    useEffect(() => {
        const routeParty = location.state?.fetchedPartyWithTxn;
        const routeTransactions = Array.isArray(location.state?.transactions)
            ? location.state.transactions
            : [];

        if (routeParty) {
            setPartyTransactions(routeTransactions);
            setSelectedTransaction({
                party: routeParty,
                transactions: routeTransactions
            });
        }
    }, [location.state]);

    return (
        <Content>
            <div className='entry-title'>
                <div className='entry-title-text'>
                    <h1 className='display-6' style={{ color: '#776b6b' }}><TbFileDatabase style={{ marginRight: '3%', marginBottom: '1%' }} />Entry</h1>
                </div>
                <div className='wht-bg' style={{width: '50%', marginRight: '20%' }}>
                    <h1 className='display-6' style={{ color: '#776b6b' }}><TbTransactionRupee style={{ marginRight: '3%', marginBottom: '1%' }} />Transactions</h1>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '2%', alignItems: 'stretch', minHeight: '0', height: '100%' }}>
                <EntryForm
                    onPartyTransactionsLoaded={setPartyTransactions}
                    selectedTransaction={selectedTransaction}
                    onSelectedTransactionChange={setSelectedTransaction}
                    onResetDateFilter={() => setResetDateFilter(prev => prev + 1)}
                />
                <Transactions transactions={partyTransactions} onSelectTransaction={setSelectedTransaction} resetDate={resetDateFilter} currentParty={selectedTransaction?.party}/>
            </div>
        </Content>
    )
}


export default Entry