import { Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css'
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ToastNotification from './components/common/ToastNotification';

function App() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: '90vh' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '1rem' }}>
          <Outlet />
        </main>
        <ToastNotification />
      </div>
    </>
  )
}

export default App
