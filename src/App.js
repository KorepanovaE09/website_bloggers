import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./components/Header-blogger";
import Bloggers from "./pages/Bloggers_card";
import BloggerDetails from "./pages/bloggerDetails";
import Balance from "./pages/Balance";
import Profile from "./pages/Profile_advertiser";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Error from "./pages/Error";
import Channel from "./pages/Channel";
import AddChannel from "./pages/AddСhannel";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        {/* <Bloggers /> */}
        <Channel />
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
      <Header/>
      <Balance/>
      </>
    )
  },
  {
    path: "/profile",
    element: (
      <>
      <Header/>
      <Profile/>
      </>
    )
  },
  {
    path: "/signup",
    element: (
      <>
      <SignUp/>
      </>
    )
  },
  {
    path: "/login",
    element: (
      <>
      <LogIn/>
      </>
    )
  },
  {
    path: "/channel",
    element: (
      <>
      <Header/>
      <Channel/>
      </>
    )
  },
  {
    path: "/addChannel",
    element: (
      <>
      <Header/>
      <AddChannel/>
      </>
    )
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
