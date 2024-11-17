import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Blog {
  _id: string;
  title: string;
  content: string;
  photo?: string;
  author: {
    _id: string;
    username: string;
  };
  likes: string[];
  comments: {
    user: {
      username: string;
    };
    content: string;
    createdAt: Date;
  }[];
  createdAt: Date;
}

const BlogUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatedContent, setUpdatedContent] = useState<string>('');
  const [updatedTitle, setUpdatedTitle] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/blogs/${id}`, { withCredentials: true });
        setBlog(response.data);
        setUpdatedTitle(response.data.title);
        setUpdatedContent(response.data.content);
      } catch (err) {
        setError('Failed to fetch blog details');
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', updatedTitle);
    formData.append('content', updatedContent);

    if (selectedFile) {
      formData.append('photo', selectedFile);
    }

    try {
      await axios.put(
        `http://localhost:3005/api/blogs/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true
        }
      );
      navigate('/blogs');
    } catch (err) {
      setError('Failed to update blog');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-6">
        <h3 className="text-3xl font-bold text-black dark:text-white">Update Blog</h3>
      </div>
      {blog ? (
        <form onSubmit={handleUpdate}>
          <div className="mb-6">
            <label className="block text-black dark:text-white mb-2">Title</label>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              placeholder="Title"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black dark:text-white mb-2">Content</label>
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              placeholder="Content"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              rows={6}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black dark:text-white mb-2">Upload Photo (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Update Blog
            </button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default BlogUpdatePage;
