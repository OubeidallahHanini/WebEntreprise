import { useEffect, useState } from 'react';
import { Card } from "../components/common/Card";
import { Title, TitleSm } from "../components/common/Title";
import React from 'react';

const Team = () => {
  const [teamData, setTeamData] = useState([]);
  const [teamSection, setTeamSection] = useState({ Title: '', phraseAccroche: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('/api/team'); // Remplace par le bon endpoint API pour les membres de l'équipe
        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }
        const data = await response.json();
        setTeamData(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchTeamSection = async () => {
      try {
        const response = await fetch('/api/teamsection'); // Remplace par le bon endpoint API pour la section de l'équipe
        if (!response.ok) {
          throw new Error('Failed to fetch team section');
        }
        const data = await response.json();
        setTeamSection(data[0]); // Assume que l'API retourne un tableau avec au moins un objet
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTeamData();
    fetchTeamSection();
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section className='agency bg-top'>
        <div className='container'>
          <div className='heading-title'>
          <Title title={teamSection.Title} className='title-bg' />
          <br />
          <TitleSm title={teamSection.phraseAccroche} /> <br />
          </div>
          <div className='grid-4 py'>
            {teamData.map((item) => (
              <Card data={item} key={item._id} caption={item.post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
