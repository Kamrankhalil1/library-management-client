import { Navigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/ui/Spinner";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-500/30">
        <FaBookOpen className="text-3xl" />
      </div>
      <div className="flex items-center gap-3">
        <Spinner />
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Loading your dashboard...
        </span>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;

