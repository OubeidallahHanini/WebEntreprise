import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Logo from '../../images/cover/cover-01.png';



interface Role {
  name: string;
}

interface User {
  id: string;
  username: string;
  role: Role;
  email: string;
  adresse: string;
  numtel: string;
  bio: string;
  photo: string; // Added the photo attribute
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Extract userId from URL parameters
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      // Fetch user details from API using userId
      axios.get<User>(`http://localhost:3005/api/users/${userId}`, { withCredentials: true })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }
  const profilePhotoPath = user.photo ? `http://localhost:3005/uploads/${user.photo}` : 'https://via.placeholder.com/1080x1080';


  return (
    <section className="w-full overflow-hidden dark:bg-gray-900">
      <div className="flex flex-col">
        {/* Cover Image (Static) */}
        <img
          src={Logo}
          alt="User Cover"
          className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
        />

        {/* Profile Image (Dynamic) */}
        <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
          <img
            src={profilePhotoPath} // Use user's profile photo URL if available, otherwise show placeholder
            alt="User Profile"
            className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
          />

          {/* FullName */}
          <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
            {user.username}
          </h1>
        </div>

        <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
          {/* Bio */}
          <p className="w-fit text-gray-700 dark:text-gray-400 text-md">
            {user.bio}
          </p>

          {/* Detail */}
          <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
            <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
              <div className="w-full">
                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Username</dt>
                    <dd className="text-lg font-semibold">{user.username}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                    <dd className="text-lg font-semibold">{user.email}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Address</dt>
                    <dd className="text-lg font-semibold">{user.adresse}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
                    <dd className="text-lg font-semibold">{user.numtel}</dd>
                  </div>
                  <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Role</dt>
                    <dd className="text-lg font-semibold">{user.role.name}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
