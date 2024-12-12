// layout muốn được bảo vệ
import { Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Profile from "../pages/Auth/Profile";
import AuthMiddleware from "../middlewares/AuthMiddleware";

export const privateRoute = (
  <>
    <Route path="/" element={<DefaultLayout></DefaultLayout>}>
      <Route element={<AuthMiddleware></AuthMiddleware>}>
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Route>
    </Route>
  </>
);
