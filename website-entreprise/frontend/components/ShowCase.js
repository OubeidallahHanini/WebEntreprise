import React, { useEffect, useState } from "react";
import { Title } from "./common/Title";
import { Card } from "./common/Card";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";

const ShowCase = () => {
  const [showcaseData, setShowcaseData] = useState([]);
  const [showcaseSection, setShowcaseSection] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowcaseData = async () => {
      try {
        const response = await fetch('/api/showcase'); // Remplace par le bon endpoint API pour les données des vitrines
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
        const response = await fetch('/api/showcaseSection'); // Remplace par le bon endpoint API pour le titre de la section
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
      <section className='showcase'>
        <div className='container'>
          <div className='heading-title'>
            <Title title={showcaseSection.TitleHero} />
          </div>
          <div className='hero-content grid-3 py'>
            {showcaseData.map((item) => (
              <Card data={item} key={item._id} />
            ))}
          </div>
          <div className='card links'>
            <Link href='/'>
              VIEW ALL CASES <HiOutlineArrowRight className='link-icon' />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShowCase;
