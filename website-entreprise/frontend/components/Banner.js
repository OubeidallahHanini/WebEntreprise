import React, { useEffect, useState } from "react";
import { Title, TitleLogo } from "./common/Title";

const Banner = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch('/api/bannerData', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Inclure les cookies dans la requête si nécessaire
        });

        if (response.ok) {
          const data = await response.json();
          setBannerData(data[0]); // Assurez-vous de récupérer la première bannière pour cet exemple
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch banner data:', errorData);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBannerData();
  }, []);

  if (!bannerData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className='banner'>
        <div className='container'>
          <div>
            <Title title={bannerData.title} /> <br />
            <TitleLogo title={bannerData.titleLogo} />
          </div>
          <div>
            <button className='button-primary'>{bannerData.buttonLabel}</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
