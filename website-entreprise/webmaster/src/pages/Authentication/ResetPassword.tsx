import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3005/api/reset-password/${token}`, {
        newPassword,
        confirmPassword,
      });
      setMessage(response.data.message);
      navigate('/auth/signin');
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 " style={{ marginLeft: '450px' }}>
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            New Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your new password"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm your new password"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-5">
          <input
            type="submit"
            value="Reset Password"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          />
        </div>

        {message && <p>{message}</p>}
      </form>
    </div>
    </div>
    </div>

  );
};

export default ResetPassword;
