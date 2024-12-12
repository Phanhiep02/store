import { Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";

import Home from "../pages/Home/Home";
import ProductDetail from "../pages/Products/ProductDetail";
import Products from "../pages/Products/Products";
import AuLayout from "../layouts/AuthLayout/AuLayout";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/crud/Dashboard";
export const publicRoutes = (
  <>
    {/* default là layout mặc định cho các layout dùng chung */}
    <Route path="/" element={<DefaultLayout></DefaultLayout>}>
      <Route index element={<Home></Home>}></Route>

      <Route path="/product">
        <Route path=":id" element={<ProductDetail></ProductDetail>}></Route>
      </Route>
      <Route path="/crud" element={<Dashboard></Dashboard>}></Route>
    </Route>
    {/* aulayout dùng riêng cho layout login */}
    <Route path="/" element={<AuLayout></AuLayout>}>
      <Route path="login" element={<Login></Login>}></Route>
    </Route>
  </>
);
