import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const AdminRoute = ({ children }) => {
  const { role, loading } = useUserRole();

  if (loading) return <p>Loading...</p>;

  if (role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
