import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface BrandSection {
  _id: string;
  titleHero: string;
}

interface BrandData {
  _id: string;
  cover: string;
}

interface UpdateModalProps {
  item: BrandSection | BrandData | null;
  onClose: () => void;
  onUpdate: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ item, onClose, onUpdate }) => {
  const [titleHero, setTitleHero] = useState<string>('');
  const [cover, setCover] = useState<File | null>(null);

  useEffect(() => {
    if (item) {
      if ('titleHero' in item) {
        setTitleHero(item.titleHero);
      }
      if ('cover' in item) {
        setCover(null);
      }
    }
  }, [item]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!item) {
      return;
    }

    try {
      const id = item._id;

      if ('titleHero' in item && titleHero) {
        await axios.put(`http://localhost:3005/api/Updatebrandsection/${id}`, { titleHero });
      }

      if ('cover' in item && cover) {
        const formData = new FormData();
        formData.append('cover', cover);
        await axios.put(`http://localhost:3005/api/UpdateBrandData/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      onUpdate();
    } catch (error) {
      console.error('Error updating brand:', error);
    }
  };

  if (!item) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg z-60 relative">
        <h3 className="text-lg font-semibold mb-4">Update {item && 'Brand'}</h3>
        <form onSubmit={handleSubmit}>
          {'titleHero' in item && (
            <div className="mb-4">
              <label className="block text-black mb-2">Title Hero</label>
              <input
                type="text"
                value={titleHero}
                onChange={(e) => setTitleHero(e.target.value)}
                placeholder="Enter Title Hero"
                className="w-full rounded-lg border-[1.5px] border-stroke py-3 px-5 text-black outline-none"
              />
            </div>
          )}

          {'cover' in item && (
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
            className="w-full p-3 mt-2 bg-red-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;