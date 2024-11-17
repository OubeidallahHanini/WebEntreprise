import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Désactive le bodyParser intégré de Next.js pour cette route API
  },
};

export default async function handler(req, res) {

  if (req.method === 'PUT') {
    const VisitorId = req.query.VisitorId;

    const form = formidable({ multiples: false, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la soumission du formulaire.' });
        return;
      }

      try {
        const formData = new FormData();

        // Ajoutez les champs du formulaire
        for (const [key, value] of Object.entries(fields)) {
          formData.append(key, value);
        }

        // Vérifiez que le fichier photo est bien présent avant de l'ajouter
        if (files.photo && files.photo.filepath) {
          const fileStream = fs.createReadStream(files.photo.filepath);
          formData.append('photo', fileStream, files.photo.originalFilename);
          console.log("ICI")
        }

        // Appel à l'API backend avec fetch
        const response = await fetch(`http://localhost:3005/api/UpdateVisitor/${VisitorId}`, {
          method: 'PUT',
          body: formData,
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
    });
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}