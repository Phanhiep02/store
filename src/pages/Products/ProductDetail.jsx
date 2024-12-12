import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddCart from "../../components/Cart/AddCart";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../stores/slices/productsSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);
  const products = useSelector((state) => state.products.productsList);

  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch]);
  console.log(product);

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Không giảm dưới 1
  };
  return (
    <>
      <div className="grid grid-cols-12 mt-32">
        <div className="grid col-span-6">
          <div style={{ width: "554px", height: "554px" }} className="">
            <img className="w-full h-full" src={`${product.images}`} alt="" />
          </div>
        </div>
        <div className="grid col-span-6 mt-10">
          <div>
            <h1 className="text-3xl font-semibold text-primary">
              {product.title}
            </h1>
            <p className="text-xl text-gray-500 mt-4">{product.description}</p>
            <div className="mt-4 flex items-center mb-4 gap-4">
              <p className="text-lg">{product.brand}</p>
              <span>|</span>
              <p className=" text-lg">{product.category}</p>
            </div>
            <span className="text-2xl  font-semibold text-price">
              {product.price}$
            </span>
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm font-medium">Quantity</span>
              <button
                onClick={handleDecrease}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <input
                onChange={(e) => setQuantity(Number(e.target.value))}
                type="number"
                value={quantity}
                className="w-12 text-center border border-gray-300 rounded focus:outline-none"
              />
              <button
                onClick={handleIncrease}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <div>
              <AddCart product={{ ...product, quantity }}></AddCart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
