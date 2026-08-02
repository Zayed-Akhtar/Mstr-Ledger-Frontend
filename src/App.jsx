import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css'
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PartyManagementPage from './components/Pages/PartyManagementPage';
import ToastNotification from './components/common/ToastNotification';
import Entry from './components/EntryComponents/Entry';

function App() {
  const [selectedItem, setSelectedItem] = useState('Home')

  return (
    <>
      <Header/>
      <div style={{ display: 'flex', minHeight: '90vh'}}>
        <Sidebar selectedItem={selectedItem} onSelect={setSelectedItem} />
        {/* <Entry/> */}
        <PartyManagementPage/>
        <ToastNotification />
      </div>
    </>
  )
}

export default App
