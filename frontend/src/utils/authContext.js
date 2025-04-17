import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { ADMIN_USER } from './constants';

// Create authentication context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if the user is already logged in (on page refresh)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }
        
        // Check for admin user in localStorage first
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken === 'true') {
          setUser({
            username: ADMIN_USER.username,
            email: ADMIN_USER.email,
            id: 'admin-id'
          });
          setLoading(false);
          return;
        }
        
        // Verify the token with the backend
        const response = await axios.get(`${API_URL}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data) {
          setUser(response.data);
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        // Clear invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Register a new user
  const register = async (username, email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        password
      });
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.error || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };
  
  // Login user
  const login = async (username, password) => {
    try {
      setError(null);
      setLoading(true);
      
      // Check for superuser admin first
      if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        // Admin user found, set user data without calling backend
        const userData = {
          id: 'admin-id',
          username: ADMIN_USER.username,
          email: ADMIN_USER.email
        };
        
        // Store admin token in localStorage
        localStorage.setItem('adminToken', 'true');
        
        setUser(userData);
        setLoading(false);
        return userData;
      }
      
      // Not admin, try regular authentication with backend
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password
      });
      
      const { token, user: userData } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Set the default Authorization header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      setLoading(false);
      return userData;
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.error || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };
  
  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      
      // Check if admin user
      const isAdmin = localStorage.getItem('adminToken') === 'true';
      
      if (!isAdmin) {
        // Only call backend logout for non-admin users
        const token = localStorage.getItem('token');
        
        if (token) {
          await axios.post(`${API_URL}/api/auth/logout`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear local storage and state regardless of server response
      localStorage.removeItem('token');
      localStorage.removeItem('adminToken');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      setLoading(false);
    }
  };
  
  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 