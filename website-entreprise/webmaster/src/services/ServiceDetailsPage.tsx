import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Service {
  name: string;
  photo: string;
  descriptions: string[];
}

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ensure `id` is typed as a string
  const [service, setService] = useState<Service | null>(null); // Correct typing for state

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get<Service>(`http://localhost:3001/api/services/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };

    fetchServiceDetails();
  }, [id]);

  if (!service) return <p>Loading...</p>;

  return (
    <div className="rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white px-8 py-10 shadow-lg dark:bg-boxdark sm:px-10 lg:px-12">
    <div className="max-w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        <img
          src={service.photo}
          alt={service.name}
          className="w-full md:w-64 h-auto object-cover rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-black dark:text-white mb-4">{service.name}</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            {service.descriptions.map((desc, index) => (
              <li key={index} className="text-base">
                {desc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
  

  );
};

export default ServiceDetailsPage;
