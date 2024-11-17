import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateShowcase: React.FC = () => {
  // State for ShowcaseData
  const [title, setTitle] = useState<string>('');
  const [cover, setCover] = useState<File | null>(null);
  const [category, setCategory] = useState<string>('');

  // State for ShowcaseSection
  const [titleHero, setTitleHero] = useState<string>('');
  const [titleSection, setTitleSection] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Handle ShowcaseData creation
      if (title || category || cover) {
        const formData = new FormData();
        if (title) formData.append('title', title);
        if (category) formData.append('category', category);
        if (cover) formData.append('cover', cover);

        await axios.post('http://localhost:3005/api/CreateShowcaseData', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Handle ShowcaseSection creation
      if (titleHero || titleSection) {
        await axios.post('http://localhost:3005/api/CreateShowCaseSection', {
          TitleHero: titleHero,
          titleSection,
        });
      }

      // Clear the form after successful submission
      setTitle('');
      setCover(null);
      setCategory('');
      setTitleHero('');
      setTitleSection('');

      // Redirect to the showcase list page
      navigate('/showcaselist');

    } catch (error) {
      console.error('Error creating showcase:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="rounded-sm border border-stroke bg-white shadow-default p-6.5 mb-10">
        <h3 className="font-medium text-black mb-6">Create Showcase</h3>
        <form onSubmit={handleSubmit}>
          {/* ShowcaseData Section */}
          <div className="mb-4">
            <label className="block text-black mb-2">Title (Optional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
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

          <div className="mb-4">
            <label className="block text-black mb-2">Category (Optional)</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter Category"
              className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 text-black outline-none"
            />
          </div>

          {/* ShowcaseSection Section */}
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
            <label className="block text-black mb-2">Title Section (Optional)</label>
            <input
              type="text"
              value={titleSection}
              onChange={(e) => setTitleSection(e.target.value)}
              placeholder="Enter Title Section"
              className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 text-black outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateShowcase;
