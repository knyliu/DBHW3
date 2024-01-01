import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 引入其他需要的組件
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 定義您的路由
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/read",
    element: <App />,
  },
  // 添加更多路由規則如需要
  // 例如:
  // {
  //   path: "/another-route",
  //   element: <AnotherComponent />,
  // },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// 性能追蹤（可選）
reportWebVitals();
