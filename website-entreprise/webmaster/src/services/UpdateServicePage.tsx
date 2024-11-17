import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateServicePage = () => {
  const { id } = useParams<{ id: string }>(); // Get the service ID from the URL params
  const [name, setName] = useState('');
  const [descriptions, setDescriptions] = useState<string[]>(['']);
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/services/${id}`);
        const service = response.data;
        setName(service.name);
        setDescriptions(service.descriptions);
        // Use the existing photo URL (if any) for display purposes
        // If the backend provides a full URL or filename, you might need additional handling
      } catch (error: any) {
        console.error('Error fetching service:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.error : 'Failed to fetch service');
      }
    };

    fetchService();
  }, [id]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    descriptions.forEach((desc, index) => {
      formData.append(`descriptions[${index}]`, desc);
    });
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await axios.put(`http://localhost:3005/api/services/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/serviceslist');
      console.log('Service updated successfully:', response.data);
    } catch (error: any) {
      console.error('Error updating service:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error : 'Failed to update service');
    }
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const addDescription = () => {
    setDescriptions([...descriptions, '']);
  };

  const removeDescription = (index: number) => {
    const newDescriptions = descriptions.filter((_, i) => i !== index);
    setDescriptions(newDescriptions);
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-6">
        <h3 className="font-medium text-black dark:text-white">Update Service</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Service Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Service Name"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Descriptions</label>
          {descriptions.map((desc, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="text"
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                placeholder="Description"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                required
              />
              <button
                type="button"
                onClick={() => removeDescription(index)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDescription}
            className="text-blue-500 hover:text-blue-700"
          >
            Add Description
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Service Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handlePhotoChange}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Update Service
          </button>
        </div>
      </form>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default UpdateServicePage;
