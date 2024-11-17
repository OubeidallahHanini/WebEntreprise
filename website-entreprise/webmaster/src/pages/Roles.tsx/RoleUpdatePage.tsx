import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Permission {
  _id: string;
  name: string;
}

interface Role {
  _id: string;
  name: string;
  permissions: Permission[];
}

const RoleUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [role, setRole] = useState<Role | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const roleResponse = await axios.get(`http://localhost:3005/api/roles/${id}`, { withCredentials: true });
        setRole(roleResponse.data);
        setSelectedPermissions(roleResponse.data.permissions.map((permission: Permission) => permission._id));
      } catch (err) {
        setError(error);
      }
    };

    const fetchPermissions = async () => {
      try {
        const permissionsResponse = await axios.get('http://localhost:3005/api/permissions', { withCredentials: true });
        setPermissions(permissionsResponse.data);
      } catch (err) {
        setError(error);
      }
    };

    fetchRole();
    fetchPermissions();
  }, [id]);

  const handlePermissionChange = (permissionId: string) => {
    setSelectedPermissions((prevSelectedPermissions) =>
      prevSelectedPermissions.includes(permissionId)
        ? prevSelectedPermissions.filter((id) => id !== permissionId)
        : [...prevSelectedPermissions, permissionId]
    );
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:3005/api/roles/${id}`,
        { name: role?.name, permissions: selectedPermissions },
        { withCredentials: true }
      );
      navigate('/roles');
    } catch (err) {
      setError(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-6">
        <h3 className="font-medium text-black dark:text-white">Update Role</h3>
      </div>
      {role && (
        <form onSubmit={handleUpdate}>
          <div className="mb-6">
            <label className="block text-black dark:text-white mb-2">Role Name</label>
            <input
              type="text"
              name="name"
              value={role.name}
              onChange={(e) => setRole({ ...role, name: e.target.value })}
              placeholder="Role Name"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black dark:text-white mb-2">Permissions</label>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Permission</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">Permissions</td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex flex-wrap">
                      {permissions.map((permission) => (
                        <div key={permission._id} className="flex items-center mr-4 mb-2">
                          <input
                            type="checkbox"
                            checked={selectedPermissions.includes(permission._id)}
                            onChange={() => handlePermissionChange(permission._id)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2 text-black dark:text-white">{permission.name}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Update Role
            </button>
          </div>
        </form>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default RoleUpdatePage;
