import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/auth/AuthApi";
import { reset } from "../redux/auth/AuthSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(form)).unwrap();
      navigate("/dashboard");
      dispatch(reset());
    } catch (error) {
      setForm({
        email: "",
        password: "",
      });
      toast.error(error ? error : error?.message);
    }
  };

  const onChanges = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      className={`relative min-h-screen flex bg-gradient-to-tr to-50% to-transparent from-[#1c2431] from-50%`}
    >
      <div className="flex flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">
        <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
          <div className="absolute bg-gradient-to-b from-[#1c2431] to-[#181F2B]  opacity-75 inset-0 z-0"></div>
          <div className="w-full  max-w-md z-10">
            <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
              Lorem ipsum dolor sit.
            </div>
            <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              pariatur veniam, facere tempora perferendis optio deleniti, ullam
              harum sapiente ratione corrupti
            </div>
          </div>
          <ul className="circles">
            {Array(10)
              .fill(null)
              .map((_, idx) => (
                <li key={idx}></li>
              ))}
          </ul>
        </div>
        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Welcome Back!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Please sign in to your account
              </p>
            </div>
            <div className="flex flex-row justify-center items-center space-x-3">
              <form className="mt-8 space-y-6" method="POST" onSubmit={onLogin}>
                <div className="relative">
                  <div className="absolute right-3 mt-4"></div>
                  <InputForm
                    onChange={onChanges}
                    value={form.email}
                    name="Email"
                    type="email"
                    placeHolder="email@gmail.com"
                  />
                </div>
                <div className="mt-8 content-center">
                  <InputForm
                    onChange={onChanges}
                    value={form.password}
                    name="Password"
                    type="password"
                    placeHolder="********"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                </div>
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                  <span>Dont have an account?</span>
                  <Link
                    to="/register"
                    className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
