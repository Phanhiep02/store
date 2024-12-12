import React from "react";
import { Link as ScrollLink } from "react-scroll";

import imgBg from "../assets/img/header.svg";
export default function Hero() {
  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        <div className="grid col-span-6 ">
          <div style={{ width: "100%" }}>
            <img
              src={`${imgBg}`}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="grid col-span-6 mt-40 ml-20">
          <div>
            <h1 className="text-5xl font-bold text-primary">Calzada</h1>
            <p className="text-2xl mt-10 font-sm">
              A walk-in-park online shopping experience
            </p>
            <ScrollLink to="products" smooth={true} offset={-80} duration={500}>
              <button className="mt-10 border-primary border-2 border-solid text-white bg-primary rounded-full px-4 py-2 hover:bg-white hover:text-primary duration-200">
                Shop Now!
              </button>
            </ScrollLink>
          </div>
        </div>
      </div>
    </>
  );
}
