import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePermissionPage = () => {
  const { id } = useParams(); // Get the permission ID from the URL params
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current permission details when the component mounts
    const fetchPermission = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/permissions/${id}`, {
          withCredentials: true, // Include credentials (e.g., cookies)
        });
        setName(response.data.name);
        console.log('name ',response.data.name) ;
      } catch (err) {
        setError(error);
      }
    };

    fetchPermission();
  }, [id]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3005/api/permissions/${id}`, { name }, {
        withCredentials: true, // Include credentials (e.g., cookies)
      });
      alert('Permission updated successfully');
      navigate('/permissions'); // Navigate to the permissions page
    } catch (err) {
      setError(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Update Permission</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Permission Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter permission name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            />
          </div>

          {error && (
            <div className="mb-4 text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Update Permission
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePermissionPage;
