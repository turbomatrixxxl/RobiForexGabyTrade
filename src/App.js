import React, { lazy, useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import RestrictedLoginRoute from "./components/RestrictedLoginRoute/RestrictedLoginRoute";

import Loader from "./components/commonComponents/Loader";

import { ToastContainer } from "react-toastify";

import "./styles/theme.css";
import "./App.css";

// Lazy-loaded components
const LazyWelcomePage = lazy(() => import("./components/Welcome/Welcome"));
const LazyVerifyEmailPage = lazy(() =>
  import("./pages/VerifyEmailPageComponent/VerifyEmailPageComponent")
);
const LazyNotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LazyRegisterPage = lazy(() => import("./pages/RegisterPage"));
const LazyLoginPage = lazy(() => import("./pages/LoginPage"));
const LazyHomePage = lazy(() => import("./pages/HomePage"));
const LazyPositionPage = lazy(() => import("./pages/PositionPage"));
const LazyRobotsPage = lazy(() => import("./pages/RobotsPage"));
const LazyOrderPage = lazy(() => import("./pages/OrderPage"));
const LazyHistoryPage = lazy(() => import("./pages/HistoryPage"));
const LazyLogPage = lazy(() => import("./pages/LogPage"));

function App() {
  // 👉 Preload paginile după ce aplicația se montează
  useEffect(() => {
    import("./pages/PositionPage");
    import("./pages/RobotsPage");
    import("./pages/OrderPage");
    import("./pages/HistoryPage");
    import("./pages/LogPage");
  }, []);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <React.Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LazyWelcomePage />} />
          <Route
            path="/auth/register"
            element={
              <RestrictedRoute
                component={<LazyRegisterPage />}
                redirectTo="/home"
              />
            }
          />
          <Route
            path="/auth/login"
            element={
              <RestrictedLoginRoute
                component={<LazyLoginPage />}
                redirectTo="/home"
              />
            }
          />
          <Route path="/verify-email" element={<LazyVerifyEmailPage />} />

          {/* Private Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute
                component={<LazyHomePage />}
                redirectTo="/auth/login"
              />
            }>
            <Route
              path="/home/positions"
              element={
                <PrivateRoute
                  component={<LazyPositionPage />}
                  redirectTo="/auth/login"
                />
              }
            />
            <Route
              path="/home/robots"
              element={
                <PrivateRoute
                  component={<LazyRobotsPage />}
                  redirectTo="/auth/login"
                />
              }
            />
            <Route
              path="/home/order"
              element={
                <PrivateRoute
                  component={<LazyOrderPage />}
                  redirectTo="/auth/login"
                />
              }
            />
            <Route
              path="/home/history"
              element={
                <PrivateRoute
                  component={<LazyHistoryPage />}
                  redirectTo="/auth/login"
                />
              }
            />
            <Route
              path="/home/log"
              element={
                <PrivateRoute
                  component={<LazyLogPage />}
                  redirectTo="/auth/login"
                />
              }
            />
            <Route index element={<LazyPositionPage />} />
          </Route>

          {/* Catch-All */}
          <Route path="*" element={<LazyNotFoundPage />} />
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
