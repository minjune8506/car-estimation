import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GlobalStyle } from "./GlobalStyle.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Home.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Model from "./pages/estimation/ModelSelect.tsx";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "estimation/model",
    element: <Model />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
	  <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  </React.StrictMode>
);
