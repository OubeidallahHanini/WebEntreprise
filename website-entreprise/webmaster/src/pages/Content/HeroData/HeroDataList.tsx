import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus,FaEye } from 'react-icons/fa';

interface HeroContent {
  icon: string;
  title: string;
}

interface HeroData {
  _id: string;
  title: string;
  caption: string;
  heroTitle: string;
  subHeadings: string[];
  section: {
    headingTitle: string;
    paragraph: string;
    heroContent: HeroContent[];
  };
}

const HeroDataList: React.FC = () => {
  const [heroDataList, setHeroDataList] = useState<HeroData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/AllHeroData');
        setHeroDataList(response.data);
      } catch (err) {
        setError('Failed to fetch hero data');
      }
    };

    fetchHeroData();
  }, []);

  const handleUpdate = (id: string) => {
    navigate(`/update-herodata/${id}`);
  };
  const handleDetails = (id: string) => {
    navigate(`/details-herodata/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3005/api/DeleteHeroData/${id}`);
      setHeroDataList(heroDataList.filter(heroData => heroData._id !== id));
    } catch (err) {
      setError('Failed to delete hero data');
    }
  };

  const handleCreate = () => {
    navigate('/create-herodata');
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="mb-6 ">
        <button
          onClick={handleCreate}
          className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90"
        >
          <FaPlus className="mr-2" /> Add Hero Data
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="py-4 px-4 font-medium text-black dark:text-white">Title</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Caption</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Hero Title</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {heroDataList.map((heroData) => (
            <tr key={heroData._id}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{heroData.title}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{heroData.caption}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{heroData.heroTitle}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark flex space-x-2">
                <FaEdit
                  className="text-yellow-500 cursor-pointer hover:text-yellow-600"
                  onClick={() => handleUpdate(heroData._id)}
                />
                <FaEye
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                  onClick={() => handleDetails(heroData._id)}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  onClick={() => handleDelete(heroData._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HeroDataList;