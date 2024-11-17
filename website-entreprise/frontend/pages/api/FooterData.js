export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('http://localhost:3005/api/AllFooters', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                let data = await response.json();

                // Parcourez les URL dans les données
                data.forEach(item => {
                    // Exemple de traitement des URL
                    console.log(`Traitement de l'URL : ${item.url}`);
                    // Vous pouvez ajouter tout autre traitement ici
                });

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
