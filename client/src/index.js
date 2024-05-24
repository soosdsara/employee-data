import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import Filter from "./Pages/Filter";
import Sort from "./Pages/Sort";
import Missing from "./Pages/Missing";
import Equipment from './Pages/Equipment';
import TopPaidPage from './Pages/TopPaidPage';
import Tools from './Pages/Tools';
import EmployeeKittens from './Pages/EmployeeKittens';
import Boardgame from "./Pages/Boardgame";
import GameList from "./Pages/GameList";
import GameDatas from "./Pages/GameDatas";
import Address from "./Pages/Address";



import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/kittens/:employeeId",
        element: <EmployeeKittens />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/filter",
        element: <Filter />,
      },
      {
        path: "/sort",
        element: <Sort />,
      },
      {
        path: "/missing",
        element: <Missing />,
      },
      {
        path: '/equipments',
        element: <Equipment />
      },
      {
        path: '/top-paid',
        element: <TopPaidPage />
      },
      {
        path: '/tools',
        element: <Tools />
      },
      {
        path: '/games',
        element: <Boardgame />
      },
      {
        path: '/games-list',
        element: <GameList />
      },
      {
        path: '/games-list/:id',
        element: <GameDatas />
      },
      {
        path: '/employee/:id/address',
        element: <Address />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
