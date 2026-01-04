import { useEffect, useState } from "react";
import { FiUser, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const fetchUsers = () => {
    setLoading(true);
    fetch(
      `https://plateshare-api-server-beige.vercel.app/admin/users?role=${roleFilter}&page=${currentPage}&limit=${itemsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, currentPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const res = await fetch(`https://plateshare-api-server-beige.vercel.app/admin/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("✅ User deleted successfully");
      fetchUsers();
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      const res = await fetch(`https://plateshare-api-server-beige.vercel.app/admin/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        toast.success(`✅ Role updated to ${role}`);
        fetchUsers();
      } else {
        toast.error("❌ Failed to update role");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong");
    }
  };

  const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString();

   if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loader.gif" alt="loader" />
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl text-primary font-bold mb-4">Manage Users</h2>

      {/* Role Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {["All", "Admin", "User"].map((role) => (
          <button
            key={role}
            onClick={() => {
              setRoleFilter(role);
              setCurrentPage(1);
            }}
            className={`btn btn-sm ${roleFilter === role ? "btn-primary" : "btn-outline"}`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="table">
          <thead className="secondary-bg">
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      <img src={user.photoURL || "/Avatar.jpeg"} alt={user.displayName || "User"} />
                    </div>
                  </div>
                </td>
                <td>{user.displayName || user.name || "User"}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{user.role}</td>
                <td className="flex gap-2">
                  {/* Make User */}
                  <button
                    onClick={() => handleRoleChange(user._id, "User")}
                    className="btn btn-sm btn-outline flex items-center gap-1"
                    title="Make User"
                  >
                    <FiUser />
                  </button>

                  {/* Make Admin */}
                  <button
                    onClick={() => handleRoleChange(user._id, "Admin")}
                    className="btn btn-sm btn-outline flex items-center gap-1"
                    title="Make Admin"
                  >
                    <FiShield />
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="btn btn-sm"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="btn btn-sm"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
