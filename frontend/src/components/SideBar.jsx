import { Fragment, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Grid from "../icon/Grid";
import Logout from "../icon/Logout";
import { logout } from "../redux/auth/AuthApi";
import { reset } from "../redux/auth/AuthSlice";
import Users from "../icon/Users";
import Box from "../icon/Box";
import Search from "../icon/Search";
import { toast } from "react-toastify";
import { setIsOpen } from "../redux/toggle/Toggle";

const routePath = [
  {
    name: "Dashboard",
    route: "dashboard",
    icon: <Grid />,
  },
  {
    name: "Product",
    route: "dashboard/product",
    icon: <Box />,
  },
];

const SideBar = memo(function SideBar() {
  const { user, isError, isLoading } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(reset());

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Fragment>
      <div
        onClick={() => dispatch(setIsOpen(true))}
        className={`transition-colors duration-200 ease-in-out ${
          isOpen
            ? "fixed inset-0 bg-black/0 -z-50"
            : "fixed inset-0 bg-black/40 lg:bg-black/0 z-40 lg:-z-40"
        }`}
      ></div>
      <div id="view" className={`h-full flex flex-row sticky top-0 z-50 `}>
        <div
          id="sidebar"
          className={`bg-[#181F2B] min-h-screen md:block shadow-xl shadow-black/50 overflow-x-hidden transition-all duration-300 ease-in-out absolute lg:relative  ${
            isOpen ? "w-0" : "w-60 lg:w-60"
          }`}
        >
          <div className="space-y-6 md:space-y-10 mt-10 absolute left-0 px-3">
            <h1 className="font-bold text-4xl text-center md:hidden lowercase text-white">
              {user?.name[0]}
              <span className="text-teal-600">.</span>
            </h1>
            <h1 className="text-slate-200 hidden md:block font-bold text-sm md:text-xl text-center">
              {user?.name}
              <span className="text-teal-600">.</span>
            </h1>
            <div id="profile" className="space-y-3">
              <img
                src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt="Avatar user"
                className="w-10 md:w-16 rounded-full mx-auto"
              />
              <div>
                <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                  {user?.email}
                </h2>
                <p className="text-xs text-gray-500 text-center">
                  {user?.role}
                </p>
              </div>
            </div>
            <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500 overflow-hidden">
              <input
                type="text"
                className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
                placeholder="Search"
              />
              <button className="bg-white  px-2 py-3 hidden md:block">
                <Search className="stroke-2" />
              </button>
            </div>
            <div id="menu" className="flex flex-col gap-y-2">
              {routePath.map(({ name, route, icon }, idx) => (
                <NavLink
                  state={{ path: name }}
                  key={idx}
                  to={`/${route}`}
                  end
                  className={({ isActive }) => {
                    return `text-sm font-medium text-white/90 py-2 px-2 hover:bg-white/20 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out whitespace-nowrap ${
                      isActive ? "bg-white/20 text-white" : ""
                    }`;
                  }}
                >
                  {icon}
                  <span>{name}</span>
                </NavLink>
              ))}

              {user?.role === "admin" ? (
                <NavLink
                  state={{ path: "Users" }}
                  to="/dashboard/users"
                  end
                  className={({ isActive }) => {
                    return `text-sm font-medium text-white/90 py-2 px-2 hover:bg-white/20 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out whitespace-nowrap ${
                      isActive ? "bg-white/20 text-white" : ""
                    }`;
                  }}
                >
                  <Users />
                  <span className="">Users</span>
                </NavLink>
              ) : null}

              <button
                onClick={onLogout}
                type="button"
                className="text-sm font-medium text-white/90 py-2 px-2 hover:bg-white/20 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out whitespace-nowrap text-left"
              >
                <Logout className="inline-block stroke-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default SideBar;
