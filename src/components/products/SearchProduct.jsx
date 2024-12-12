import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, searchProduct } from "../../stores/slices/productsSlice";
import { useSearchParams } from "react-router-dom";

export default function SearchProduct() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const keywordParams = searchParams.get("q") ?? "";
  console.log("keywordParams", searchParams.get("q"));

  const currentPage = Number(searchParams.get("page") ?? 1);
  const categorySelect = useSelector(
    (state) => state.products.selectedCategory
  );
  const onSearch = (e) => {
    setKeyword(e.target.value);
    const skip = (currentPage - 1) * 6;
    dispatch(
      getProducts({ query: keyword, skip: skip, category: categorySelect })
    );
  };
  useEffect(() => {
    if (keyword === "") {
      dispatch(getProducts({ query: "", skip: 0, category: categorySelect }));
    }
    if (keyword === "") {
      setSearchParams({});
    } else {
      setSearchParams({ q: keyword });
    }
  }, [dispatch, keyword]);
  console.log("keyword", keyword);
  console.log("keywordParams", keywordParams);

  return (
    <>
      <div className="w-96 h-14 ml-[74px] mt-[-6px]">
        <input
          onChange={onSearch}
          className="w-full h-full outline-primary rounded-md pl-4 pr-6"
          type="text"
          placeholder="Search Products..."
          value={searchParams.get("q") ?? keyword}
        />
      </div>
    </>
  );
}
