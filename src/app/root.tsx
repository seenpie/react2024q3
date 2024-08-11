/* eslint-disable react-refresh/only-export-components */

import {
  isRouteErrorResponse,
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError
} from "@remix-run/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { state } from "../state";
import "../index.css";
import ThemeProvider from "../context/ThemeContext/ThemeProvider.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";

export const meta: MetaFunction = () => [
  { title: "remix-ssr" },
  { name: "description", content: "rs_school-remix-ssr" }
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={state}>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <NotFoundPage />;
  }

  console.error(error);

  return <h1>Something went wrong</h1>;
}
