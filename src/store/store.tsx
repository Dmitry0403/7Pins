import { createStore, compose } from "redux";
import { TestReducer } from "./TestReducer/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(TestReducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;
