import React, { useEffect, useState } from 'react';
import { Title, TitleLogo, TitleSm } from "../components/common/Title";
import { BlogCard, Brand } from "../components/router";
import Banner from "../components/Banner";
import Expertise from "../components/Expertise";
import ShowCase from "../components/ShowCase";
import Testimonial from "../components/Testimonial";
import iconMapper from '../components/iconMapper'; // Assurez-vous que le chemin est correct


const Hero = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/heroData');
        if (response.ok) {
          const data = await response.json();
          setHeroData(data[0]);
          console.log(data[0]+"yaaaa") // Assuming you want the first entry
        } else {
          console.error('Failed to fetch hero data');
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };

    fetchHeroData();
  }, []);

  if (!heroData) {
    return <p>Loading...</p>; // Handle loading state
  }

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <TitleLogo title={heroData.title} caption={heroData.caption} className='logobg' />
          <h1 className='uppercase hero-title' >{heroData.heroTitle}  </h1>

          <div className='sub-heading'>
            {heroData.subHeadings.map((heading, index) => (
              <React.Fragment key={index}>
                <TitleSm title={heading} />
                {index < heroData.subHeadings.length - 1 && <span>.</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className='hero-sec'>
        <div className='container'>
          <div className='heading-title'>
            <Title title={heroData.section.headingTitle} />
            <p>{heroData.section.paragraph}</p>
          </div>
          <div className='hero-content grid-4'>
          {heroData.section.heroContent.map((item, i) => (
              <div  className='box' key={i}>
                {iconMapper[item.icon]} <br />
                <br />
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Expertise />
      <Banner />
      <Testimonial />
      <ShowCase />
      <Brand />

      <div className='text-center'>
        <Title title='Latest news & articles' />
      </div>
      <BlogCard />
    </>
  );
};

export default Hero;