import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface ExpertiseSection {
  _id: string;
  title: string;
  description: string;
}

const ExpertiseSectionList: React.FC = () => {
  const [sections, setSections] = useState<ExpertiseSection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/AllExpertiseSection', { withCredentials: true });
        setSections(response.data);
      } catch (err) {
        setError('Failed to fetch expertise sections');
      }
    };

    fetchSections();
  }, []);

  const handleUpdate = (id: string) => {
    navigate(`/update-expertise-section/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3005/api/expertiseSection/${id}`, { withCredentials: true });
      setSections(sections.filter(section => section._id !== id));
    } catch (err) {
      setError('Failed to delete expertise section');
    }
  };

  const handleCreate = () => {
    navigate('/create-expertise-section');
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-6 flex justify-between items-center">
        <button
          onClick={handleCreate}
          className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <FaPlus className="mr-2" /> Create Expertise Section
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="py-4 px-4 font-medium text-black dark:text-white">Title</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Description</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <tr key={section._id}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{section.title}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{section.description}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark flex space-x-2">
                <FaEdit
                  className="text-yellow-500 cursor-pointer hover:text-yellow-600"
                  onClick={() => handleUpdate(section._id)}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  onClick={() => handleDelete(section._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpertiseSectionList;
