import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlusCircle from "../../icon/PlusCircle";
import Search from "../../icon/Search";
import SearchInput from "../../components/SearchInput";
import Paginate from "../../components/Paginate";
import Table from "../../parts/Users/Table";

const User = () => {
  const { profiles, isSuccess, isLoading, isError, error } = useSelector(
    (state) => state.profile
  );

  return (
    <section className="my-auto mx-auto w-full overflow-hidden space-y-4 lg:h-auto py-0 lg:py-10 flex flex-col justify-center lg:block flex-auto max-w-xl md:max-w-3xl xl:max-w-7xl px-5 sm:px-0 xl:px-8 ">
      <div className="flex sm:justify-between sm:items-center flex-col sm:flex-row w-full gap-y-4 sm:gap-x-5 md:gap-x-0 bg-white p-5 md:p-10 md:py-5 rounded-md shadow-md">
        <div className="">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800">Customers</h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {isSuccess || profiles ? profiles.length : null} users
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-800/50">
            These companies have purchased in the last 12 months.
          </p>
        </div>

        <div className="flex gap-y-4 justify-between sm:flex-col">
          <div className="flex justify-end">
            <Link
              state={{ path: "Users" }}
              to="/dashboard/users/add"
              className="flex items-center justify-center text-sm tracking-wide text-white transition-colors duration-200 bg-gray-800 hover:bg-gray-600 rounded-lg w-fit gap-x-2 py-2.5 px-5 justify-self-end"
            >
              <PlusCircle />

              <span className="hidden sm:block">User</span>
            </Link>
          </div>

          {isSuccess ? (
            profiles.length === 0 || !profiles ? null : (
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

      <div className="gap-y-4 min-h-0 wrapper bg-white p-5 md:p-10 rounded-md shadow-md">
        <Table />

        {(isSuccess && profiles.length === 0) || !profiles ? null : (
          <Paginate className="px-0 sm:px-6 md:px-0 ">
            {profiles?.map((_, idx) => (
              <a
                key={idx}
                href="#"
                className="px-2 py-1 text-sm text-blue-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                {idx + 1}
              </a>
            ))}
          </Paginate>
        )}
      </div>
    </section>
  );
};

export default User;
