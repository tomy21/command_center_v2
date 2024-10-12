import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../api/apiOcc";

const ProtectAuth = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await users.verifyToken();

        if (response.statusCode === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate("/");
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/");
      }

      setAuthChecked(true);
    };

    if (!authChecked) {
      checkAuth();
    }
  }, [authChecked, navigate]);

  if (!authChecked) {
    return null;
  }

  return isAuthenticated ? children : null;
};

export default ProtectAuth;
