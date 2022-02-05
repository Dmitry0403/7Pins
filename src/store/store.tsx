import { createStore } from "redux";
import { TestReducer } from "./TestReducer/reducer";

export const store = createStore(TestReducer);

export type RootState = ReturnType<typeof store.getState>;
