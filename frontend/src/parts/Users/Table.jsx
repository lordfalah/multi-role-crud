import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/user/UserApi";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Setting from "../../icon/Setting";
import Trash from "../../icon/Trash";

const colomsName = ["No", "Name", "Email", "Role", "Action"];

const Table = () => {
  const { profiles, isSuccess, isLoading, isError, error } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const onDeleteUser = async (uuid) => {
    try {
      await dispatch(deleteUser(uuid)).unwrap();
    } catch (error) {
      toast.error(error ? error : error?.message);
    }
  };

  return (
    <div className="overflow-x-auto my-4">
      <div className="inline-block min-w-full py-2 align-middle w-[600px] md:w-full">
        <div className="border border-gray-200 dark:border-gray-700 md:rounded-lg ">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto ">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {colomsName.map((col, idx) => (
                  <th
                    key={idx}
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 "
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              {isSuccess
                ? profiles?.map(({ name, email, role, uuid }, idx) => (
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
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <span>{name}</span>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <span>{email}</span>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <span>{role}</span>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap flex gap-x-5 w-fit">
                          <Link
                            state={{ path: "Users" }}
                            to={`/dashboard/users/${uuid}`}
                          >
                            <Setting />
                          </Link>

                          <button
                            type="button"
                            onClick={() => onDeleteUser(uuid)}
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
  );
};

export default Table;
