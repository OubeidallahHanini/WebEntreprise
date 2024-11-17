import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateExpertisePage = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState<{ text: string }[]>([{ text: '' }]);
  const [cover, setCover] = useState<File | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/expertiseData/${id}`);
        const expertise = response.data;
        setTitle(expertise.title);
        setDesc(expertise.desc);
      } catch (error: any) {
        console.error('Error fetching expertise:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.error : 'Failed to fetch expertise');
      }
    };

    fetchExpertise();
  }, [id]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    desc.forEach((item, index) => {
      formData.append(`desc[${index}][text]`, item.text);
    });
    if (cover) {
      formData.append('cover', cover);
    }

    try {
      const response = await axios.put(`http://localhost:3005/api/expertiseData/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/expertises');
      console.log('Expertise updated successfully:', response.data);
    } catch (error: any) {
      console.error('Error updating expertise:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error : 'Failed to update expertise');
    }
  };

  const handleDescChange = (index: number, value: string) => {
    const newDesc = [...desc];
    newDesc[index] = { text: value };
    setDesc(newDesc);
  };

  const addDesc = () => {
    setDesc([...desc, { text: '' }]);
  };

  const removeDesc = (index: number) => {
    const newDesc = desc.filter((_, i) => i !== index);
    setDesc(newDesc);
  };

  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCover(event.target.files[0]);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-6">
        <h3 className="font-medium text-black dark:text-white">Update Expertise</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Expertise Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Expertise Title"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Descriptions</label>
          {desc.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleDescChange(index, e.target.value)}
                placeholder="Description"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                required
              />
              <button
                type="button"
                onClick={() => removeDesc(index)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDesc}
            className="text-blue-500 hover:text-blue-700"
          >
            Add Description
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Cover Image</label>
          <input
            type="file"
            onChange={handleCoverChange}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Update Expertise
          </button>
        </div>
      </form>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default UpdateExpertisePage;