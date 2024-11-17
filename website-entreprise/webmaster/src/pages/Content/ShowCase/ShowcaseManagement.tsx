import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import UpdateModal from './UpdateModalShow'; // You'll need to create this component
import { useNavigate } from 'react-router-dom';

interface ShowcaseSection {
  _id: string;
  TitleHero: string;
  titleSection: string;
}

interface ShowcaseData {
  _id: string;
  title: string;
  cover: string;
  category: string;
}

const ShowcaseManagement: React.FC = () => {
  const [showcaseSections, setShowcaseSections] = useState<ShowcaseSection[]>([]);
  const [showcaseDataList, setShowcaseDataList] = useState<ShowcaseData[]>([]);
  const [selectedItem, setSelectedItem] = useState<ShowcaseSection | ShowcaseData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of showcase sections and data
    axios.get('http://localhost:3005/api/AllShowCaseSection').then((response) => {
      setShowcaseSections(response.data);
    });

    axios.get('http://localhost:3005/api/AllShowcaseData').then((response) => {
      setShowcaseDataList(response.data);
    });
  }, []);

  const handleDeleteShowcaseSection = (id: string) => {
    axios.delete(`http://localhost:3005/api/DeleteShowCaseSection/${id}`).then(() => {
      setShowcaseSections((prev) => prev.filter((section) => section._id !== id));
    });
  };

  const handleDeleteShowcaseData = (id: string) => {
    axios.delete(`http://localhost:3005/api/DeleteShowcaseData/${id}`).then(() => {
      setShowcaseDataList((prev) => prev.filter((data) => data._id !== id));
    });
  };

  const openModal = (item: ShowcaseSection | ShowcaseData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const updateList = () => {
    // Refresh the list data
    axios.get('http://localhost:3005/api/AllShowcaseSection').then((response) => {
      setShowcaseSections(response.data);
    });

    axios.get('http://localhost:3005/api/AllShowcaseData').then((response) => {
      setShowcaseDataList(response.data);
    });
  };

  const handleCreate = () => {
    navigate('/create-showcase');
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <button
        onClick={handleCreate}
        className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mb-6"
      >
        <FaPlus className="mr-2" /> Create Showcase
      </button>
      
      <div className="flex space-x-6 mb-8">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Showcase Sections</h3>
          <table className="min-w-full bg-white dark:bg-gray-700">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">Title Hero</th>
                <th className="py-2 px-4 border-b border-gray-300">Title Section</th>
                <th className="py-2 px-4 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {showcaseSections.map((section) => (
                <tr key={section._id}>
                  <td className="py-2 px-4 border-b border-gray-300">{section.TitleHero}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{section.titleSection}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button className="text-blue-500 hover:text-blue-700 mr-4" onClick={() => openModal(section)}>
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteShowcaseSection(section._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Showcase Data</h3>
          <table className="min-w-full bg-white dark:bg-gray-700">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">Title</th>
                <th className="py-2 px-4 border-b border-gray-300">Cover</th>
                <th className="py-2 px-4 border-b border-gray-300">Category</th>
                <th className="py-2 px-4 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {showcaseDataList.map((data) => (
                <tr key={data._id}>
                  <td className="py-2 px-4 border-b border-gray-300">{data.title}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <img src={`http://localhost:3005/uploads/${data.cover}`} alt="Cover" className="h-10 w-10 object-cover rounded-full" />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">{data.category}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button className="text-blue-500 hover:text-blue-700 mr-4" onClick={() => openModal(data)}>
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteShowcaseData(data._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <UpdateModal
          item={selectedItem}
          onClose={closeModal}
          onUpdate={() => {
            updateList();
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default ShowcaseManagement;