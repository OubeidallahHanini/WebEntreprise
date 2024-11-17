import { useEffect, useState } from "react";
import { Card } from "../components/common/Card";
import { Title, TitleSm } from "../components/common/Title";
import React from "react";

const Services = () => {
  const [sectionData, setSectionData] = useState(null);
  const [expertiseData, setExpertiseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const response = await fetch('/api/allServicePage'); // Remplacez par l'URL de votre API pour les deux premiers champs
        if (!response.ok) {
          throw new Error('Failed to fetch section data');
        }
        const data = await response.json();
        setSectionData(data[0]);
      } catch (error) {
        console.error('Error fetching section data:', error);
        setError(error);
      }
    };

    const fetchExpertiseData = async () => {
      try {
        const response = await fetch('/api/expertiseData'); // Assurez-vous que ce chemin correspond à votre API pour les données d'expertise
        if (!response.ok) {
          throw new Error('Failed to fetch expertise data');
        }
        const data = await response.json();
        setExpertiseData(data);
      } catch (error) {
        console.error('Error fetching expertise data:', error);
        setError(error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchSectionData(), fetchExpertiseData()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading............</p>; // Affiche un indicateur de chargement pendant la récupération des données
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <section className='agency bg-top'>
        <div className='container'>
          <div className='heading-title'>
            {sectionData && (
              <>
                <TitleSm title={sectionData.title} />
                <br />
                <br />
                <Title title={sectionData.subtitle} />
              </>
            )}
          </div>
          <div className='grid-2 py'>
            {expertiseData.map((item) => (
              <Card data={item} key={item.id} caption={item.post} show={true} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;