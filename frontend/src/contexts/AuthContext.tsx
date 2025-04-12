import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  role: 'student' | 'vendor';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dynamic API base URL configuration - make sure it matches Login.tsx
const BASE_URL = 
  import.meta.env.PROD 
    ? 'https://nutricity.onrender.com' 
    : 'http://localhost:5000';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on initial load instead of clearing it
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          // First restore from localStorage
          setUser(JSON.parse(savedUser));
          
          // You can also verify with the backend if needed
          // const response = await fetch(`${BASE_URL}/api/auth/verify`, {
          //   headers: {
          //     'Authorization': `Bearer ${token}`
          //   }
          // });
          // if (response.ok) {
          //   const data = await response.json();
          //   setUser(data.user);
          // } else {
          //   // Token invalid, clear storage
          //   localStorage.removeItem('token');
          //   localStorage.removeItem('user');
          //   setUser(null);
          // }
        } catch (error) {
          console.error('Auth verification error:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData)); // Also save user data
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};