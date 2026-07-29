import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return (
      <h1 className="p-10 text-2xl">
        Loading...
      </h1>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;