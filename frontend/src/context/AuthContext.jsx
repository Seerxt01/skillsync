import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('skillsync_user') || 'null'));

  const authAction = async (path, payload) => {
    const { data } = await api.post(`/auth/${path}`, payload);
    localStorage.setItem('skillsync_token', data.token);
    localStorage.setItem('skillsync_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const value = useMemo(
    () => ({
      user,
      login: (payload) => authAction('login', payload),
      signup: (payload) => authAction('signup', payload),
      logout: () => {
        localStorage.removeItem('skillsync_token');
        localStorage.removeItem('skillsync_user');
        setUser(null);
      }
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
