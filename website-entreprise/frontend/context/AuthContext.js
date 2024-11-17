import { createContext, useState, useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Inclure les cookies dans la requête
      });

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response format: ${text}`);
      }

      if (response.ok) {
        console.log('Login successful:', data);
        Cookies.set('user', JSON.stringify(data.user)); // Stocker l'utilisateur dans un cookie

        const authToken = Cookies.get("Cookie_1");
        console.log('Auth Token:', authToken);
        router.push('/blogs');
        setUser(data.user); // Rediriger après connexion
        
      } else {
        return { ok: false, message: data.message };
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      return { ok: false, message: 'An unexpected error occurred' };
    }
    return { ok: true };
  };

  const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include', // Inclure les cookies dans la requête
      });

      if (response.ok) {
        setUser(null);
        router.push('/identifier'); // Rediriger après déconnexion
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const Signup = async (formData) => {
    try {
      const response = await fetch('/api/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Inclure les cookies dans la requête
      });

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response format: ${text}`);
      }

      if (response.ok) {
        console.log('Registration successful:', data);
  
        router.push('/blogs');
        //  user = req.body
        console.log(formData)
        console.log(JSON.stringify(formData))

        setUser(formData);

        
         // Rediriger après inscription
      } else {
        return { ok: false, message: data.message };
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      return { ok: false, message: 'An unexpected error occurred ' };
    }
    return { ok: true };
  };


    const forgetPassword = async (email) => {
      try {
        const response = await fetch('/api/Forgetpass', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        if (response.ok) {
          const data = await response.json();
          return { ok: true, data };
        } else {
          const errorData = await response.json();
          return { ok: false, message: errorData.message };
        }
      } catch (error) {
        return { ok: false, message: 'Network error' };
      }
    };

  const value = useMemo(() => ({ user, login, logout, Signup,forgetPassword }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
