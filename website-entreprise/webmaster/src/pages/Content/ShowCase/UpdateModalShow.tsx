import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ShowcaseSection {
  _id: string;
  TitleHero: string;
  titleSection: string;
}

interface ShowcaseData {
  _id: string;
  title: string;
  cover: string;
  category: string;
}

interface UpdateModalProps {
  item: ShowcaseSection | ShowcaseData | null;
  onClose: () => void;
  onUpdate: () => void;
}

const UpdateModalShow: React.FC<UpdateModalProps> = ({ item, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Partial<ShowcaseSection & ShowcaseData>>({});
  const [coverFile, setCoverFile] = useState<File | null>(null);

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!item) return;

    try {
      const id = item._id;

      if ('TitleHero' in item) {
        // It's a ShowcaseSection
        await axios.put(`http://localhost:3005/api/UpdateShowCaseSection/${id}`, formData);
      } else {
        // It's a ShowcaseData
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== undefined) {
            data.append(key, value.toString());
          }
        });
        if (coverFile) {
          data.append('cover', coverFile);
        }
        await axios.put(`http://localhost:3005/api/UpdateShowcaseData/${id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating showcase:', error);
    }
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg z-60 relative">
        <h3 className="text-lg font-semibold mb-4">Update {('TitleHero' in item) ? 'Showcase Section' : 'Showcase Data'}</h3>
        <form onSubmit={handleSubmit}>
          {'TitleHero' in item ? (
            <>
              <div className="mb-4">
                <label className="block text-black mb-2">Title Hero</label>
                <input
                  type="text"
                  name="TitleHero"
                  value={formData.TitleHero || ''}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 text-black outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Title Section</label>
                <input
                  type="text"
                  name="titleSection"
                  value={formData.titleSection || ''}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 text-black outline-none"
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-black mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 text-black outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 text-black outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-black mb-2">Cover Photo</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 text-black outline-none"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full p-3 mt-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModalShow;