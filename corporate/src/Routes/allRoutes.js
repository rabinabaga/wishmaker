import React from "react";
import YourBusinesses from "../pages/ToDo";
import YourBusinessesRedux from "../pages/ToDoRedux";
import YourBusinessesReduxAsync from "../pages/ToDoReduxAsync";

//GetThingsDone
import GetThingsDone from "../pages/GetThingsDone";
import Login from "../pages/Authentication/Login";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
const authProtectedRoutes = [
  { path: "/home", component: <Home /> },
  { path: "/your-businesses", component: <YourBusinesses /> },
  { path: "/your-businesses-redux", component: <YourBusinessesRedux /> },
  {
    path: "/your-businesses-redux-async",
    component: <YourBusinessesReduxAsync />,
  },
];
const publicRoutes = [
  // Authentication Page

  { path: "/login", component: <Login /> },
];

export { authProtectedRoutes, publicRoutes };
