import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuShoppingBag } from "react-icons/lu";
import Cart from "../../components/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../../stores/slices/authSlice";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      dispatch(getProfile());
    } else {
      setIsLogin(false);
    }
  }, [token]);
  const onClickLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <div
        style={{ backgroundColor: "#c4bda7" }}
        className=" fixed top-0 left-0 right-0 z-10 pb-2 "
      >
        <div className=" container mx-auto flex items-center justify-between pt-5">
          <Link to={"/"}>
            <div className="flex items-center gap-3 text-3xl cursor-pointer">
              <div>
                <LuShoppingBag className="text-primary" />
              </div>
              <h2 className="font-bold text-primary">Calzada</h2>
            </div>
          </Link>
          <ul className="flex gap-10 text-lg">
            <li>
              <RouterLink
                to={"/"}
                onClick={() => window.scrollTo(0, 0)}
                className="hover:text-primary"
                href=""
              >
                Home
              </RouterLink>
            </li>
            <li>
              <ScrollLink
                to="products"
                smooth={true}
                offset={-80}
                duration={500}
                className="hover:text-primary"
                href=""
              >
                Store
              </ScrollLink>
            </li>

            <li>
              <RouterLink to={"/crud"} className="hover:text-primary" href="">
                CRUD
              </RouterLink>
            </li>
          </ul>
          {isLogin ? (
            <div className="flex  gap-3 items-center">
              <h4>Hello {user?.name}</h4>
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={`${user?.avatar}`}
                alt=""
              />
              <Cart></Cart>
              <Link
                onClick={onClickLogout}
                className="text-primary hover:opacity-70 ml-4"
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="flex gap-5 items-center">
              <Link
                to={"/login"}
                className="border-2 border-primary border-solid py-2 px-4 rounded-2xl hover:bg-primary hover:text-white duration-200"
              >
                Login
              </Link>
              <Cart></Cart>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
