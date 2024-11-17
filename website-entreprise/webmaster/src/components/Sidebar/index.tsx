import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../images/logo/logo.png';
import { FaUsers, FaShieldAlt, FaCogs, FaKey,FaBlog } from 'react-icons/fa';
import { FaAddressBook, FaChevronDown, FaChevronUp,FaFileAlt } from 'react-icons/fa';



interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenContent, setDropdownOpenContent] = useState(false);


  const { pathname } = location;

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownToggleContent = () => {
    setDropdownOpenContent(!dropdownOpenContent);
  };

  

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  const [userRole, setUserRole] = useState<string | null>(null);
  const [user, setUser] = useState<{ userID: string; name: string; role: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/user-info', {
          withCredentials: true,
        });

        console.log('API response:', response.data);

        if (response.data && response.data.name && response.data.role && response.data.userID) {
          setUser({
            userID: response.data.userID,
            name: response.data.name,
            role: response.data.role,
          });
          setUserRole(response.data.role);
        } else {
          setError('User or role not found in response');
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError('Error fetching user info');
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node) || trigger.current.contains(target as Node))
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const renderMenuItems = () => {
    switch (userRole) {
      case 'superadmin':
        return (
          <>
            
              <h3 className="mb-4 ml-4 text-lg font-semibold text-bodydark2">
                MENU
              </h3>
              <NavLink
                to="/internalusers"
                className={`group relative flex items-center gap-3 rounded-lg px-6 py-3 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  pathname === '/internalusers' && 'bg-graydark dark:bg-meta-4'
                }`}
              >
                <FaUsers className="text-xl" />
                <span className="text-lg font-semibold">Internal Users</span>
              </NavLink>
      
              <NavLink
                to="/roles"
                className={`group relative flex items-center gap-3 rounded-lg px-6 py-3 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  pathname === '/roles' && 'bg-graydark dark:bg-meta-4'
                }`}
              >
                <FaShieldAlt className="text-xl" />
                <span className="text-lg font-semibold">Roles</span>
              </NavLink>
      
              <NavLink
                to="/serviceslist"
                className={`group relative flex items-center gap-3 rounded-lg px-6 py-3 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  pathname === '/serviceslist' && 'bg-graydark dark:bg-meta-4'
                }`}
              >
                <FaCogs className="text-xl" />
                <span className="text-lg font-semibold">Services</span>
              </NavLink>
      
              <NavLink
                to="/permissions"
                className={`group relative flex items-center gap-3 rounded-lg px-6 py-3 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  pathname === '/permissions' && 'bg-graydark dark:bg-meta-4'
                }`}
              >
                <FaKey className="text-xl" />
                <span className="text-lg font-semibold">Permissions</span>
              </NavLink>
              <NavLink
  to="/blogs"
  className={`group relative flex items-center gap-3 rounded-lg px-6 py-3 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
    pathname === '/blogs' && 'bg-graydark dark:bg-meta-4'
  }`}
>
  <FaBlog className="text-xl" />
  <span className="text-lg font-semibold">Blogs</span>
</NavLink>





<div >
      <div
        onClick={handleDropdownToggle}
        className={`group flex items-center gap-3 rounded-lg px-6 py-3 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer ${
          pathname.startsWith('/contacts') ? 'bg-graydark dark:bg-meta-4' : ''
        }`}
      >
        <FaAddressBook className="text-xl" />
        <span className="text-lg font-semibold">Contacts</span>
        <span className="ml-auto flex items-center text-lg">
          {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {dropdownOpen && (
  <div className="pl-6 mt-1">
    <NavLink
      to="/business-contacts"
      className={`block px-4 py-2 text-sm font-medium text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 rounded-md ${
        pathname === '/business-contacts' ? 'bg-graydark dark:bg-meta-4' : ''
      }`}
    >
      Business Contacts
    </NavLink>
    <NavLink
      to="/complaint-contacts"
      className={`block px-4 py-2 text-sm font-medium text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 rounded-md ${
        pathname === '/complaint-contacts' ? 'bg-graydark dark:bg-meta-4' : ''
      }`}
    >
      Complaint Contacts
    </NavLink>
  </div>
)}
    </div>
{/* Content---------------------------- */}
    <div>
      <div
        onClick={handleDropdownToggleContent}
        className={`group flex items-center gap-3 rounded-lg px-6 py-3 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer ${
          pathname.startsWith('/content') ? 'bg-graydark dark:bg-meta-4' : ''
        }`}
      >
        <FaFileAlt className="text-xl" />
        <span className="text-lg font-semibold">Content</span>
        <span className="ml-auto flex items-center text-lg">
          {dropdownOpenContent ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {dropdownOpenContent && (
  <div className="pl-6 mt-1">
    <NavLink
      to="/herolist"
      className={`block px-4 py-2 text-sm font-medium text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 rounded-md ${
        pathname === '/hero-data' ? 'bg-graydark dark:bg-meta-4' : ''
      }`}
    >
      Hero Data
    </NavLink>
          <NavLink
            to="/expertise-section"
            className={`block px-4 py-2 text-sm font-medium text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 rounded-md ${
              pathname === '/expertise-section' ? 'bg-graydark dark:bg-meta-4' : ''
            }`}
          >
            Expertise Section
          </NavLink>
          <NavLink
            to="/expertises"
            className={`block px-4 py-2 text-sm font-medium text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 rounded-md ${
              pathname === '/expertise-data' ? 'bg-graydark dark:bg-meta-4' : ''
            }`}
          >
            Expertise Data
          </NavLink>
          <NavLink
            to="/banners"
            className={`block px-4 py-2 text-sm font-medium text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 rounded-md ${
              pathname === '/banner-data' ? 'bg-graydark dark:bg-meta-4' : ''
            }`}
          >
            Banner Data
          </NavLink>
          <NavLink
            to="/testimonials"
            className={`block px-4 py-2 text-sm font-medium text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 rounded-md ${
              pathname === '/testimonial-data' ? 'bg-graydark dark:bg-meta-4' : ''
            }`}
          >
            Testimonial Data
          </NavLink>
        </div>
      )}
    </div>
 
            
          </>
        );

        case 'Blogger':
          return (
            <>
              
                <h3 className="mb-4 ml-4 text-lg font-semibold text-bodydark2">
                  MENU
                </h3>
            
                <NavLink
    to="/blogs"
    className={`group relative flex items-center gap-3 rounded-lg px-6 py-3 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
      pathname === '/blogs' && 'bg-graydark dark:bg-meta-4'
    }`}
  >
    <FaBlog className="text-xl" />
    <span className="text-lg font-semibold">Blogs</span>
  </NavLink>
              
            </>
          );


          case 'Sales Manger':
          return (
            <>
              
                <h3 className="mb-4 ml-4 text-lg font-semibold text-bodydark2">
                  MENU
                </h3>
                <div >
      <div
        onClick={handleDropdownToggle}
        className={`group flex items-center gap-3 rounded-lg px-6 py-3 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 cursor-pointer ${
          pathname.startsWith('/contacts') ? 'bg-graydark dark:bg-meta-4' : ''
        }`}
      >
        <FaAddressBook className="text-xl" />
        <span className="text-lg font-semibold">Contacts</span>
        <span className="ml-auto flex items-center text-lg">
          {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {dropdownOpen && (
        <div className="absolute left-0 mt-2 w-full bg-sidebar dark:bg-sidebar-dark border border-stroke rounded-lg shadow-lg z-10">
          <NavLink
            to="/business-contacts"
            className={`block px-6 py-3 text-base font-medium text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 ${
              pathname === '/business-contacts' ? 'bg-graydark dark:bg-meta-4' : ''
            }`}
          >
            Business Contacts
          </NavLink>
          
        </div>
      )}
    </div>
              
            </>
          );

      default:
        return (
          <>
            <NavLink
              to="/"
              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                pathname === '/' && 'bg-graydark dark:bg-meta-4'
              }`}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.825195 1.7062 0.825195 2.66245V15.3376C0.825195 16.2938 1.5751 17.0437 2.53135 17.0437H6.10322C7.05947 17.0437 7.80937 16.2938 7.80937 15.3376V2.66245C7.80937 1.7062 7.05947 0.956299 6.10322 0.956299ZM6.10322 15.3376H2.53135V2.66245H6.10322V15.3376Z" />
              </svg>
              <span className="text-sm font-medium">Home</span>
            </NavLink>
            {/* Add other default links here */}
          </>
        );
    }
  };

  return (
    <aside
    ref={sidebar}
  className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-auto bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
  }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/dashboard">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.0049 0.780029H0.995112C0.58992 0.780029 0.258057 1.11189 0.258057 1.51708V2.78296C0.258057 3.18815 0.58992 3.52001 0.995112 3.52001H19.0049C19.4101 3.52001 19.742 3.18815 19.742 2.78296V1.51708C19.742 1.11189 19.4101 0.780029 19.0049 0.780029Z"
              fill=""
            />
            <path
              d="M19.0049 7.72803H0.995112C0.58992 7.72803 0.258057 8.05989 0.258057 8.46508V9.73096C0.258057 10.1362 0.58992 10.468 0.995112 10.468H19.0049C19.4101 10.468 19.742 10.1362 19.742 9.73096V8.46508C19.742 8.05989 19.4101 7.72803 19.0049 7.72803Z"
              fill=""
            />
            <path
              d="M19.0049 14.676H0.995112C0.58992 14.676 0.258057 15.0079 0.258057 15.4131V16.679C0.258057 17.0841 0.58992 17.416 0.995112 17.416H19.0049C19.4101 17.416 19.742 17.0841 19.742 16.679V15.4131C19.742 15.0079 19.4101 14.676 19.0049 14.676Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
    <nav className="mt-5 px-4 py-4">
      {renderMenuItems()}
    </nav>
  </div>

      <div className="mt-auto">
        <button
          className="block w-full px-4 py-3 text-left text-sm font-medium text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4"
          onClick={() => {
            setSidebarExpanded(!sidebarExpanded);
            setSidebarOpen(false);
          }}
        >
          <span>Collapse Sidebar</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
