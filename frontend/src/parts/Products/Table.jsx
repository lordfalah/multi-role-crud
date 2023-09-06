import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProduct } from "../../redux/product/ProductApi.js";
import { formatDate } from "../../utils/index.js";
import Setting from "../../icon/Setting.jsx";
import Trash from "../../icon/Trash.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

const colomsName = [
  "No",
  "Date",
  "Name",
  "Customer",
  "Price",
  "Image",
  "Action",
];

const Table = () => {
  const { product, isError, error, isLoading, isSuccess } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const onDelete = async (uuid) => {
    try {
      await dispatch(deleteProduct(uuid)).unwrap();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      {isSuccess ? (
        product?.length !== 0 ? (
          <div className="overflow-x-auto wraper mb-4">
            <div className="inline-block min-w-full py-2 align-middle w-[1000px] lg:w-[900px] xl:w-auto">
              <div className="border border-gray-200 dark:borderxsgray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed ">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      {colomsName.map((col, idx) => (
                        <th
                          key={idx}
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {isSuccess
                      ? product?.map((prd, idx) => (
                          <AnimatePresence key={idx} mode="popLayout">
                            <motion.tr
                              layout
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              transition={{ type: "tween" }}
                            >
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <span>{idx + 1}</span>
                              </td>
                              <td className="px-4 py-4 text-sm text-emerald-500  dark:text-gray-300 whitespace-nowrap">
                                {formatDate(prd?.createdAt)}
                              </td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center px-3 py-1 dark:text-gray-200 ">
                                  {prd?.name}
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                <h2>{prd?.user?.name}</h2>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {prd?.price}
                              </td>

                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap w-60 lg:w-72 xl:w-80">
                                <img
                                  src={prd?.images[0]?.url}
                                  alt={prd?.images[0]?.filename}
                                  loading="lazy"
                                  className="object-cover object-center bg-no-repeat w-full h-24 md:h-28 lg:h-32 xl:h-36 cursor-pointer rounded-md"
                                />
                              </td>

                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap flex justify-between h-auto items-center">
                                <Link
                                  state={{ path: "Product" }}
                                  to={`/dashboard/product/${prd?.uuid}`}
                                >
                                  <Setting />
                                </Link>

                                <button
                                  type="button"
                                  onClick={() => onDelete(prd?.uuid)}
                                >
                                  <Trash />
                                </button>
                              </td>
                            </motion.tr>
                          </AnimatePresence>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <div>loadddd</div>
        ) : (
          <div>
            <div className="text-center my-20">
              <h1 className="text-3xl lg:text-4xl font-medium mb-2">
                Ooups, data doesn&apos;t have
              </h1>
              <span className="text-gray-500">you can add data first</span>
            </div>
          </div>
        )
      ) : null}
    </Fragment>
  );
};

export default Table;
