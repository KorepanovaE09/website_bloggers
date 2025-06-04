import axios from "axios";
import { useEffect } from "react";
import useData from "../hooks/useData";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activeRole, setActiveRole] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { data, isError, error, refetch } = useData("/auth/me");

  useEffect(() => {
    if (data) {
      setUser(data);
      setIsLoading(false);

      if (data.role === "blogger") {
        const role = localStorage.getItem("activeRole");
        setActiveRole(role || "blogger");
      } else {
        setActiveRole(data.role);
      }
    } else {
      setUser(null);
      localStorage.clear();
      setIsLoading(false);
      console.log("Токена нет")

    }
  }, [data]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, refetch, isLoading, activeRole, setActiveRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
