import { createSlice } from "@reduxjs/toolkit";

// import constant from "config/constant";
// import type { RootState } from "store/store";
// import ls from "utils/secureStorage";
import { RootState } from "../store";
import { CurrentUserRo, UserType } from "@/dto/auth";
import { R } from "@/utils/types";

const constants: R = {}


export type userType = {
  email: string;
  firstName?: string;
  lastName?: string;
  authorized: boolean;
  userType?: UserType;
  lastSignedIn?: Date;
};

const initialState = {
  status: "idle" as "inprogress" | "error" | "success" | "idle",
  auth: {
    token: null as string | null,
    refreshToken: null as string | null,
    isSignedIn: false,
    expiry: null as string | Date | null,
    alias: "" as string,
    email: "" as string,
    firstName: "" as string,
    lastName: "" as string,
    accountId: "" as string,
    userType: "trainee" as "trainer" | "trainee",
  },
  accounts: [] as CurrentUserRo["accounts"],
  userProfile: {} as any & { accountId: string; id: number; alias: string },
  currentProfile: {} as any & { accountId: string; id: number; alias: string },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    syncAuth: (state, action) => {
      if (action.payload.auth) state.auth = action.payload.auth;

      if (action.payload.accounts) state.accounts = action.payload.accounts;
      if (action.payload.userProfile)
        state.userProfile = action.payload.userProfile;
      if (action.payload.currentProfile)
        state.currentProfile = action.payload.currentProfile;

      localStorage.set(constants.AUTH_TOKEN_KEY, JSON.stringify(state.auth));
      localStorage.set(
        constants.PROFILE_TOKEN_KEY,
        JSON.stringify({
          userProfile: state.userProfile,
          currentProfile: state.currentProfile,
          accounts: state.accounts,
        })
      );
    },
    hydrateToken: (state, action) => {
      if (action.payload.logout) {
        state.auth = initialState.auth;
        state.accounts = initialState.accounts;
        state.userProfile = initialState.userProfile;
        state.currentProfile = initialState.currentProfile;
      } else {
        const auth = {
          token: action?.payload?.token || state.auth.token,
          refreshToken:
            action?.payload?.refreshToken || state.auth.refreshToken,
          expiry: action?.payload?.exp ?? state.auth.expiry ?? null,
          isSignedIn: action?.payload?.isSignedIn ?? state.auth?.isSignedIn,
          alias: action.payload?.alias || state.auth?.alias,
          email: action.payload?.email || state.auth?.email,
          firstName: action.payload?.firstName || state.auth?.firstName,
          lastName: action.payload?.lastName || state.auth?.lastName,
          accountId: action.payload?.accountId || state.auth?.accountId,
          ...(action.payload?.userType && {
            userType: action.payload?.userType || state.auth?.userType,
          }),
        };
        state.auth = { ...auth };
      }

      localStorage.set(constants.AUTH_TOKEN_KEY, JSON.stringify(state.auth));
    },
    hydrateProfile: (state, action) => {
      if (action.payload.userProfile) {
        state.userProfile = action.payload.userProfile;
      }
      if (action.payload.currentProfile) {
        state.currentProfile = action.payload.currentProfile;
      }
      if (action.payload.accounts) {
        state.accounts = action.payload.accounts;
      }

      localStorage.set(
        constants.PROFILE_TOKEN_KEY,
        JSON.stringify({
          userProfile: state.userProfile,
          currentProfile: state.currentProfile,
          accounts: state.accounts,
        })
      );
    },
    dehydrateProfile: (state) => {
      state.userProfile = initialState.userProfile;
      state.currentProfile = initialState.currentProfile;
      localStorage.remove(constants.PROFILE_TOKEN_KEY);
    },

    dehydrate: (state, _action) => {
      state = { ...initialState };
      localStorage.remove(constants.AUTH_TOKEN_KEY);
      localStorage.remove(constants.PROFILE_TOKEN_KEY);
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const selectProfile = (state: RootState) => ({
  userProfile: state?.auth.userProfile,
  currentProfile: state?.auth?.currentProfile,
  accounts: state?.auth?.accounts,
});

export const { actions, reducer: AuthReducer } = authSlice;

export const {
  hydrateToken,
  syncAuth,
  hydrateProfile,
  dehydrateProfile,
  dehydrate,
} = actions;

export default authSlice.reducer;
