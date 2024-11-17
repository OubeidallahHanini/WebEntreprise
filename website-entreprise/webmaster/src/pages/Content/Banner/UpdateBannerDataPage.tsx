import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBannerDataPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [titleLogo, setTitleLogo] = useState('');
  const [buttonLabel, setButtonLabel] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/Banner/${id}`);
        const bannerData = response.data;
        setTitle(bannerData.title);
        setTitleLogo(bannerData.titleLogo);
        setButtonLabel(bannerData.buttonLabel);
      } catch (err: any) {
        console.error('Error fetching banner data:', err.response ? err.response.data : err.message);
        setError(err.response ? err.response.data.error : 'Failed to fetch banner data');
      }
    };

    fetchBannerData();
  }, [id]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3005/api/UpdateBanner/${id}`, {
        title,
        titleLogo,
        buttonLabel,
      });
      navigate('/banners');
      console.log('Banner data updated successfully:', response.data);
    } catch (err: any) {
      console.error('Error updating banner data:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.error : 'Failed to update banner data');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-6">
        <h3 className="font-medium text-black dark:text-white">Update Banner Data</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Banner Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Banner Title"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Title Logo</label>
          <input
            type="text"
            value={titleLogo}
            onChange={(e) => setTitleLogo(e.target.value)}
            placeholder="Title Logo URL"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-black dark:text-white mb-2">Button Label</label>
          <input
            type="text"
            value={buttonLabel}
            onChange={(e) => setButtonLabel(e.target.value)}
            placeholder="Button Label"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Update Banner
          </button>
        </div>
      </form>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default UpdateBannerDataPage;
