import React from 'react';
import { Routes, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";
import { authProtectedRoutes, publicRoutes } from "./allRoutes";


//routes
import { AuthProtected } from './AuthProtected';
import { adminProtectedRoutes } from './adminRoutes';

const Index = () => {

    return (
      <React.Fragment>
        <Routes>
          <Route>
            {publicRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={<NonAuthLayout>{route.component}</NonAuthLayout>}
                key={idx}
                exact={true}
              />
            ))}
          </Route>

          <Route>
            {adminProtectedRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={
                  <AuthProtected>
                    <VerticalLayout>{route.component}</VerticalLayout>
                  </AuthProtected>
                }
                key={idx}
                exact={true}
              />
            ))}
          </Route>
          <Route>
            {authProtectedRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={
                  <AuthProtected>
                   {route.component}
                  </AuthProtected>
                }
                key={idx}
                exact={true}
              />
            ))}
          </Route>
        </Routes>
      </React.Fragment>
    );
};

export default Index;