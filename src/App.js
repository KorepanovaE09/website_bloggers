import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header-blogger";
import Bloggers from "./pages/Bloggers";
import BloggerDetails from "./pages/BloggerDetails";
import Balance from "./pages/Balance";
import Profile from "./components/Profile_settings";
import Profile_blogger from "./pages/Settings_blogger";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Error from "./pages/Error";
import Channel from "./pages/Channel";
import AddChannel from "./pages/AddСhannel";
import Orders from "./pages/Orders";
import Form_order from "./pages/Form-new-order";
import ChangePassword from "./pages/ChangePassword";

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
        {/* <Profile_advertiser/> */}
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
      <Header/>
      <ChangePassword/>
      </>
    )
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
