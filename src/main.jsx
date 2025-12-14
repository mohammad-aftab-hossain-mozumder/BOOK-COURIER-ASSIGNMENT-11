import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './pages/Root.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Books from './pages/Books.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AllUsers from './pages/AllUsers.jsx';
import AddBook from './pages/AddBook.jsx';
import UserOrders from './pages/UserOrders.jsx';
import Profile from './pages/Profile.jsx';
import LibrarianOrders from './pages/LibrarianOrders.jsx';
import ManageBooks from './pages/ManageBooks.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Invoices from './pages/Invoices.jsx';
import LibrarianBooks from './pages/LibrarianBooks.jsx';
import DashboardHome from './pages/DashboardHome.jsx';
import LibrarianBookDetails from './pages/LibrarianBookDetails.jsx';
import Details from './pages/Details.jsx';
import Success from './pages/Success.jsx';
import AdminRoute from './pages/AdminRoute.jsx';
import ReaderRoute from './pages/ReaderRoute.jsx';
import LibrarianRoute from './pages/LibrarianRoute.jsx';
import PrivateRoute from './PrivateRoute.jsx/PrivateRoute.jsx';
import Cancelled from './pages/Cancelled.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
        // loader:()=> fetch('https://assignemnt-11-server.vercel.app/books/recent')
      },
      {
        path: 'books',
        Component: Books
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: 'books/:id',
    element: <PrivateRoute><Details></Details></PrivateRoute>
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path: 'profile',
        Component: Profile
      },
      {
        path: 'librarian-books',
        element: <LibrarianRoute><LibrarianBooks></LibrarianBooks></LibrarianRoute>
      },
      {
        path: 'librarian-orders',
        element: <LibrarianRoute><LibrarianOrders></LibrarianOrders></LibrarianRoute>
      },
      {
        path: 'add-book',
        element: <LibrarianRoute><AddBook></AddBook></LibrarianRoute>
      },
      {
        path: 'librarian-books/:id',
        element: <LibrarianRoute><LibrarianBookDetails></LibrarianBookDetails></LibrarianRoute>
      },
      {
        path: 'wishlist',
        element: <ReaderRoute><Wishlist></Wishlist></ReaderRoute>
      },
      {
        path: 'invoices',
        element: <ReaderRoute><Invoices></Invoices></ReaderRoute>
      },
      {
        path: 'user-orders',
        element: <ReaderRoute><UserOrders></UserOrders></ReaderRoute>
      },
      {
        path: 'payment-cancelled',
        Component: Cancelled
      },
      {
        path: 'payment-success',
        Component: Success
      },
      {
        path: 'all-users',
        element: <AdminRoute>
          <AllUsers></AllUsers>
        </AdminRoute>
      },
      {
        path: 'manage-books',
        element: <AdminRoute>
          <ManageBooks></ManageBooks>
        </AdminRoute>
      }

    ]
  },
  {
    path: '*',
    element: <p>404 Page Not Found</p>
  }
]);
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
