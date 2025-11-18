import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../Routes/PrivateRoute";

// Pages
import Home from "../Pages/Home";
import Profile from "../Pages/Profile/profile";
import UpdateProfile from "../Pages/Profile/UpdateProfile";
import Signup from "../Pages/Auth/Signup";
import Login from "../Pages/Auth/Login";
import ResetPassword from "../Pages/Auth/ForgotPassword";
import FAQPage from "../Pages/Faq";
import ErrorPage from "../Pages/Error/ErrorPage";
import AllFoods from "../Pages/Foods/AllFoods"
import FoodDetails from "../Pages/Foods/FoodDetails";
import AddFood from "../Pages/Restricted/AddFood";
import ManageFood from "../Pages/Restricted/ManageFood";
import ReqFood from "../Pages/Restricted/ReqFood";
import UpdateFood from "../components/Restricted/UpdateFood";

// Layout
import MainLayout from "../Layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Home page (default)
      {
        index: true,
        element: <Home />,
        loader: () => fetch("/Skills.json"),
      },

      // Public pages
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot-password", element: <ResetPassword /> },
      { path: "foods", element: <AllFoods /> },
      { path: "faq", element: <FAQPage /> },

      // Protected routes
      {
        path: "food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-food",
        element: (
          <PrivateRoute>
            <ManageFood />
          </PrivateRoute>
        ),
      },
      {
        path: "update-food/:id",
        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
      },
      {
        path: "req-food",
        element: (
          <PrivateRoute>
            <ReqFood />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Catch-all route for undefined URLs
  { path: "*", element: <ErrorPage /> },
]);

export default router;
