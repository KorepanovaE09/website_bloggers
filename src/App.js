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
import Campaigns from "./pages/Campaigns";
import Form_order from "./pages/Form-order";

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
    path: "/signup",
    element: (
      <>
        <SignUp />
      </>
    ),
  },
  {
    path: "/login",
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
    path: "/campaigns",
    element: (
      <>
        <Header />
        <Campaigns />
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
      <Header/>
      <Form_order/>
      </>
    )
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
