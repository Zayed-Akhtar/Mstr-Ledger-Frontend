import React from 'react'
import EntryForm from './EntryForm'
import Content from '../Content'
import Transactions from './Transactions'
import { TbFileDatabase } from "react-icons/tb";
import { TbTransactionRupee } from "react-icons/tb";
function Entry() {
    return (
        <Content>
            <div className='entry-title'>
                <div className='entry-title-text'>
                <h1 className='display-6' style={{color:'#776b6b'}}><TbFileDatabase style={{marginRight:'3%', marginBottom:'1%'}}/>Entry</h1>
                </div>
                <div style={{backgroundColor:'#f7f7f7', width:'50%', marginRight:'20%'}}> 
                    <h1 className='display-6' style={{color:'#776b6b'}}><TbTransactionRupee style={{marginRight:'3%', marginBottom:'1%'}}/>Transactions</h1>
                </div>
            </div>
            <div style={{display:'flex', gap:'2%'}}>
            <EntryForm/>
            <Transactions/>
            </div>
        </Content>
    )
}

export default Entry