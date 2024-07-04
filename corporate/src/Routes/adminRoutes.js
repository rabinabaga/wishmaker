import React from "react";

import Dashboard from "../pages/Dashboard";

const adminProtectedRoutes = [{ path: "/dashboard", component: <Dashboard /> }];

export { adminProtectedRoutes };
