import { useEffect, useState } from 'react';
import Link from "next/link";
import { TitleLogo } from "./Title";
import iconMapper from '../iconMapper'; // Assurez-vous que ce chemin est correct

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('/api/FooterData'); // Assurez-vous que ce chemin correspond à votre API
        if (!response.ok) {
          throw new Error('Failed to fetch footer data');
        }
        const data = await response.json();
        setFooterData(data[0]);
        console.log(footerData+'ici footer')
      } catch (error) {
        console.error('Error fetching footer data:', error);
        setError(error);
      }
      setLoading(false);
    };

    fetchFooterData();
  }, []);

  if (loading) {
    return <p>Loading............</p>; // Affiche un indicateur de chargement pendant la récupération des données
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Vérifie que footerData est défini et contient les propriétés attendues
  if (!footerData) {
    return <p>No data available</p>;
  }

  const {
    logoTitle = '',
    logoCaption = '',
    contactInfoDesc = '',
    contactInfoPhone = '',
    contactInfoButton = '',
    companyLinks = [],
    services = [],
    socialLinks = [],
    year = '',
    companyName = ''
  } = footerData;

  return (
    <>
      <footer>
        <div className='container'>
          <div className='grid-4'>
            <div className='logo'>
              <TitleLogo title={footerData.logoTitle} caption={logoCaption} className='logobg' />
              <br />
              <span>
                {contactInfoDesc} <br />
              </span>
              <br />
              <br />
              <h3>{contactInfoPhone}</h3>
              <br />
              <button className='button-primary'>{contactInfoButton}</button>
            </div>
            <ul>
              <h3>COMPANY</h3>
              {companyLinks.length > 0 ? (
                companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.url}>{link.name}</Link>
                  </li>
                ))
              ) : (
                <li>No company links available</li>
              )}
            </ul>
            <ul>
              <h3>SERVICES</h3>
              {services.length > 0 ? (
                services.map((service, index) => (
                  <li key={index}>
                    <Link href={service.url}>{service.name}</Link>
                  </li>
                ))
              ) : (
                <li>No services available</li>
              )}
            </ul>
            <ul>
              <h3>CONNECT</h3>
              <div className='connect'>
                {socialLinks.length > 0 ? (
                  socialLinks.map((social, index) => (
                    <li key={index}>
                      <Link href={social.url}>
                        {iconMapper[social.icon]}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No social links available</li>
                )}
              </div>
            </ul>
          </div>
          <div className='legal connect py'>
            <div className='text'>
              <span>© {year} {companyName}. ALL RIGHTS RESERVED.</span>
            </div>
            <div className='connect'>
              <span>{companyName}</span>
              <span> &nbsp; | &nbsp; </span>
              <span>TERMS & CONDITIONS</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;