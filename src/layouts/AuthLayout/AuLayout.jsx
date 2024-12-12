import { Outlet } from "react-router-dom";

export default function AuLayout() {
  return (
    <div className="auth">
      <Outlet></Outlet>
    </div>
  );
}
