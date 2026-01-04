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
import About from "../Pages/About";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import ManageFoods from "../Pages/Admin/ManageFood";
import ManageUsers from "../Pages/Admin/ManageUsers;";
import AdminStats from "../Pages/Admin/AdminStats";
import ActivityPage from "../Pages/Admin/ActivityPage";
import Test from "../Pages/Dashboard/Test";
import MyRequests from "../Pages/Restricted/MyRequests";
import AdminRoute from "./AdminRoute";

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
      { path: "about", element: <About /> },
      { path: "faq", element: <FAQPage /> },

      // Protected routes
      {
        path: "food/:id",
        element: (
            <FoodDetails />
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
      // {
      //   path: "update-profile",
      //   element: (
      //     <PrivateRoute>
      //       <UpdateProfile />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "my-requests",
        element: (
          <PrivateRoute>
            <MyRequests />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
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
        path: "food/:id",
        element: (
            <FoodDetails />
        ),
      },
      { //for user
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
        path: "my-requests",
        element: (
          <PrivateRoute>
            <MyRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers/>
          </AdminRoute>
        ),
      },
      {
        path: "manage-foods",
        element: (
          <AdminRoute>
            <ManageFoods />
          </AdminRoute>
        ),
      },
      {
        path: "stats",
        element: (
          <AdminRoute>
            <AdminStats/>
          </AdminRoute>
        ),
      },
      {
        path: "activity",
        element: (
          <AdminRoute>
            <ActivityPage />
          </AdminRoute>
        ),
      },
      {
        path: "test",
        element: <Test />
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
