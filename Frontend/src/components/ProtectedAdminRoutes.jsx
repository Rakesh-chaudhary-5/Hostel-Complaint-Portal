import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MyContext } from "../Context/userContext";

function ProtectedAdminRoutes({ children }) {
  const { user, loading } = useContext(MyContext);

  if (loading) {
    return <h2>Checking session...</h2>; // or spinner
  }

  if (!user) {
    return <Navigate to="/login" />;
  }else if(user.role === "user"){
    return <Navigate to="/feed"/>
  }

  return children;
}

export default ProtectedAdminRoutes;