import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../stores/slices/cartSlice";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export default function AddCart({ id, product }) {
  const products = useSelector((state) => state.products.productsList);
  const dispatch = useDispatch();

  const onClickAddCart = () => {
    const productToAdd = product || products.find((prod) => prod.id === id);
    if (productToAdd) {
      dispatch(addToCart(productToAdd));
      toast.success("add success");
    } else {
      console.error("Product not found!");
      toast.error("add found");
    }
  };
  return (
    <>
      <div
        onClick={onClickAddCart}
        className="flex h-[34px] w-[120px] pl-[10px] rounded-md items-center gap-2 mb-4 bg-primary ml-auto mr-2 cursor-pointer text-white hover:bg-white hover:text-primary duration-200 "
      >
        <FaCartPlus className="text-xl" />
        <span className="text-lg">Add Cart</span>
      </div>
    </>
  );
}
