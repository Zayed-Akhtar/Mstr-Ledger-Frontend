import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'
import Entry from './components/EntryComponents/Entry';
import PartyManagementPage from './components/Pages/PartyManagementPage';
import AuthenticationPage from './pages/AuthenticationPage.jsx';
import { LoginForm } from './pages/LoginForm.jsx';
import { SignupForm } from './pages/SignupForm.jsx';
import AuthenticationInitializer from './components/AuthenticationInitializer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ToastNotification from './components/common/ToastNotification.jsx';
import PublicRoute from './components/PublicRoute.jsx';

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
    path: "/mstr-ledger",

    element: <ProtectedRoute />,

    children: [

        {
            element: <App />,
            children: [

                {
                    index: true,
                    element: (
                        <Navigate
                            to="Entry"
                            replace
                        />
                    )
                },

                {
                    path: "Entry",
                    element: <Entry />
                },

                {
                    path: "Parties",
                    element: <PartyManagementPage />
                },

                {
                    path: "day-book",
                    element: (
                        <FallbackComponent
                            title="Day Book"
                        />
                    )
                },

                {
                    path: "reports",
                    element: (
                        <FallbackComponent
                            title="Reports"
                        />
                    )
                }

            ]
        }

    ]
},
{
    path: "/",
    element: <AuthenticationPage />,

    children: [

        {
            element: <PublicRoute />,

            children: [

                {
                    index: true,
                    element: (
                        <Navigate
                            to="login"
                            replace
                        />
                    )
                },

                {
                    path: "login",
                    element: <LoginForm />
                },

                {
                    path: "signup",
                    element: <SignupForm />
                }

            ]
        }

    ]
}
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthenticationInitializer/>
    <RouterProvider router={router} />
    <ToastNotification />
  </Provider>
)
