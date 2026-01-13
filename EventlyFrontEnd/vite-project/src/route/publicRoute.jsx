import { UseAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { auth } = UseAuth();

  if (auth.loading) return <p>Loading...</p>;

  // If logged in, redirect automatically to private home
  return auth.isLogged ? <Navigate to="/app/home" replace /> : children;
}
