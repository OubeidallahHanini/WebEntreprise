export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { username, password, email } = req.body;
      
  
      if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      try {
        // Assure-toi que les cookies sont inclus dans la requête
        const response = await fetch('http://localhost:3005/api/registerVisitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, email }),
          credentials: 'include', // Inclure les cookies dans la requête
        });
  
        if (response.ok) {
          const data = await response.json();
          res.status(201).json(data);
        } else {
          const errorData = await response.json();
          res.status(response.status).json(errorData);
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
  