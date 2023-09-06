import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Root from "./layout/Root.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Product from "./pages/Products/Product.jsx";
import AddProduct from "./pages/Products/AddProduct.jsx";
import User from "./pages/Users/User.jsx";
import { auth } from "./redux/auth/AuthApi.js";
import AuthLayout from "./components/AuthLayout.jsx";
import UpdateProduct from "./pages/Products/UpdateProduct";
import { getProductById } from "./redux/product/ProductApi";
import "./style/Login.css";
import AddUser from "./pages/Users/AddUser";
import { getUserById } from "./redux/user/UserApi";
import UpdateUser from "./pages/Users/UpdateUser";
import ErrorUI from "./suspense/ErrorUI";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route
        path="dashboard"
        element={<Dashboard />}
        loader={async () => {
          document.title = "Dashboard";
          try {
            const response = await store.dispatch(auth()).unwrap();
            return response;
          } catch (rejectedValueOrSerializedError) {
            throw redirect("/");
          }
        }}
      >
        <Route path="product">
          <Route
            index
            loader={() => {
              document.title = "Products";
              return null;
            }}
            element={<Product />}
          />
          <Route
            loader={async ({ params }) => {
              try {
                await store.dispatch(getProductById(params?.id)).unwrap();
                return params;
              } catch (error) {
                throw new Response(
                  JSON.stringify({
                    errors: {
                      message: error,
                      path: "/dashboard/product",
                    },
                  }),
                  {
                    status: 404,
                    statusText: "fail",
                  }
                );
              }
            }}
            path=":id"
            element={<UpdateProduct />}
            errorElement={<ErrorUI />}
          />
          <Route path="add" element={<AddProduct />} />
        </Route>

        <Route
          path="users"
          loader={() => {
            document.title = "Users";
            const { auth } = store.getState((state) => state);

            if (!auth || auth?.user?.role !== "admin") {
              throw redirect("/dashboard");
            }
            return null;
          }}
        >
          <Route index element={<User />} />
          <Route
            loader={async ({ params }) => {
              try {
                await store.dispatch(getUserById(params?.id)).unwrap();

                return params;
              } catch (error) {
                throw new Response(
                  JSON.stringify({
                    errors: { message: error, path: "/dashboard/users" },
                  }),
                  {
                    status: 404,
                    statusText: "fail",
                  }
                );
              }
            }}
            path=":id"
            errorElement={<ErrorUI />}
            element={<UpdateUser />}
          />
          <Route path="add" element={<AddUser />} />
        </Route>
      </Route>

      <Route
        element={<AuthLayout />}
        loader={() => {
          const { auth } = store.getState((state) => state);

          if (auth?.user) {
            throw redirect("/dashboard");
          }
          document.title = "Login";
          return null;
        }}
      >
        <Route index element={<Login />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
