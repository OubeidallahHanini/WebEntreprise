import React, { useEffect, useState } from "react";
import { Title } from "./common/Title";
import Image from 'next/image';

const Brand = () => {
  const [brandData, setBrandData] = useState([]);
  const [brandSection, setBrandSection] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await fetch('/api/brand'); // Remplace par le bon endpoint API pour les données des marques
        if (!response.ok) {
          throw new Error('Failed to fetch brand data');
        }
        const data = await response.json();
        setBrandData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchBrandSection = async () => {
      try {
        const response = await fetch('/api/brandsection'); // Remplace par le bon endpoint API pour le titre de la section
        if (!response.ok) {
          throw new Error('Failed to fetch brand section title');
        }
        const data = await response.json();
        setBrandSection(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
    fetchBrandSection();
  }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section className='brand'>
        <div className='container'>
          <div className='heading-title'>
            <Title title={brandSection.titleHero } />
          </div>
          <div className='brand-content grid-6 py'>
            {brandData.map((item) => (
              <div className='images' >
                {/* <Image 
                  src={item.cover} 
                  alt={`Brand ${item._id}`} 
                  layout='responsive' 
                  width={100} 
                  height={100} 
                  objectFit='contain'
                /> */}

<Image src={`http://localhost:3005/photos/${item.cover}`}  width={300} height={200} objectFit='cover' />


              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Brand;
