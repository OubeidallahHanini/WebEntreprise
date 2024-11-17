// pages/api/expertise-section.js
export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        // Remplacez l'URL par l'URL de votre API de sections "Our Expertise"
        const response = await fetch('http://localhost:3005/api/AllexpertiseSection', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Inclure les cookies dans la requête si nécessaire
        });
  
        if (response.ok) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          const errorData = await response.json();
          res.status(response.status).json(errorData);
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  