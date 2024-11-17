import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateExpertiseSectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpertiseSection = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/expertiseSection/${id}`);
        const expertiseSection = response.data;
        setTitle(expertiseSection.title);
        setDescription(expertiseSection.description);
      } catch (err: any) {
        console.error('Error fetching expertise section:', err.response ? err.response.data : err.message);
        setError(err.response ? err.response.data.error : 'Failed to fetch expertise section');
      }
    };

    fetchExpertiseSection();
  }, [id]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3005/api/expertiseSection/${id}`, {
        title,
        description,
      });
      navigate('/expertise-section');
      console.log('Expertise section updated successfully:', response.data);
    } catch (err: any) {
      console.error('Error updating expertise section:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.error : 'Failed to update expertise section');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-6">
        <h3 className="font-medium text-black dark:text-white">Update Expertise Section</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Section Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Section Title"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Section Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Section Description"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            rows={4}
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Update Section
          </button>
        </div>
      </form>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default UpdateExpertiseSectionPage;
