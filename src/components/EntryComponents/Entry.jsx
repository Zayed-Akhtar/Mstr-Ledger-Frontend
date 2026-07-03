import React from 'react'
import EntryForm from './EntryForm'
import Content from '../Content'
import Transactions from './Transactions'

function Entry() {
    return (
        <Content>
            <EntryForm/>
            <Transactions/>
        </Content>
    )
}

export default Entry