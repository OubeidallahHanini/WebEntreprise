import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaUserPlus ,FaEye} from 'react-icons/fa';

interface Role {
  _id: string;
  name: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  numtel: string;
  address: string;
  role: Role;
}

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/users', { withCredentials: true });
        setUsers(response.data);
      } catch (err) {
        setError(error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = (id: string) => {
    navigate(`/update-user/${id}`);
  };

  const handleDetails = (id: string) => {
    navigate(`/details-user/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3005/api/users/${id}`, { withCredentials: true });
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      setError(error);
    }
  };

  const handleCreate = () => {
    navigate('/create-user');
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-6 flex justify-between items-center">
        <button
          onClick={handleCreate}
          className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <FaUserPlus className="mr-2" /> Create User
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="py-4 px-4 font-medium text-black dark:text-white">Username</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Email</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Numtel</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Adresse</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Role</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{user.username}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{user.email}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{user.numtel}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{user.address}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{user.role.name}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark flex space-x-2">
                <FaEdit
                  className="text-yellow-500 cursor-pointer hover:text-yellow-600"
                  onClick={() => handleUpdate(user._id)}
                />

<FaEye
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                  onClick={() => handleDetails(user._id)}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  onClick={() => handleDelete(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
