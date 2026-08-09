import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'
import Entry from './components/EntryComponents/Entry';
import PartyManagementPage from './components/Pages/PartyManagementPage';

function FallbackComponent({ title }) {
  return (
    <div className="p-4">
      <h3>{title}</h3>
      <p className="text-muted">This section is not implemented yet.</p>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/Entry" replace /> },
      { path: 'Entry', element: <Entry /> },
      { path: 'Parties', element: <PartyManagementPage /> },
      { path: 'day-book', element: <FallbackComponent title="Day Book" /> },
      { path: 'reports', element: <FallbackComponent title="Reports" /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
