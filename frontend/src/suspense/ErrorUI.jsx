import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteError } from "react-router-dom";
import { reset as resetProduct } from "../redux/product/ProductSlice";
import { reset as resetUser } from "../redux/user/UserSlice";

const ErrorUI = () => {
  const { data, status, statusText } = useRouteError();
  const { errors } = JSON.parse(data);
  const dispatch = useDispatch();
  const { user, isSuccess, isLoading, isError, error } = useSelector(
    (state) => state.auth
  );

  return (
    <section className="w-fit mx-auto space-y-6">
      <h1 className="text-center font-semibold text-9xl text-red-500 tracking-widest drop-shadow-text-error font-sans">
        {status}
      </h1>
      <div className="bg-white container flex items-center px-6 py-12 mx-auto justify-center shadow-md">
        <div>
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            {[status, statusText].join(" ")}
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
            {errors?.message}
          </h1>
          <p className="mt-4 text-gray-500 ">
            Sorry, the page you are looking for doesn&apos;t exist.
          </p>
          <div className="flex items-center mt-6 gap-x-3">
            <Link
              onClick={() => {
                dispatch(resetProduct());
                if (user?.role === "admin") dispatch(resetUser());
              }}
              to={errors?.path ? errors?.path : "/dashboard"}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <span>Go back</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorUI;
