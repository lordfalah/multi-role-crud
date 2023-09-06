import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Notif from "../icon/Notif";
import Square from "../icon/Square";
import User from "../icon/User";
import Setting from "../icon/Setting";
import Logout from "../icon/Logout";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../redux/toggle/Toggle";

const routeVariants = {
  initial: {
    y: "100vh",
    opacity: 0,
  },
  final: {
    y: "0vh",
    opacity: 1,

    transition: {
      type: "spring",
      mass: 0.3,
      stiffness: 60,
    },
  },
};

const Dashboard = memo(function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [drop, setDrop] = useState(false);
  let title = location?.state?.path || "Dashboard";

  const products = useSelector((state) => state?.product?.isError);
  const profiles = useSelector((state) => state?.profile?.isError);
  const { isOpen } = useSelector((state) => state.toggle);
  const isError = products || profiles;

  return (
    <div className="flex bg-slate-200/70 relative z-50">
      <SideBar />

      <main className="w-full min-h-screen flex flex-col justify-between gap-y-8 ">
        <header
          className="w-full bg-white text-black py-5"
          style={{
            boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
          }}
        >
          <div className="container w-full md:max-w-5xl xl:max-w-7xl px-5 sm:px-10 md:px-14 lg:px-8 mx-auto flex justify-between items-center">
            <button
              className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white "
              onClick={() => dispatch(setIsOpen(!isOpen))}
            >
              <svg
                className="w-5 h-5 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="flex items-center gap-x-2.5">
              <Notif />
              <Square />
              <div
                className="relative"
                onClick={() => setDrop((prev) => !prev)}
              >
                <img
                  src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt="Avatar user"
                  className="w-10 md:w-10 rounded-full mx-auto cursor-pointer"
                />

                <AnimatePresence mode="popLayout">
                  {drop && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`w-44 py-5 px-3 bg-white text-black absolute -bottom-36 right-0 rounded-md shadow-md flex flex-col gap-y-2.5`}
                    >
                      <div className="flex gap-x-2 w-fit">
                        <User />
                        <p>User</p>
                      </div>

                      <div className="flex gap-x-2 w-fit">
                        <Setting />
                        <p>Setting</p>
                      </div>

                      <div className="flex gap-x-2 w-fit">
                        <Logout />
                        <p>Logout</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="text-center space-y-3.5">
            {isError ? (
              <h4 className="text-2xl font-medium drop-shadow-text-error text-red-600">
                Error Page :(
              </h4>
            ) : (
              <h4 className="text-2xl font-medium">{title}</h4>
            )}
            <div className="bread flex justify-center gap-x-4 text-base">
              <p>fall</p> <span>/</span> <p>dash</p>
            </div>
          </div>
        </header>

        <AnimatePresence>
          <motion.aside
            variants={routeVariants}
            initial="initial"
            animate="final"
            key={location?.key}
          >
            <Outlet />
          </motion.aside>
        </AnimatePresence>

        <footer
          className="w-full h-16 bg-white text-black flex justify-center items-center"
          style={{
            boxShadow: "0px -4px 5px 0px rgba(0,0,0,0.15)",
          }}
        >
          <span className="">2023 fallweb Design.</span>
        </footer>
      </main>
    </div>
  );
});

export default Dashboard;
