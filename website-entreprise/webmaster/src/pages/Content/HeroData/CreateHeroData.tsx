import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface HeroContent {
  icon: string;
  title: string;
}

const CreateHeroData: React.FC = () => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [subHeadings, setSubHeadings] = useState<string[]>(['']);
  const [sectionHeadingTitle, setSectionHeadingTitle] = useState('');
  const [sectionParagraph, setSectionParagraph] = useState('');
  const [heroContent, setHeroContent] = useState<HeroContent[]>([{ icon: '', title: '' }]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3005/api/CreateHeroData', {
        title,
        caption,
        heroTitle,
        subHeadings,
        section: {
          headingTitle: sectionHeadingTitle,
          paragraph: sectionParagraph,
          heroContent,
        },
      });
      navigate('/herolist');
    } catch (error: any) {
      setError(error.response ? error.response.data.error : 'Failed to create hero data');
    }
  };

  const handleSubHeadingChange = (index: number, value: string) => {
    const newSubHeadings = [...subHeadings];
    newSubHeadings[index] = value;
    setSubHeadings(newSubHeadings);
  };

  const handleHeroContentChange = (index: number, field: 'icon' | 'title', value: string) => {
    const newHeroContent = [...heroContent];
    newHeroContent[index][field] = value;
    setHeroContent(newHeroContent);
  };

  const addSubHeading = () => setSubHeadings([...subHeadings, '']);
  const removeSubHeading = (index: number) => {
    const newSubHeadings = subHeadings.filter((_, i) => i !== index);
    setSubHeadings(newSubHeadings);
  };

  const addHeroContent = () => setHeroContent([...heroContent, { icon: '', title: '' }]);
  const removeHeroContent = (index: number) => {
    const newHeroContent = heroContent.filter((_, i) => i !== index);
    setHeroContent(newHeroContent);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <h2 className="mb-6 text-2xl font-semibold">Create Hero Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Hero Title</label>
          <input
            type="text"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Sub Headings</label>
          {subHeadings.map((subHeading, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={subHeading}
                onChange={(e) => handleSubHeadingChange(index, e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                required
              />
              <button
                type="button"
                onClick={() => removeSubHeading(index)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubHeading}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
          >
            Add Sub Heading
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Section Heading Title</label>
          <input
            type="text"
            value={sectionHeadingTitle}
            onChange={(e) => setSectionHeadingTitle(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Section Paragraph</label>
          <textarea
            value={sectionParagraph}
            onChange={(e) => setSectionParagraph(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Hero Content</label>
          {heroContent.map((content, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={content.icon}
                onChange={(e) => handleHeroContentChange(index, 'icon', e.target.value)}
                placeholder="Icon"
                className="w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                required
              />
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleHeroContentChange(index, 'title', e.target.value)}
                placeholder="Title"
                className="w-1/2 ml-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                required
              />
              <button
                type="button"
                onClick={() => removeHeroContent(index)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addHeroContent}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
          >
            Add Hero Content
          </button>
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-primary text-white rounded-lg hover:bg-opacity-90"
        >
          Create Hero Data
        </button>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default CreateHeroData;
