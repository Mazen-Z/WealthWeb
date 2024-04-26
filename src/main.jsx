import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./routes/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import CreatePost from "./routes/CreatePost.jsx";
import Feed from "./routes/Feed.jsx";
import Resources from "./routes/Resources.jsx";
import Post from "./routes/Post.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        {" "}
        <App />{" "}
      </Layout>
    ),
    children: [{}],
  },
  {
    path: "/home",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/feed",
    element: (
      <Layout>
        {" "}
        <Feed />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/create",
    element: (
      <Layout>
        <CreatePost />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/resources",
    element: (
      <Layout>
        <Resources />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/post/:postId",
    element: (
      <Layout>
        <Post />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
