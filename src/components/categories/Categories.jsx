import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, setCategory } from "../../stores/slices/productsSlice";
import { useSearchParams } from "react-router-dom";

export default function Categories() {
  const [activeCategories, SetActiveCategories] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const categories = useSelector((state) => {
    return state.products.categories;
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const handleCategoryClick = (category) => {
    SetActiveCategories(category);
    console.log(category);
    dispatch(setCategory(category === "All" ? "" : category));
    setSearchParams({});
  };
  // console.log(categories);

  return (
    <>
      <div
        style={{ backgroundColor: "#f2f2f2" }}
        className="grid col-span-2 rounded-lg "
      >
        <div className="flex items-center text-xl gap-3 pl-2 pt-2">
          <FaList />
          <p className="font-medium">Categories</p>
        </div>
        <ul className="mt-3 ">
          <li
            className={`hover:bg-gray-300 duration-200 mb-3 cursor-pointer ${
              activeCategories === "All" ? "text-primary" : ""
            }`}
            onClick={() => handleCategoryClick("All")}
          >
            <a className="block pl-2 text-xl">All</a>
          </li>
          {categories?.map((category, index) => (
            <li
              key={index}
              className={`hover:bg-gray-300 duration-200 mb-3 cursor-pointer  ${
                activeCategories === category ? "text-primary" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <a className="block pl-2 text-xl">{category}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
