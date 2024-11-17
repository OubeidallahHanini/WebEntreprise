import React, { useEffect, useState } from "react";
import { TitleSm } from "./common/Title";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image  from 'next/image';

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className='slick-arrow'>
      <button className='next' onClick={onClick}>
        <RiArrowRightSLine size={25} />
      </button>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className='slick-arrow'>
      <button className='prev' onClick={onClick}>
        <RiArrowLeftSLine size={25} />
      </button>
    </div>
  );
}

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonialData'); // Assurez-vous que ce chemin correspond à votre API
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  if (loading) {
    return <p>Loading...</p>; // Affiche un indicateur de chargement pendant la récupération des données
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  console.log(testimonials)

  return (
    <>
      <section className='testimonial'>
        <div className='container'>
          <div className='heading-title'>
            <TitleSm title='WHAT CLIENTS SAY ABOUT OUR WORK' />
          </div>
          <div className='cards'>
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <div key={index}>
                  <div className='card'>
                    <div className='image'>
                      <div className='img'>
                        <Image src={`http://localhost:3005/photos/${testimonial.cover}`}  width={150} height={300}  />
                      </div>
                      <div className='img-text'>
                        <h3>{testimonial.name}</h3>
                        <span>{testimonial.post}</span>
                      </div>
                    </div>
                    <div className='details'>
                      <p>{testimonial.desc}</p>
                      <Link href='/#'>
                        VIEW CASE <HiOutlineArrowRight className='link-icon' />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
