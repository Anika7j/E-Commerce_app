import { useEffect, useState } from "react"
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice"
import Message from "../../components/Message"

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState<string | null>(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId).unwrap();
        toast.success("User deleted successfully");
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  const handleUpdate = async (userId: string) => {
    try {
      await updateUser({
        userId,
        name: editableUserName,
        email: editableUserEmail,
      }).unwrap();
      toast.success("User updated successfully");
      setEditableUserId(null);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="flex justify-center text-2xl font-semibold mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 text-black">{user._id}</td>
                  <td className="px-4 py-2 text-black">
                    {editableUserId === user._id ? (
                      <input
                        type="text"
                        value={editableUserName}
                        onChange={(e) => setEditableUserName(e.target.value)}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="px-4 py-2 text-black">
                    {editableUserId === user._id ? (
                      <input
                        type="email"
                        value={editableUserEmail}
                        onChange={(e) => setEditableUserEmail(e.target.value)}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="px-4 py-2 text-black">
                    {user.isAdmin ? <FaCheck /> : <FaTimes />}
                  </td>
                  <td className="px-4 py-2 text-black">
                    {editableUserId === user._id ? (
                      <button
                        onClick={() => handleUpdate(user._id)}
                        className="bg-blue-900 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditableUserId(user._id);
                          setEditableUserName(user.name);
                          setEditableUserEmail(user.email);
                        }}
                        className="px-2 py-1 rounded hover:cursor-pointer"
                      >
                        <FaEdit />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className=" px-2 py-1 rounded ml-2 hover:cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;