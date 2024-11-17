import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTestimonial: React.FC = () => {
  const [name, setName] = useState('');
  const [post, setPost] = useState('');
  const [desc, setDesc] = useState('');
  const [cover, setCover] = useState<File | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('post', post);
    formData.append('desc', desc);
    if (cover) {
      formData.append('cover', cover);
    }

    try {
      await axios.post('http://localhost:3005/api/CreatetestimonialData', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/testimonials');
    } catch (error: any) {
      console.error('Error creating testimonial:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error : 'Failed to create testimonial');
    }
  };

  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCover(event.target.files[0]);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <h2 className="mb-6 text-2xl font-semibold">Create Testimonial</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Post</label>
          <input
            type="text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Cover Image</label>
          <input
            type="file"
            onChange={handleCoverChange}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-primary text-white rounded-lg hover:bg-opacity-90"
        >
          Create Testimonial
        </button>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default CreateTestimonial;