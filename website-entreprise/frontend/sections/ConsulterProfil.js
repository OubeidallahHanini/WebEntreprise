import React from "react";
import { TitleSm } from "../components/common/Title";
import { useAuth } from "../context/AuthContext";

const ConsulterProfil = () => {
  const { user } = useAuth();
  console.log(user.photo);
  const imageName = user.photo.split('\\').pop();



  return (
    <section className="profile-section">
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <TitleSm title="Votre Profil"  />
          </div>
          

          <img
            src={`http://localhost:3005/photos/${imageName}`}
            alt="Profile Image"
            className="profile-image"
          />

          <div className="profile-body">
            <div className="profile-item">
              <span className="label">Nom d'utilisateur:</span>
              <span className="value">{user?.username || "Non disponible"}</span>
            </div>

            <div className="profile-item">
              <span className="label">Num tel:</span>
              <span className="value">{user?.numtel || "Non disponible"}</span>
            </div>
            <div className="profile-item">
              <span className="label">Adresse:</span>
              <span className="value">{user?.address || "Non disponible"}</span>
            </div>
            <div className="profile-item">
              <span className="label">Bio :</span>
              <span className="value">{user?.bio || "Non disponible"}</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .profile-section {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .container {
          width: 100%;
          max-width: 500px;
          padding: 1rem;
        }
        .profile-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          text-align: center;
        }
        .profile-header {
          margin-bottom: 2rem;
        }
        .profile-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .profile-body {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .profile-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        .label {
          font-weight: 600;
          color: #555;
        }
        .value {
          font-weight: 500;
          color: #333;
        }
      `}</style>
    </section>
  );
};

export default ConsulterProfil;