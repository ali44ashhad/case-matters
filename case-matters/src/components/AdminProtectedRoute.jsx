import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/admin-dashboard`,
          { withCredentials: true }
        );

        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  if (!isAuth) return <Navigate to="/admin-login" />;

  return children;
};

export default AdminProtectedRoute;