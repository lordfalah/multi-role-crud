import Table from "../../parts/Products/Table";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Paginate from "../../components/Paginate";
import PlusCircle from "../../icon/PlusCircle";
import Search from "../../icon/Search";
import SearchInput from "../../components/SearchInput";

const Product = () => {
  const { product, isError, isLoading, isSuccess } = useSelector(
    (state) => state.product
  );

  return (
    <section className="my-auto mx-auto w-full overflow-hidden space-y-4 lg:h-auto flex flex-col justify-center lg:block flex-auto max-w-xl md:max-w-3xl xl:max-w-7xl px-5 sm:px-0 xl:px-8">
      <div className="flex sm:justify-between sm:items-center flex-col sm:flex-row w-full gap-y-4 sm:gap-x-5 md:gap-x-0 bg-white p-5 md:p-10 md:py-5 rounded-md shadow-md">
        <div className="">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800">Customers</h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {isSuccess ? (product ? product?.length : null) : null} products
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-800/50">
            These companies have purchased in the last 12 months.
          </p>
        </div>

        <div className="flex gap-y-4 justify-between sm:flex-col">
          <div className="flex justify-end">
            <Link
              state={{ path: "Product" }}
              to="/dashboard/product/add"
              className="flex items-center justify-center text-sm tracking-wide text-white transition-colors duration-200 bg-gray-800 rounded-lg w-fit gap-x-2 hover:bg-gray-600 py-2.5 px-5 justify-self-end"
            >
              <PlusCircle />

              <span className="hidden sm:block">Product</span>
            </Link>
          </div>

          {isSuccess ? (
            !product ? null : (
              <div className="relative flex items-center justify-end">
                <span className="absolute">
                  <Search className="text-gray-400 dark:text-gray-600 mx-3" />
                </span>
                <SearchInput />
              </div>
            )
          ) : null}
        </div>
      </div>

      <div className="bg-white p-5 md:p-10 rounded-md shadow-md">
        <Table />

        {(isSuccess && product.length === 0) ||
          (!product ? null : (
            <Paginate>
              {product?.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="px-2 py-1 text-sm text-slate-500 rounded-md dark:hover:bg-gray-800 dark:text-slate-500 hover:bg-gray-100 hover:text-white"
                >
                  {idx + 1}
                </button>
              ))}
            </Paginate>
          ))}
      </div>
    </section>
  );
};

export default Product;
