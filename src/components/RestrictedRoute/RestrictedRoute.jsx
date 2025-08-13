import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// const RestrictedRoute = ({ component, redirectTo = "/" }) => {
//   const { isLoggedIn, isRegistered, user } = useAuth();

//   if (isRegistered && !isLoggedIn && user?.verify === false) {
//     return <Navigate to={"/verify-email"} />
//   }

//   // If the user is not logged in, allow access to the page
//   return (!isRegistered || !isLoggedIn) ? component : <Navigate to={redirectTo} />;
// };

const RestrictedRoute = ({ component, redirectTo = "/" }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isRegistered = localStorage.getItem("isRegistered") === "true";
      const isLoggedIn = localStorage.getItem("isLoggedin") === "true";

      // console.log("După 30s:", isRegistered, isLoggedIn);

      if (isRegistered && isLoggedIn) {
        setShouldRedirect(true);
      }
    }, 60000); // 1/2 minut

    return () => clearTimeout(timeout); // Curățăm dacă componenta se demontează
  }, []);

  return shouldRedirect ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedRoute;
