import store, { AppDispatch, RootState } from "@/store/store";
import type { TypedUseSelectorHook } from "react-redux";
import { useSelector as use } from "react-redux";


export const useDispatch: () => AppDispatch = () => store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = use;