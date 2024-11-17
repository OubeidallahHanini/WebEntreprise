import { useEffect, useState } from 'react';
import { Title } from './common/Title';
import {Card} from './common/Card'; // Assurez-vous que ce chemin est correct

const Expertise = () => {
  const [sectionData, setSectionData] = useState(null);
  const [expertiseData, setExpertiseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const response = await fetch('/api/expertiseSection'); // Assurez-vous que ce chemin correspond à votre API
        if (!response.ok) {
          throw new Error('Failed to fetch section data');
        }
        const data = await response.json();
        setSectionData(data);
      } catch (error) {
        console.error('Error fetching section data:', error);
        setError(error);
      }
    };

    const fetchExpertiseData = async () => {
      try {
        const response = await fetch('/api/expertiseData'); // Assurez-vous que ce chemin correspond à votre API
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

    // Appel des deux fonctions fetch
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



    
    <div>
      {sectionData && (
        <div className='heading-title'>
          <Title title={sectionData[0].title} />
          <p>{sectionData[0].description}</p>
        </div>
      )}
      
      <div className='hero-content grid-4'>
        {expertiseData.map((item) => (
          
          
          <Card
            data={item}
            key={item.id}
            caption='Learn more'
            show={true} // ou une autre logique pour afficher les descriptions
            path='expertiseData'
          />
          
        ))}






      </div>
    </div>
  );
};

export default Expertise;