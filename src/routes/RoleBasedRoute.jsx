import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isPrivate = true }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Get the data from localStorage
  const isValidLogin = JSON.parse(localStorage.getItem("pmsc"));

  // Using OR logic: If EITHER Redux is true OR localStorage has data, they are logged in
  const isLoggedIn = isAuthenticated || isValidLogin;

  // 1. Private Route + Not Logged In -> Redirect to Login
  if (isPrivate && !isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // 2. Public Route (Login/Signup) + Already Logged In -> Redirect to Dashboard
  if (!isPrivate && isLoggedIn) {
    return <Navigate to="/student/dashboard" replace />;
  }

  // 3. Otherwise, show the requested page
  return <Outlet />;
};

export default ProtectedRoute;
