import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";
export default function DefaultLayout() {
  return (
    <div className="bg-bg">
      <div className="container mx-auto  ">
        <Header></Header>
        <main className="pt-20">
          <Outlet></Outlet>
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
}
