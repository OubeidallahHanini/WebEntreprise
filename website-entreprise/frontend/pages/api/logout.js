export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const response = await fetch('http://localhost:3005/api/logoutVisitor', {
          method: 'POST',
          credentials: 'include', // Inclure les cookies dans la requête
        });
  
        if (response.ok) {
          res.status(200).json({ message: 'Logged out successfully' });
        } else {
          const data = await response.json();
          res.status(response.status).json(data);
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  