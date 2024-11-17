import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt:Date ,
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/blogs', { withCredentials: true });
        setBlogs(response.data);
      } catch (err) {
        setError('Failed to fetch blogs');
      }
    };

    fetchBlogs();
  }, []);

  const handleUpdate = (id: string) => {
    navigate(`/update-blog/${id}`);
  };

  const handleDetails = (id: string) => {
    navigate(`/details-blog/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3005/api/blogs/${id}`, { withCredentials: true });
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  const handleCreate = () => {
    navigate('/create-blog');
  };

  const openImage = (image: string) => {
    setEnlargedImage(image);
  };

  const closeImage = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-6 flex justify-between items-center">
        <button
          onClick={handleCreate}
          className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <FaPlus className="mr-2" /> Create Blog
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="py-4 px-4 font-medium text-black dark:text-white">Title</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Content</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Date</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{blog.title}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="truncate">{blog.content}</div>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{new Date(blog.createdAt).toLocaleDateString()}</td>

             
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark flex space-x-2">
                <FaEdit
                  className="text-yellow-500 cursor-pointer hover:text-yellow-600"
                  onClick={() => handleUpdate(blog._id)}
                />
                <FaEye
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                  onClick={() => handleDetails(blog._id)}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  onClick={() => handleDelete(blog._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Enlarged Image Display */}
      {enlargedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg relative">
            <button
              onClick={closeImage}
              className="absolute top-2 right-2 text-black"
            >
              &times;
            </button>
            <img
              src={enlargedImage}
              alt="Enlarged"
              className="max-w-full max-h-screen"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
