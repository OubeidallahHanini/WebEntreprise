import Link from "next/link";
import { TitleLogo } from "./Title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext'; // Import du contexte d'authentification

const Header = () => {
  const [activeLink, setActiveLink] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false); // État pour gérer la visibilité du menu déroulant
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link href="/">
            <TitleLogo title='creative' caption='7' className='logomin' />
          </Link>
        </div>

        <nav className="nav-links">
          <Link href='/' className={activeLink === "/" ? "activeLink" : ""}>Home</Link>
          <Link href='/agency' className={activeLink === "/agency" ? "activeLink" : ""}>Agency</Link>
          <Link href='/team' className={activeLink === "/team" ? "activeLink" : ""}>Team</Link>
          <Link href='/services' className={activeLink === "/services" ? "activeLink" : ""}>Services</Link>
          <Link href='/showcase' className={activeLink === "/showcase" ? "activeLink" : ""}>Showcase</Link>
          <Link href='/blogs' className={activeLink === "/blogs" ? "activeLink" : ""}>Blog</Link>
          <Link href='/contact' className={activeLink === "/contact" ? "activeLink" : ""}>Contact</Link>
        </nav>

        {user ? (





<nav className="nav-links">
<Link href="" passHref>
<button onClick={logout} className='button-primary'>Logout</button>
            </Link>
          <div className='user-menu' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            
            <Link href='' className={activeLink === "" ? "activeLink" : ""}>
              {user.username}
            </Link>
            {dropdownVisible && (
              <div className='dropdown-menu'>
                <Link href="/consulterProfil">Profile</Link>
                <Link href="/updateProfil">Settings</Link>
                



              </div>
            )}
          </div>
          </nav>

        ) : (
          <>
            <Link href="/identifier" passHref>
              <button className='button-primary'>S'identifier</button>
            </Link>
            <Link href="/senregistrer" passHref>
              <button className='button-primary'>Créer un compte</button>
            </Link>
          </>
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-links {
          display: flex;
          gap: 1rem;
        }
        .user-menu {
          position: relative;
          display: inline-block;
        }
        .dropdown-menu {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 80%;
          left: 0;
          background-color: transparent; /* Fond transparent */
          border: none; /* Pas de bordure */
          padding: 10px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
              min-width: 150px; /* Ajuster la largeur minimale pour s'adapter au texte */

        }
        .user-menu:hover .dropdown-menu, .dropdown-menu:hover {
          opacity: 1;
          visibility: visible;
        }
        .dropdown-menu a, .dropdown-menu button {
          padding: 8px 16px;
          text-decoration: none;
          color: black;
          background: none;
          border: none;
          cursor: pointer;
        }
        .dropdown-menu a:hover, .dropdown-menu button:hover {
          background-color: rgba(0, 0, 0, 0.1); /* Fond léger au survol */
        }
        .activeLink {
          font-weight: bold;
        }
          
        
      `}</style>
    </header>
  );
};

export default Header;
