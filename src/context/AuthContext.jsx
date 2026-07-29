import { createContext, useEffect, useState } from "react";

import authService from "../services/authService";
import memberService from "../services/memberService";

import {
  getToken,
  saveToken,
  removeToken,
} from "../utils/token";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login
  const login = async (data) => {
  const response = await authService.login(data);

  console.log("LOGIN RESPONSE:", response);

  saveToken(response.data.token);
  setUser(response.data.user);

  return response;
};
  // Register
  const register = async (data) => {
    const response = await authService.register(data);

    saveToken(response.data.token);

    setUser(response.data.user);

    return response;
  };

  // Logout
  const logout = () => {
    removeToken();

    setUser(null);
  };

  // Restore user after page refresh
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = getToken();

        if (!token) {
          return;
        }

        const response = await memberService.getProfile();

        setUser(response.data);
      } catch (error) {
        removeToken();

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;