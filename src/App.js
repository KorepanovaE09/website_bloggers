import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import Header from "./components/Header";
import Bloggers from "./pages/Bloggers";
import BloggerDetails from "./pages/BloggerDetails";
import Profile from "./components/Profile_settings";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Error from "./pages/Error";
import Channel from "./pages/Channel";
import AddChannel from "./pages/AddСhannel";
import Orders from "./components/orders/Orders.jsx";
import Form_order from "./pages/Form-new-order";
import ChangePassword from "./pages/ChangePassword";
import Balance from "./pages/balance/Balance.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Bloggers />
      </>
    ),
    errorElement: <Error />,
  },
  {
    path: "/blogger/:id",
    element: (
      <>
        <Header />
        <BloggerDetails />
      </>
    ),
  },
  {
    path: "/balance",
    element: (
      <>
        <Header />
        <Balance />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Header />
        <Profile />
      </>
    ),
  },
  {
    path: "/auth/signup",
    element: (
      <>
        <SignUp />     
      </>
    ),
  },
  {
    path: "/auth/login",
    element: (
      <>
        <LogIn />
      </>
    ),
  },
  {
    path: "/channel",
    element: (
      <>
        <Header />
        <Channel />
      </>
    ),
  },
  {
    path: "/orders",
    element: (
      <>
        <Header />
        <Orders />
      </>
    ),
  },
  {
    path: "/addChannel",
    element: (
      <>
        <Header />
        <AddChannel />
      </>
    ),
  },
  {
    path: "/form-order",
    element: (
      <>
        <Header />
        <Form_order />
      </>
    ),
  },
  {
    path: "/change-password",
    element: (
      <>
        <Header />
        <ChangePassword />
      </>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
