import { useState, useEffect } from 'react';
import { User } from '../types';

const ADMIN_USERS = ['admin', 'manager', 'organizzatore'];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('tournament-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulated authentication - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username.trim().length >= 3) {
      const newUser: User = {
        id: Date.now().toString(),
        username: username.trim(),
        isAdmin: ADMIN_USERS.includes(username.toLowerCase())
      };
      
      setUser(newUser);
      localStorage.setItem('tournament-user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tournament-user');
  };

  return { user, login, logout, isLoading };
};