import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/common/Layout";
import Register from "../pages/auth/Register";
import HomeScreen from "../pages/screen/HomeScreen";
import SignIn from "../pages/auth/SignIn";
import PrivateRoute from "./privateRoute";

export const mainRoute = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <HomeScreen />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);
