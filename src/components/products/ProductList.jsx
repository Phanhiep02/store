import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  useSelectorAllProduct,
} from "../../stores/slices/productsSlice";
import { Pagination } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import AddCart from "../Cart/AddCart";
export default function ProductList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useSelector(useSelectorAllProduct);
  const status = useSelector((state) => state.products.status);
  const pageTotal = useSelector((state) => state.products.totalPage);
  const pageCount = Math.ceil(pageTotal / 6);

  const currentPage = Number(searchParams.get("page") ?? 1);
  const keywordParams = searchParams.get("q") ?? "";
  const categorySelect = useSelector(
    (state) => state.products.selectedCategory
  );
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const skip = (currentPage - 1) * 6;
    console.log("currentPage", currentPage);

    dispatch(
      getProducts({
        query: keywordParams,
        skip: skip,
        category: categorySelect,
      })
    );
  }, [dispatch, searchParams, keywordParams, categorySelect]);

  const handleImageLoad = (id) => {
    setLoadedImages((prevState) => ({ ...prevState, [id]: true }));
  };

  // pagination
  const onChangePagination = (_, page) => {
    const skip = (page - 1) * 6;
    dispatch(
      getProducts({
        query: keywordParams,
        skip: skip,
        category: categorySelect,
      })
    );

    if (keywordParams) {
      setSearchParams({ q: keywordParams, page: page });
    } else {
      setSearchParams({ page: page });
    }
  };

  return (
    <>
      <div style={{ height: "200px" }} className="grid col-start-4 col-span-9">
        <div className="grid grid-cols-3 gap-3">
          {status === "idle" ? (
            <h1>Loading...</h1>
          ) : (
            products?.map((product, index) => (
              <div
                key={product.id || `product-${index}`}
                className="rounded-lg"
                style={{ backgroundColor: "#f2f2f2" }}
              >
                <div>
                  {!loadedImages[product.id] && (
                    <div className="w-full h-[200px] bg-gray-300 animate-pulse"></div>
                  )}
                  <img
                    className={`w-full object-cover ${
                      loadedImages[product.id] ? "" : "hidden"
                    }`}
                    src={product.thumbnail}
                    alt={product.title}
                    onLoad={() => handleImageLoad(product.id)}
                    onError={() => handleImageLoad(product.id)}
                  />
                </div>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to={`/product/${product.id}`}
                >
                  <h3 className="text-xl font-semibold pl-3 pr-1 mb-3 text-primary cursor-pointer">
                    {product.title}
                  </h3>
                </Link>
                <div className="pl-3 flex items-center justify-between pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="font-normal">{product.rating}</span>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="#FFD700"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-500">{product.category}</p>
                  </div>
                  <div className="mr-2">
                    <p className="text-lg font-semibold text-price">
                      {product.price}$
                    </p>
                  </div>
                </div>
                {/* add cart */}
                <AddCart id={product.id}></AddCart>
              </div>
            ))
          )}
        </div>
        <div className="mt-3 mb-3 ml-auto">
          <ScrollLink to="products" smooth={true} offset={-80} duration={500}>
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={onChangePagination}
              color="primary"
            />
          </ScrollLink>
        </div>
      </div>
    </>
  );
}
