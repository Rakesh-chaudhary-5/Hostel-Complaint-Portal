import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MyContext } from "../Context/userContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(MyContext);

  if (loading) {
    return <h2>Checking session...</h2>; // or spinner
  }

  if (!user) {
    return <Navigate to="/login" />;
  }else if(user.role === "admin"){
    return <Navigate to="/"/>
  }

  return children;
}

export default ProtectedRoute;