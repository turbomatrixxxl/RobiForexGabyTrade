import { configureStore } from "@reduxjs/toolkit";
// import { authReducer } from "./auth/authSlice";
import chatsReducer from "./public/chatsSlice";
// import { privateReducer } from "./private/privateSlice";

export const store = configureStore({
  reducer: {
    // authSlice: authReducer,
    // privateSlice: privateReducer,
    chats: chatsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable this middleware
    }),
});
