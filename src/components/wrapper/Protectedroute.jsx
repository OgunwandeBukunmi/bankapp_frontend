import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://centkey-backend.onrender.com/verifytoken", {
          method: "POST",
          headers :{
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json"
          },
          
        });
        const data = await response.json();
      
        if (data.error) {
          
          navigate("/login");
        } else {
          setIsVerified(true);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  if (isVerified === null) return <Loader/>; // Or a spinner
  return children;
};

export default ProtectedRoute;
