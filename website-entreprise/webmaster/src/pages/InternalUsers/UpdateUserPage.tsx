import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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

const UserUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3005/api/users/${id}`, { withCredentials: true });
        setUser(userResponse.data);
      } catch (err) {
        setError(error);
      }
    };

    const fetchRoles = async () => {
      try {
        const rolesResponse = await axios.get('http://localhost:3005/api/roles', { withCredentials: true });
        setRoles(rolesResponse.data);
      } catch (err) {
        setError(error);
      }
    };

    fetchUser();
    fetchRoles();
  }, [id]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedData: Partial<User> & { password?: string } = {
      username: user?.username,
      email: user?.email,
      numtel: user?.numtel,
      address: user?.address,
      role: user?.role,
    };
    if (password) {
      updatedData.password = password;
    }

    try {
      await axios.put(
        `http://localhost:3005/api/users/${id}`,
        updatedData,
        { withCredentials: true }
      );
      console.log('updated user :',updatedData);
      navigate('/internalusers');
    } catch (err) {
      setError(error);
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = roles.find(role => role._id === e.target.value);
    if (selectedRole && user) {
      setUser({ ...user, role: selectedRole });
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-6">
        <h3 className="font-medium text-black dark:text-white">Update User</h3>
      </div>
      {user && (
        <form onSubmit={handleUpdate}>
          <div className="mb-6">
            <label className="block text-black dark:text-white mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Username"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black dark:text-white mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="Email"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              disabled
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black dark:text-white mb-2">Numtel</label>
            <input
              type="text"
              name="numtel"
              value={user.numtel}
              onChange={(e) => setUser({ ...user, numtel: e.target.value })}
              placeholder="Numtel"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black dark:text-white mb-2">Adresse</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              placeholder="Adresse"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black dark:text-white mb-2">Role</label>
            <select
              name="role"
              value={user.role._id}
              onChange={handleRoleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              required
            >
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-black dark:text-white mb-2">Password (Optional)</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Update User
            </button>
          </div>
        </form>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default UserUpdatePage;
