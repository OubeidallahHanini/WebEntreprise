import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ResetPassword from '../../sections/ResetPassword'; // Assurez-vous que le chemin est correct

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query; // Utilisation du token depuis l'URL
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    if (token) {
      // Ici, vous pouvez vérifier si le token est valide en appelant une API ou en effectuant une autre logique
      // Exemple : vérifier le token auprès d'une API
      // fetch(`/api/validateToken?token=${token}`)
      //   .then(res => res.json())
      //   .then(data => setIsValidToken(data.isValid))
      //   .catch(err => console.error(err));

      // Pour cet exemple, supposons que le token est toujours valide
      setIsValidToken(true);
    }
  }, [token]);

  if (!isValidToken) {
    return <div>Token invalide ou page non trouvée.</div>;
  }

  return (
    <>
      <Head>
        <title>Réinitialisation de mot de passe</title>
        <meta name="description" content="Réinitialisez votre mot de passe en utilisant le lien de réinitialisation envoyé à votre adresse e-mail." />
      </Head>
      <ResetPassword token={token} />
    </>
  );
};

export default ResetPasswordPage;
