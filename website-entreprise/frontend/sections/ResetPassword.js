import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Title } from '../components/common/Title'; // Assurez-vous que le chemin est correct

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  const router = useRouter();
  const { query } = router;

  // Définir la regex pour la complexité du mot de passe
  const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

  useEffect(() => {
    // Extraire le token de l'URL
    if (query.token) {
      setToken(query.token);
      console.log(query.token); // Vérifiez que le token est bien extrait
    }
  }, [query.token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');

    // Vérifiez si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    // Vérifiez la complexité du mot de passe
    if (!passwordComplexityRegex.test(newPassword) && !passwordComplexityRegex.test(confirmPassword) ) {
      setError('Le mot de passe doit contenir au moins 12 caractères, y compris une majuscule, une minuscule, un chiffre et un caractère spécial.');
      return;
    }

    try {
      // Envoyer la demande de réinitialisation du mot de passe à l'API avec le token
      const response = await fetch(`http://localhost:3005/api/reset-passwordVisitor/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword , confirmPassword }),
      });

      if (response.ok) {
        setMessage('Mot de passe réinitialisé avec succès');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Une erreur inattendue est survenue');
      }
    } catch (error) {
      setError('Une erreur inattendue est survenue');
    }
  };

  return (
    <section className='contact bg-top'>
      <div className='container' style={{ marginLeft: '200px' }}>
        <div className='heading-title' style={{ marginLeft: '60px' }}>
          <Title title="Réinitialisez votre mot de passe" className='title-bg' />
        </div>
        <div className='right w-70'>
          <form onSubmit={handleSubmit}>
            {message && <div className="message">{message}</div>}
            {error && <div className="error">{error}</div>}
            <div className='inputs'>
              <span>Nouveau mot de passe</span>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handleInputChange}
                placeholder="Nouveau mot de passe"
                required
              />
            </div>
            <div className='inputs'>
              <span>Confirmation du nouveau mot de passe</span>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirmation du nouveau mot de passe"
                required
              />
            </div>
            <button type="submit" className='secondary-button'>Envoyer</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
