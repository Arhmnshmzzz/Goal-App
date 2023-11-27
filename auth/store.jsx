import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import goalReducer from "./goalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});
