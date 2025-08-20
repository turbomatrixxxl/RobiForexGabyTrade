import React, { lazy, useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchData } from "./redux/public/operationsChats";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import RestrictedLoginRoute from "./components/RestrictedLoginRoute/RestrictedLoginRoute";

import Loader from "./components/commonComponents/Loader";

import { ToastContainer } from "react-toastify";

import getCurrentDateTime from "./utils/getCurrentDateTime";
import ensureIds from "./utils/ensureIds";

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
const LazyAdminPage = lazy(() => import("./pages/AdminPage"));
const LazyChatPage = lazy(() => import("./pages/ChatPage"));
const LazyBalancePage = lazy(() => import("./pages/BalancePage"));
const LazyChatHomePage = lazy(() => import("./pages/ChatHomePage"));
const LazyConverstionsPage = lazy(() => import("./pages/ConversationsPage"));

function App() {
  const dispatch = useDispatch();

  // 👉 Preload paginile după ce aplicația se montează
  useEffect(() => {
    import("./pages/PositionPage");
    import("./pages/RobotsPage");
    import("./pages/OrderPage");
    import("./pages/HistoryPage");
    import("./pages/LogPage");
  }, []);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const robots = [
    {
      cBotName: "Alfa",
      users: 1,
      message: false,
      time: getCurrentDateTime(),
      instrument: "XAUUSD",
      volume: 0.01,
      factor: 10,
      live: "live",
    },
    {
      cBotName: "Beta",
      users: 2,
      message: false,
      time: getCurrentDateTime(),
      instrument: "XAUUSD",
      volume: 0.01,
      factor: 9,
      live: "live",
    },
    {
      cBotName: "Gamma",
      users: 3,
      message: false,
      time: getCurrentDateTime(),
      instrument: "XAUUSD",
      volume: 0.01,
      factor: 9,
      live: "live",
    },
    {
      cBotName: "Tetha",
      users: 4,
      message: false,
      time: getCurrentDateTime(),
      instrument: "XAUUSD",
      volume: 0.01,
      factor: 9,
      live: "live",
    },
    {
      cBotName: "Epsilon",
      users: 5,
      message: false,
      time: getCurrentDateTime(),
      instrument: "XAUUSD",
      volume: 0.01,
      factor: 9,
      live: "live",
    },
  ];

  const robotsWithId = ensureIds(robots);

  const storedBots = localStorage.getItem("cBots");
  if (!storedBots) {
    localStorage.setItem("cBots", JSON.stringify(robotsWithId));
  }

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
            <Route
              path="/home/admin"
              element={
                <PrivateRoute
                  component={<LazyAdminPage />}
                  redirectTo="/auth/login"
                />
              }
            />
            <Route
              path="/home/chat"
              element={
                <PrivateRoute
                  component={<LazyChatPage />}
                  redirectTo="/auth/login"
                />
              }>
              <Route path=":chatId" element={<LazyConverstionsPage />} />
              <Route index element={<LazyChatHomePage />} />
            </Route>

            <Route
              path="/home/balance"
              element={
                <PrivateRoute
                  component={<LazyBalancePage />}
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
