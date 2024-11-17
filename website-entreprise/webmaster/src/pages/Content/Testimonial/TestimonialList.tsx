import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Testimonial {
  _id: string;
  name: string;
  cover: string;
  post: string;
  desc: string;
}

const TestimonialList: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/AlltestimonialData');
        setTestimonials(response.data);
      } catch (err) {
        setError('Failed to fetch testimonials');
      }
    };
    fetchTestimonials();
  }, []);

  const handleUpdate = (id: string) => {
    navigate(`/update-testimonial/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3005/api/testimonialData/${id}`);
      setTestimonials(testimonials.filter(testimonial => testimonial._id !== id));
    } catch (err) {
      setError('Failed to delete testimonial');
    }
  };

  const handleCreate = () => {
    navigate('/create-testimonial');
  };

  const openImage = (image: string) => {
    setEnlargedImage(image);
  };

  const closeImage = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="mb-6 items-center">
        <button
          onClick={handleCreate}
          className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <FaPlus className="mr-2" /> Create Testimonial
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="py-4 px-4 font-medium text-black dark:text-white">Cover</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Name</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Post</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Description</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial) => (
            <tr key={testimonial._id}>
               <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <img
                  src={`http://localhost:3005/uploads/${testimonial.cover}`}
                  alt={testimonial.name}
                  className="h-10 w-10 object-cover rounded-full cursor-pointer"
                  onClick={() => openImage(`http://localhost:3005/uploads/${testimonial.cover}`)}
                />
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{testimonial.name}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{testimonial.post}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{testimonial.desc}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark flex space-x-2">
                <FaEdit
                  className="text-yellow-500 cursor-pointer hover:text-yellow-600"
                  onClick={() => handleUpdate(testimonial._id)}
                />
              
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  onClick={() => handleDelete(testimonial._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Enlarged Image Display */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeImage}
        >
          <div className="relative">
            <img
              src={enlargedImage}
              alt="Enlarged"
              className="w-80 h-80 object-cover rounded-md"
            />
            <button
              className="absolute top-2 right-2 text-white text-xl font-bold"
              onClick={closeImage}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );

};

export default TestimonialList;