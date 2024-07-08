import React from "react";
import { useParams } from "react-router-dom";

const RedirectTestKhaltiComponent = () => {
    const {path} =  useParams();
    console.log("path", path);
//   React.useEffect(() => {
//     window.location.href = path;
//   }, []);

  return (
    <div>
      <p>Redirecting to {path}...</p>
    </div>
  );
};

export default RedirectTestKhaltiComponent;
