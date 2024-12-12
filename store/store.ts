import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
import queryErrorHandler from "./middlewares/errorHandler";
import authSlice from "./reducers/auth";


const rootReducer = combineReducers({
  auth: authSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      queryErrorHandler,
    ]),
  devTools: false,
});

// setupListeners(store.dispatch);

// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: AppDispatch = store.dispatch;
export default store;
