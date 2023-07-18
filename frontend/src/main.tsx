import ReactDOM from "react-dom/client";
import "./index.css";
import { GlobalStyle } from "./GlobalStyle.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import Model from "./pages/estimation/ModelSelect.tsx";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/Home.tsx";
import CarMaking from "./pages/estimation/CarMaking.tsx";
import { ONE_HOUR } from "./common/constants/constants.ts";
import Complete from "./pages/estimation/Complete.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "estimation/model",
    element: <Model />,
    errorElement: <ErrorPage />,
  },
  {
    path: "estimation/making",
    element: <CarMaking />,
    errorElement: <ErrorPage />,
  },
  {
    path: "estimation/complete",
    element: <Complete />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      useErrorBoundary: true,
      staleTime: ONE_HOUR,
      onError: (error) => {
        console.error(error);
      },
      onSuccess: (data) => {
        console.log(data);
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //   <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>
  //   </React.StrictMode>
);
