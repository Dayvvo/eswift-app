import { isRejectedWithValue } from "@reduxjs/toolkit";

const queryErrorHandler = (_api: any) => (next: any) => (action: any) => {
  if (isRejectedWithValue(action)) {
    const { status, data } = action.payload;
    console.warn("We got a rejected action!", action, status, action);
  }

  return next(action);
};

export default queryErrorHandler;
