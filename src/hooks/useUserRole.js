import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const API_BASE = "https://plateshare-api-server-beige.vercel.app";

const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      setRole(null);
      setLoading(false);
      return;
    }

    const loadRole = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/users/role?email=${user.email}`);
        if (!res.ok) throw new Error("Failed to fetch role");

        const data = await res.json();

        // Normalize role: trim spaces and capitalize first letter
        const fetchedRole =
          data?.role?.toString().trim().toLowerCase() === "admin"
            ? "Admin"
            : "User";

        setRole(fetchedRole);
      } catch (err) {
        console.error("Error fetching role:", err);
        setError("Failed to load role");
        setRole("User"); // fallback to User
      } finally {
        setLoading(false);
      }
    };

    loadRole();
  }, [user?.email]);

  return { role, loading, error };
};

export default useUserRole;
