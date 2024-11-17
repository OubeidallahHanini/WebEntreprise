import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Role {
    _id: string;
    name: string;
  }
  
  interface User {
    _id: string;
    username: string;
    email: string;
    numtel: string;
    address: string;
    role: Role;
  }
  
  interface Blog {
    title: string;
    content: string;
    photo?: File;
    author: string;
  }
  

const CreateBlogPage: React.FC = () => {
  const [blog, setBlog] = useState<Partial<Blog>>({ title: '', content: '', author: '' });
  const [authors, setAuthors] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/users', { withCredentials: true });
        setAuthors(response.data);
      } catch (err) {
        setError('Failed to fetch authors');
      }
    };

    fetchAuthors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBlog({ ...blog, photo: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blog.title as string);
    formData.append('content', blog.content as string);
    formData.append('author', blog.author as string);
    if (blog.photo) {
      formData.append('photo', blog.photo);
    }

    try {
      await axios.post('http://localhost:3005/api/blogs', formData, { withCredentials: true });
      navigate('/blogs');
    } catch (err) {
      setError('Failed to create blog');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-6">
        <h3 className="font-medium text-black dark:text-white">Create Blog</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Content</label>
          <textarea
            name="content"
            value={blog.content}
            onChange={handleChange}
            placeholder="Content"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Author</label>
          <select
            name="author"
            value={blog.author}
            onChange={handleChange}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          >
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.username}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Blog
          </button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default CreateBlogPage;
