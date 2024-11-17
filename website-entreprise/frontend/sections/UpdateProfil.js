import React, { useState } from "react";
import { TitleSm } from "../components/common/Title";
import { useAuth } from "../context/AuthContext";

const UpdateProfil = () => {
  const { user } = useAuth(); // Vous pouvez garder cela si vous utilisez encore le contexte pour accéder aux infos utilisateur
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    numtel: user?.numtel || "",
    address: user?.address || "",
    bio: user?.bio || "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const imageName = user?.photo ? user.photo.split('\\').pop() : 'default-image.jpg';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

   

   

    for (const [key, value] of Object.entries(formData)) {
      data.append(key, value);
    }

    if (profileImage) {
      data.append("photo", profileImage); 
      console.log(profileImage)
    }



  for (let [key, value] of data.entries()) {
  if (key === 'photo') {
    // Si la clé est "photo", affichez des informations spécifiques sur le fichier
    console.log(`"${key}":`);
    console.log(`  File name: ${value.name}`);
    console.log(`  File type: ${value.type}`);
    console.log(`  File path: ${value.path || 'Path not available'}`); // Le path peut ne pas être disponible côté client
  } else {
    // Affichez simplement la valeur pour les autres champs
    console.log(`"${key}": ${value}`);
  }
}


    try {
      const response = await fetch(`/api/updateVisitor?VisitorId=${user.id}`, {
        method: "PUT",
        body: data,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Profil mis à jour avec succès :", updatedUser);
        // Peut-être ajouter une redirection ou un message de succès ici
      } else {
        console.error("Erreur lors de la mise à jour du profil :", await response.json());
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <section className="profile-section">
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <TitleSm title="Modifier Votre Profil" />
          </div>
          <div className="profile-image-container">
            <img
              src={`http://localhost:3005/photos/${imageName}`}
              alt="Profile Image"
              className="profile-image"
            />
           <input
  type="file"
  id="profileImage"
  accept="image/*"
  onChange={handleImageChange}
  className="file-input"
  name="photo"  // Ce nom doit correspondre à celui utilisé dans le backend
/>
            
            <label htmlFor="profileImage" className="file-input-label">
              Choisir une nouvelle photo
            </label>
          </div>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="username">Nom d'utilisateur:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="numtel">Numéro de téléphone:</label>
              <input
                type="text"
                id="numtel"
                name="numtel"
                value={formData.numtel}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Adresse:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn-submit">Mettre à jour</button>
          </form>
        </div>
      </div>
    <style jsx>{`
        html, body {
          height: 100%;
          margin: 0;
        }
        .profile-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: calc(100vh - 60px); /* Ajustez la hauteur en fonction de la hauteur du footer */
          overflow: auto;
        }
        .container {
          width: 100%;
          max-width: 500px;
          padding: 1rem;
          margin: 0 auto;
        }
        .profile-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          text-align: center;
          max-height: 100%; /* Assurez-vous que la carte ne dépasse pas le conteneur */
          overflow: auto; /* Permet le défilement interne si le contenu dépasse */
        }
        .profile-header {
          margin-bottom: 2rem;
        }
        .profile-image-container {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .profile-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .file-input {
          display: none;
        }
        .file-input-label {
          display: block;
          margin-top: 1rem;
          font-weight: 600;
          color: #333; /* Couleur noire pour le label */
          cursor: pointer;
          background-color: #f9f9f9;
          padding: 0.5rem 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .form-group label {
          font-weight: 600;
          color: #333; /* Couleur noire pour le label */
          margin-bottom: 0.5rem;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
          color: #333; /* Couleur noire pour le texte dans les champs */
        }
        .btn-submit {
          padding: 0.75rem 1.5rem;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }
      `}</style>      
    </section>
  );
};

export default UpdateProfil;
