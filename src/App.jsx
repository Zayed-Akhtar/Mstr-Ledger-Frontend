import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css'
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Content from './components/Content';
import Entry from './components/EntryComponents/Entry';

function App() {
  const [selectedItem, setSelectedItem] = useState('Home')

  return (
    <>
      <Header/>
      <div style={{ display: 'flex', minHeight: '100vh'}}>
        <Sidebar selectedItem={selectedItem} onSelect={setSelectedItem} />
        <Entry/>
      </div>
    </>
  )
}

export default App
