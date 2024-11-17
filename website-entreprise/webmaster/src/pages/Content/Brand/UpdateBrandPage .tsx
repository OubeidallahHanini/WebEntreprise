import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateBrandPage = () => {
  const { id } = useParams<{ id: string }>(); // Assuming the ID is passed as a route parameter
  const [titleHero, setTitleHero] = useState<string>('');
  const [cover, setCover] = useState<File | null>(null);

  useEffect(() => {
    // Fetch the existing data when the component mounts
    const fetchData = async () => {
      try {
        const brandSectionResponse = await axios.get(`http://localhost:3005/api/brandsection/${id}`);
        const brandDataResponse = await axios.get(`http://localhost:3005/api/BrandData/${id}`);
        
        setTitleHero(brandSectionResponse.data.titleHero);
        // You can display the existing cover file if needed.
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Update BrandSection
      const brandSectionResponse = await axios.put(`http://localhost:3005/api/Updatebrandsection/${id}`, {
        titleHero,
      });

      // Update BrandData with a file upload
      if (cover) {
        const formData = new FormData();
        formData.append('cover', cover);

        const brandDataResponse = await axios.put(`http://localhost:3005/api/UpdateBrandData/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Brand Data updated:', brandDataResponse.data);
      }

      // Clear the form after successful submission
      setTitleHero('');
      setCover(null);

      console.log('Brand Section updated:', brandSectionResponse.data);

    } catch (error) {
      console.error('Error updating brand:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="rounded-sm border border-stroke bg-white shadow-default p-6.5 mb-10">
        <h3 className="font-medium text-black mb-6">Update Brand</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black mb-2">Title Hero</label>
            <input
              type="text"
              value={titleHero}
              onChange={(e) => setTitleHero(e.target.value)}
              placeholder="Enter Title Hero"
              className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 text-black outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black mb-2">Cover Photo</label>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBrandPage;
