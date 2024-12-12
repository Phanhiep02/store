import { Navigate, Outlet } from "react-router-dom";

const isLogin = false;

export default function AuthMiddleware() {
  return isLogin ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>;
}
