import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/login';
import Header from './components/Header';
import Contacts from './pages/contacts';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import Book from './pages/book';
import Home from './pages/home';
import Register from './pages/register';
import { refetchData } from './service/api';
import { useDispatch, useSelector } from 'react-redux';
import { doRefetchAction } from './redux/account/accountSlice';
import BounceLoader from 'react-spinners/BounceLoader';
import '../src/styles/App.scss';
import NotFound from './components/NotFound';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticator);
  console.log('check isAuthenticated', isAuthenticated);

  const dataRefetch = async () => {
    const res = await refetchData();

    if (res && res?.data) {
      dispatch(doRefetchAction(res?.data?.user));
    }
  };

  React.useEffect(() => {
    dataRefetch();
  }, []);

  // React.useEffect(() => {
  //   if (isAuthenticated === false) {
  //     navigate('/login');
  //   }
  // }, [isAuthenticated]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: 'contacts',
          element: <Contacts />,
        },
        {
          path: 'book',
          element: <Book />,
        },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: 'contacts/:contactId',
      element: <div>Contacts</div>,
    },
  ]);
  return (
    <>
      {isAuthenticated || window.location.pathname === '/login' ? (
        <RouterProvider router={router} />
      ) : (
        <div className="loading">
          <BounceLoader
            color="#36d7b7"
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
}
