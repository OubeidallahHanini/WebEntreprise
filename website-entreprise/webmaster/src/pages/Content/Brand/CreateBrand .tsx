import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateBrand: React.FC = () => {
  const [titleHero, setTitleHero] = useState<string>('');
  const [cover, setCover] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { id } = useParams<{ id?: string }>(); // Get the brand ID from URL params if available
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch brand details for update
      axios.get(`http://localhost:3005/api/brand/${id}`).then((response) => {
        const { titleHero, cover } = response.data;
        setTitleHero(titleHero);
        // Handle cover setup if needed (e.g., set a preview URL)
        setIsUpdating(true);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isUpdating) {
        // Update BrandSection and/or BrandData
        const updateData: any = {};

        if (titleHero) {
          updateData.titleHero = titleHero;
        }

        if (cover) {
          const formData = new FormData();
          formData.append('cover', cover);
          await axios.post(`http://localhost:3005/api/updateBrandData/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }

        await axios.put(`http://localhost:3005/api/updateBrandSection/${id}`, updateData);
      } else {
        // Create BrandSection and/or BrandData
        if (titleHero) {
          await axios.post('http://localhost:3005/api/Createbrandsection', {
            titleHero
          });
        }

        if (cover) {
          const formData = new FormData();
          formData.append('cover', cover);
          await axios.post('http://localhost:3005/api/createBrandData', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
      }

      // Clear the form after successful submission
      setTitleHero('');
      setCover(null);

      // Redirect to the brand list page
      navigate('/brandlist');

    } catch (error) {
      console.error('Error creating or updating brand:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="rounded-sm border border-stroke bg-white shadow-default p-6.5 mb-10">
        <h3 className="font-medium text-black mb-6">{isUpdating ? 'Update Brand' : 'Create Brand'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black mb-2">Title Hero (Optional)</label>
            <input
              type="text"
              value={titleHero}
              onChange={(e) => setTitleHero(e.target.value)}
              placeholder="Enter Title Hero"
              className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 text-black outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-black mb-2">Cover Photo (Optional)</label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setCover(e.target.files[0]);
                }
              }}
              className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 text-black outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isUpdating ? 'Update' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBrand;
