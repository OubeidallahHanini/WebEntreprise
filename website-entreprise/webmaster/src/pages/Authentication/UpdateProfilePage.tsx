import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Role {
  name: string;
  permissions: string[];
}

interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  numtel: string;
  address: string;
  photo: string;
  role: Role;
}

const UpdateProfilePage: React.FC = () => {
  const { userID } = useParams<{ userID: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    _id: '',
    username: '',
    password: '',
    email: '',
    numtel: '',
    address: '',
    photo: '',
    role: { name: '', permissions: [] }
  });
  const [file, setFile] = useState<File | null>(null);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userID) {
      axios.get<User>(`http://localhost:3005/api/user-info/${userID}`)
        .then(response => {
          setUser(response.data);
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handlePasswordToggle = () => {
    setUpdatePassword(prev => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('numtel', formData.numtel);
    formDataToSend.append('adresse', formData.address);
    if (updatePassword && newPassword) {
      formDataToSend.append('password', newPassword);
    }
    if (file) {
      formDataToSend.append('photo', file);
    }

    if (userID) {
      axios.put<User>(`http://localhost:3005/api/user-info/${userID}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log('User updated successfully:', response.data);
          navigate(`/userprofile/${userID}`);
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    }
    
  };

  return (
    <div className="mx-auto max-w-5xl p-4">
      <div className="grid grid-cols-1 gap-8">
        <div className="col-span-1">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Update User Settings</h3>
            </div>
            <div className="p-7 flex">
              <div className="w-full max-w-3xl">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="username"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="mb-5.5">
  <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">
    Email
  </label>
  <div className="relative">
    <span className="absolute left-4.5 top-4">
      <svg
        className="fill-current"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.8">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
            fill=""
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
            fill=""
          />
        </g>
      </svg>
    </span>
    <input
      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
      type="email"
      name="email"
      id="email"
      value={formData.email}
      readOnly
      placeholder="Email"
    />
  </div>
</div>

                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="numtel">
                      Phone Number
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="numtel"
                      id="numtel"
                      value={formData.numtel}
                      onChange={handleChange}
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="address">
                      Address
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Address"
                    />
                  </div>
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="password"
                      name="password"
                      id="password"
                      value={newPassword}
                      onChange={handlePasswordChange}
                      placeholder="New Password"
                      disabled={!updatePassword}
                      required={updatePassword}
                    />
                  </div>
                  <div className="mb-5.5">
                    <label className="inline-flex items-center text-sm font-medium text-black dark:text-white">
                      <input
                        type="checkbox"
                        checked={updatePassword}
                        onChange={handlePasswordToggle}
                        className="mr-2"
                      />
                      Update Password
                    </label>
                  </div>
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="photo">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="inline-flex h-11 items-center justify-center rounded-lg border border-stroke bg-white py-2.5 px-6 text-sm font-medium text-black shadow-default transition-all hover:border-primary hover:text-primary dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:border-primary dark:hover:text-primary"
                      onClick={() => navigate('/userprofile')}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex h-11 items-center justify-center rounded-lg bg-primary py-2.5 px-6 text-sm font-medium text-white shadow-default transition-all hover:bg-opacity-90"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default UpdateProfilePage;
