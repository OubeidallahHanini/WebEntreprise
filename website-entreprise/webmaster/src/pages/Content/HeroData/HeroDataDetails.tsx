import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface HeroContent {
  icon: string;
  title: string;
}

interface HeroData {
  title: string;
  caption: string;
  heroTitle: string;
  subHeadings: string[];
  section: {
    headingTitle: string;
    paragraph: string;
    heroContent: HeroContent[];
  };
}

const HeroDataDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/HeroData/${id}`);
        setHeroData(response.data);
      } catch (error: any) {
        setError(error.response ? error.response.data.error : 'Failed to fetch hero data');
      }
    };

    fetchHeroData();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!heroData) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <h2 className="mb-6 text-2xl font-semibold">{heroData.title}</h2>
      <p className="mb-4 text-lg text-black dark:text-white">{heroData.caption}</p>

      <div className="mb-4">
        <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Hero Title</h3>
        <p className="text-black dark:text-white">{heroData.heroTitle}</p>
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Sub Headings</h3>
        <ul className="list-disc list-inside">
          {heroData.subHeadings.map((subHeading, index) => (
            <li key={index} className="text-black dark:text-white">{subHeading}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Section Heading Title</h3>
        <p className="text-black dark:text-white">{heroData.section.headingTitle}</p>
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Section Paragraph</h3>
        <p className="text-black dark:text-white">{heroData.section.paragraph}</p>
      </div>

      <div>
        <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">Hero Content</h3>
        {heroData.section.heroContent.map((content, index) => (
          <div key={index} className="mb-2">
            <p className="text-black dark:text-white"><span className="font-semibold">Icon:</span> {content.icon}</p>
            <p className="text-black dark:text-white"><span className="font-semibold">Title:</span> {content.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroDataDetails;
