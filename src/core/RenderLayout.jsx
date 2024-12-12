import { privateRoute } from "../routes/privateRoute";
import { publicRoutes } from "../routes/publicRoutes";
import { Routes } from "react-router-dom";
export default function RenderLayout() {
  return (
    <Routes>
      {publicRoutes} {privateRoute}
    </Routes>
  );
}
