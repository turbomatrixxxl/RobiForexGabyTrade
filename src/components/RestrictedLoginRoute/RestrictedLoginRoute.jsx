import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// const RestrictedLoginRoute = ({ component, redirectTo = "/" }) => {
//     const { isLoggedIn } = useAuth();
//     // console.log("isLoggedIn:", isLoggedIn);
//     // console.log("isRefreshing:", isRefreshing);

//     // If the user is not logged in, allow access to the page
//     return (!isLoggedIn) ? component : <Navigate to={redirectTo} />;
// };

const RestrictedLoginRoute = ({ component, redirectTo = "/" }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isLoggedIn = localStorage.getItem("isLoggedin") === "true";

      // console.log("După 30s:", isLoggedIn);

      if (isLoggedIn) {
        setShouldRedirect(true);
      }
    }, 10000); // 1/2 minut delay

    return () => clearTimeout(timeout);
  }, []);

  return shouldRedirect ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedLoginRoute;
