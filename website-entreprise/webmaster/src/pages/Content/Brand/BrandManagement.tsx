import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import UpdateModal from './UpdateModal'; // Import the modal component
import { useNavigate } from 'react-router-dom';

interface BrandSection {
  _id: string;
  titleHero: string;
}

interface BrandData {
  _id: string;
  cover: string;
}

const BrandManagement: React.FC = () => {
  const [brandSections, setBrandSections] = useState<BrandSection[]>([]);
  const [brandDataList, setBrandDataList] = useState<BrandData[]>([]);
  const [selectedItem, setSelectedItem] = useState<BrandSection | BrandData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of brand sections and data
    axios.get('http://localhost:3005/api/Allbrandsection').then((response) => {
      setBrandSections(response.data);
    });

    axios.get('http://localhost:3005/api/allBrandData').then((response) => {
      setBrandDataList(response.data);
    });
  }, []);

  const handleDeleteBrandSection = (id: string) => {
    axios.delete(`http://localhost:3005/api/Deletebrandsection/${id}`).then(() => {
      setBrandSections((prev) => prev.filter((section) => section._id !== id));
    });
  };

  const handleDeleteBrandData = (id: string) => {
    axios.delete(`http://localhost:3005/api/DeleteBrandData/${id}`).then(() => {
      setBrandDataList((prev) => prev.filter((data) => data._id !== id));
    });
  };

  const openModal = (item: BrandSection | BrandData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const updateList = () => {
    // Refresh the list data
    axios.get('http://localhost:3005/api/Allbrandsection').then((response) => {
      setBrandSections(response.data);
    });

    axios.get('http://localhost:3005/api/allBrandData').then((response) => {
      setBrandDataList(response.data);
    });
  };

  const handleCreate = () => {
    navigate('/create-brand');
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
 <button
          onClick={handleCreate}
          className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <FaPlus className="mr-2" /> Create Brand
        </button>  
        <br>
        </br>   
        <br>
        </br>  
      <div className="flex space-x-6 mb-8">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Brand Sections</h3>
          <table className="min-w-full bg-white dark:bg-gray-700">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">Title</th>
                <th className="py-2 px-4 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brandSections.map((section) => (
                <tr key={section._id}>
                  <td className="py-2 px-4 border-b border-gray-300">{section.titleHero}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button className="text-blue-500 hover:text-blue-700 mr-4" onClick={() => openModal(section)}>
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteBrandSection(section._id)}
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
          <h3 className="text-xl font-semibold mb-4">Brand Data</h3>
          <table className="min-w-full bg-white dark:bg-gray-700">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300">Cover</th>
                <th className="py-2 px-4 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brandDataList.map((data) => (
                <tr key={data._id}>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <img src={`http://localhost:3005/uploads/${data.cover}`} alt="Cover" className="h-10 w-10 object-cover rounded-full" />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button className="text-blue-500 hover:text-blue-700 mr-4" onClick={() => openModal(data)}>
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteBrandData(data._id)}
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

export default BrandManagement;
