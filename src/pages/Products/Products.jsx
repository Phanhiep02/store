import Categories from "../../components/categories/Categories";
import ProductList from "../../components/products/ProductList";
import SearchProduct from "../../components/products/SearchProduct";

export default function Products() {
  return (
    <>
      {/* Product */}
      <div id="products" className="mt-20">
        <div className="flex items-center">
          <div>
            <h1 className="text-4xl font-bold mb-10 text-primary">
              List of Products
            </h1>
          </div>
          {/* search */}
          <SearchProduct></SearchProduct>
        </div>
        <div className="grid grid-cols-12">
          {/* categories */}
          <Categories></Categories>
          {/* products List */}
          <ProductList></ProductList>
        </div>
      </div>
    </>
  );
}
