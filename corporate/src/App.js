import React, { useEffect } from "react";

//import Scss
import "./assets/scss/themes.scss";

//imoprt Route
import Route from "./Routes";

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// Fake Backend
import fakeBackend from "./helpers/AuthType/fakeBackend";

// Activating fake backend
fakeBackend();

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// // init firebase backend
// initFirebaseBackend(firebaseConfig);

function App() {
  const projectsData = [
    {
      id: 1,
      title: "Project 1",
    },
    {
      id: 2,
      title: "Project 2",
    },
    {
      id: 3,
      title: "Project 3",
    },
  ];
  const todosData = [
    {
      id: 1,
      title: "Todo 1",
      project_id: 1,
    },
    {
      id: 2,
      title: "Todo 2",
      project_id: 2,
    },
    {
      id: 3,
      title: "Todo 3",
      project_id: 3,
    },
  ];
const projects = localStorage.getItem("projectsData");
if (!projects) {
  localStorage.setItem("projectsData", JSON.stringify(projectsData));

}
const todos = localStorage.getItem("todosData");
if (!todos) {
  localStorage.setItem("todosData", JSON.stringify(todosData));
}
  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
