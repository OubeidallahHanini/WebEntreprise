import React, { useEffect, useState } from "react";
import { Card } from "../components/common/Card";
import { Title, TitleSm } from "../components/common/Title";

const ShowCase = () => {
  const [showcaseData, setShowcaseData] = useState([]);
  const [showcaseSection, setShowcaseSection] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowcaseData = async () => {
      try {
        const response = await fetch('/api/showcase'); // Remplace par le bon endpoint API pour les données de la vitrine
        if (!response.ok) {
          throw new Error('Failed to fetch showcase data');
        }
        const data = await response.json();
        setShowcaseData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchShowcaseSection = async () => {
      try {
        const response = await fetch('/api/showcaseSection'); // Remplace par le bon endpoint API pour la section de la vitrine
        if (!response.ok) {
          throw new Error('Failed to fetch showcase section');
        }
        const data = await response.json();
        setShowcaseSection(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShowcaseData();
    fetchShowcaseSection();
  }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section className='showcase bg-top'>
        <div className='container'>
          <div className='heading-title'>
          <Title title={showcaseSection.titleSection} className='title-bg' /> <br />

            <br />
            <TitleSm title={showcaseSection.paragraphSection}  />

          </div>
          <br />
          <br />
          <div className='grid-3'>
            {showcaseData.map((item) => (
              <Card data={item} key={item._id} caption={item.post} />
            ))}
          </div>
          <div className='py btn'>
            <button className='secondary-button'>View More</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShowCase;
