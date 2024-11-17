import { useState } from 'react';
import { Title } from '../components/common/Title'; // Assurez-vous que le chemin est correct
import { useAuth } from '../context/AuthContext'; // Importer le contexte d'authentification


const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const { forgetPassword } = useAuth(); // Utiliser la fonction de connexion du contexte


  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');
    console.log(email)

    const result = await forgetPassword(email); // Appeler la fonction de connexion du contexte

    if (!result.ok) {
      setError(result.message || 'An unexpected error occurred');
    }

  }

  return (
    <section className='contact bg-top'>
      <div className='container' style={{ marginLeft: '200px' }}>
        <div className='heading-title' style={{ marginLeft: '60px' }}>
          <Title title="Demande de Réinitialisation de mot de passe" className='title-bg' />
        </div>
        <div className='right w-70'>
          <form onSubmit={handleSubmit}>
            {message && <div className="message">{message}</div>}
            {error && <div className="error">{error}</div>}
            <div className='inputs'>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Email"
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

export default ForgetPassword;
