import { createStore } from "redux";
import { TestReducer } from "./TestReducer/reducer";

export const store = createStore(
    TestReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export type RootState = ReturnType<typeof store.getState>;
