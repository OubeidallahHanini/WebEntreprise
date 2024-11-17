// pages/identifier.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Importer le contexte d'authentification
import { Title } from '../components/common/Title'; // Assure-toi que le chemin est correct
import Link from "next/link";


const Identifier = () => {

  
  const { login } = useAuth(); // Utiliser la fonction de connexion du contexte
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await login(email, password); // Appeler la fonction de connexion du contexte

    if (!result.ok) {
      setError(result.message || 'An unexpected error occurred');
    }
  };

  return (
   
      <section className='contact bg-top'>
        <div className='container' style={{ marginLeft: '200px' }}
        >
          <div className='heading-title' style={{ marginLeft: '60px' }}>
            <Title title="Connectez-vous" className='title-bg' />
          </div>
          <div className='right w-70'>
            <form onSubmit={handleSubmit}>
              {error && <div className="error">{error}</div>}
              <div className='grid-2'>
                <div className='inputs'>
                  <span>E-mail</span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className='inputs'>
                  <span>Password</span>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              <button type="submit" className='secondary-button'>Se Connecter</button>
              <br>
              </br>

              <Link href="/forgetPassword" passHref>
                <button className='button-secondary'>Demande de réinitialisation de mot de passe</button>
              </Link>
              
            </form>
          </div>
        </div>
      </section>

  );
};

export default Identifier;
