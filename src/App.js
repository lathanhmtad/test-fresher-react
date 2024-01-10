import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Customer from './Layouts/Customer';
import Admin from './Layouts/Admin';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Register/RegisterPage';
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <Admin />
    },
    {
      path: "/",
      element: <Customer />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/register',
      element: <RegisterPage />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
