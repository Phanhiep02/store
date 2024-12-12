import React, { useState } from "react";
import { IoCart } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  selectTotalPrice,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../stores/slices/cartSlice";
import { toast } from "react-toastify";

export default function Cart() {
  const cart = useSelector((state) => state.carts.carts);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    confirmAlert({
      title: "Remove cart ",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(removeFromCart({ id })),
              toast.success("remove cart success");
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };
  const handleRemoveAll = () => {
    confirmAlert({
      title: "Remove all cart List",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(clearCart()),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };
  const cartVariants = {
    hidden: { x: "100%" },
    visible: { x: "0%" },
  };

  return (
    <>
      {/* Nút mở giỏ hàng */}
      <div className="relative flex items-center">
        <IoCart
          className="text-3xl text-primary cursor-pointer"
          onClick={() => setIsCartOpen(!isCartOpen)}
        />
        <span className="bg-white absolute text-primary rounded-full w-5 h-5 text-md flex items-center justify-center left-[16px] top-[-10px]">
          {cart.length}
        </span>
      </div>

      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Sidebar giỏ hàng */}
      <motion.div
        initial="hidden"
        animate={isCartOpen ? "visible" : "hidden"}
        variants={cartVariants}
        transition={{ type: "spring", stiffness: 50 }}
        className="fixed top-0 right-0 w-[500px] h-full bg-white shadow-lg z-50 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold mb-4">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-red-500 font-medium mb-4"
          >
            X
          </button>
        </div>

        {/* Danh sách sản phẩm */}
        <ul className="overflow-y-auto max-h-[800px]">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="border-b mb-4 pb-4">
                <li className="flex items-center justify-between mb-2">
                  <img
                    className="w-20 h-20"
                    src={item.images}
                    alt={item.title}
                  />
                  <h3 className="text-xl text-primary font-normal">
                    {item.title}
                  </h3>
                </li>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-lg text-gray-800">
                    Quantity:
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                      className="border rounded w-12 text-center ml-2"
                      min="1"
                    />
                  </span>
                  <p className="text-lg text-gray-800">
                    Price:{" "}
                    <span className="text-lg text-price">{item.price}$</span>
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </ul>

        {/* Tổng giá */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-lg font-bold">
            Total: {totalPrice.toLocaleString()}$
          </p>
          {cart.length > 0 ? (
            <button
              onClick={() => handleRemoveAll()}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove All
            </button>
          ) : (
            ""
          )}
        </div>
      </motion.div>
    </>
  );
}
