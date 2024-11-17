import { useState } from 'react';
import { useRouter } from 'next/router';
import { Title } from '../components/common/Title'; // Assurez-vous que le chemin est correct
import { useAuth } from '../context/AuthContext'; // Importer le contexte d'authentification

const Signup = () => {
  const router = useRouter();
  const { Signup } = useAuth(); // Utiliser la fonction d'inscription du contexte
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    numtel: '',
    address: '',
    bio: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log(formData);

    const result = await Signup(formData); // Appeler la fonction d'inscription du contexte

    if (!result.ok) {
      setError(result.message || 'An unexpected error occurred depuis component Sign up');
    }
  };

  return (
    <section className='contact bg-top'>
      <div className='container' style={{ marginLeft: '200px' }}>
        <div className='heading-title' style={{ marginLeft: '60px' }}>
          <Title title="Créer un compte" className='title-bg' />
        </div>
        <div className='right w-70'>
          <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <div className='grid-2'>
              <div className='inputs'>
                <span>Nom d'utilisateur</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Nom d'utilisateur"
                  required
                />
              </div>
              <div className='inputs'>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className='inputs'>
                <span>Mot de passe</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Mot de passe"
                  required
                />
              </div>
              <div className='inputs'>
                <span>Numéro de téléphone</span>
                <input
                  type="text"
                  name="numtel"
                  value={formData.numtel}
                  onChange={handleInputChange}
                  placeholder="Numéro de téléphone"
                />
              </div>
              <div className='inputs'>
                <span>Adresse</span>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Adresse"
                />
              </div>
             
              <div className='inputs'>
                <span>Bio</span>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Bio"
                  maxLength="100"
                />
              </div>
            </div>
            <button type="submit" className='secondary-button'>S'inscrire</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
